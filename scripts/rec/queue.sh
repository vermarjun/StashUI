#!/bin/sh
# Final-recording queue for the recording Mac. Drop a file of component names
# (one per line) into $Q and it gets recorded natively, one list at a time;
# finished lists move to $Q/done with their log. Run it inside the GUI tmux
# session that has Screen Recording permission:
#
#   sh scripts/rec/queue.sh            (Ctrl-C to stop)
Q="${REC_QUEUE:-/tmp/final-queue}"
BASE="${REC_BASE:-http://localhost:3100}"
mkdir -p "$Q/done"
cd "$(dirname "$0")/../.." || exit 1
while true; do
  f=$(ls -tr "$Q"/*.txt 2>/dev/null | head -1)
  if [ -z "$f" ]; then sleep 20; continue; fi
  b=$(basename "$f" .txt)
  echo "=== $(date '+%H:%M') recording $b ($(wc -l < "$f" | tr -d ' ') components)"
  REC_SLOTS="${REC_SLOTS:-4}" node scripts/rec/batch.mjs --file "$f" --mode native --base "$BASE" --jobs "${REC_JOBS:-2}" --retries 1 2>&1 | tee "$Q/done/$b.log"
  mv "$f" "$Q/done/$b.txt"
done
