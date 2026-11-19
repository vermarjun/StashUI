#!/bin/sh
# Keeps native recording healthy on the recording Mac during long runs.
#
#  - Orphaned recorders (their take died; parent is launchd) still hold a
#    ScreenCaptureKit session. Enough of them and no new recording can start.
#    Stop them: TERM first (clean stop), KILL if still alive.
#  - If recordings keep failing with "failure to process first sample buffer"
#    / "never started", the capture daemon (replayd, runs as this user) is
#    wedged: restart it. macOS relaunches it on demand.
#
#   sh scripts/rec/watchdog.sh        (loops every 30s; Ctrl-C to stop)
LOGS="${REC_QUEUE:-/tmp/final-queue}/done"
while true; do
  ps -Ao pid,ppid,etime,command | awk '/rec\/bin\/recorder [0-9]/ && $2==1 {print $1, $3}' |
    while read pid et; do
      # etime is [[dd-]hh:]mm:ss; anything with a ':' before mm:ss or mm>=2 is old
      case "$et" in
        *-*|*:*:*) old=1 ;;
        *) m=${et%%:*}; [ "$m" -ge 2 ] 2>/dev/null && old=1 || old=0 ;;
      esac
      if [ "$old" = 1 ]; then
        echo "$(date '+%H:%M:%S') stopping orphan recorder $pid (age $et)"
        kill -TERM "$pid" 2>/dev/null; sleep 5; kill -9 "$pid" 2>/dev/null
      fi
    done
  # 4+ of the last 6 results failing on capture start => wedged replayd
  last=$(ls -t "$LOGS"/*.log 2>/dev/null | head -1)
  if [ -n "$last" ]; then
    # only results recorded since the last restart count
    bad=$(awk '/^--- replayd restarted/{n=0; delete r; next} /^\[[0-9]+\//{r[++n]=$0} END{for(i=(n>6?n-5:1);i<=n;i++) print r[i]}' "$last" |
      grep -cE 'first sample buffer|never started|RPRecordingErrorDomain|recorder failed')
    if [ "$bad" -ge 4 ]; then
      echo "$(date '+%H:%M:%S') capture failing ($bad/6) -> restarting replayd"
      pkill -9 -x replayd
      echo "--- replayd restarted by watchdog" >> "$last"
      sleep 20
    fi
  fi
  sleep 30
done
