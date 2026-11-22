#!/bin/sh
# Watchdog for batch.mjs runs launched by research/intake/ship.sh.
#  - A take lasts ~10 s, so a recorder older than 1 min is hung (replayd
#    restarted under it, or it never got its first frame). Kill it: the take
#    errors, batch.mjs retries it.
#  - 4+ capture failures in the last 6 results => replayd is wedged: restart it
#    (macOS relaunches it on demand).
#   sh scripts/rec/watchdog-batch.sh /tmp/rec_wave3.log
LOG="$1"
while true; do
  ps -Ao pid,etime,command | awk '/rec\/bin\/recorder [0-9]/ {print $1, $2}' |
    while read pid et; do
      case "$et" in
        *-*|*:*:*) old=1 ;;
        *) m=${et%%:*}; [ "$m" -ge 1 ] 2>/dev/null && old=1 || old=0 ;;
      esac
      if [ "$old" = 1 ]; then
        echo "$(date '+%H:%M:%S') killing hung recorder $pid (age $et)"
        kill -TERM "$pid" 2>/dev/null; sleep 3; kill -9 "$pid" 2>/dev/null
      fi
    done
  if [ -f "$LOG" ]; then
    bad=$(awk '/^--- replayd restarted/{n=0; delete r; next} /^\[[0-9]+\//{r[++n]=$0} END{for(i=(n>6?n-5:1);i<=n;i++) print r[i]}' "$LOG" |
      grep -cE 'first sample buffer|never started|RPRecordingErrorDomain|recorder failed|timed out')
    if [ "$bad" -ge 4 ]; then
      echo "$(date '+%H:%M:%S') capture failing ($bad/6) -> restarting replayd"
      pkill -9 -x replayd
      echo "--- replayd restarted by watchdog" >> "$LOG"
      sleep 20
    fi
  fi
  sleep 20
done
