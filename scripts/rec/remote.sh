#!/bin/sh
# Run the recording batch on the spare Mac (ssh host "mbp", repo at ~/stashui)
# instead of this machine, then bring the results back.
#
#   sh scripts/rec/remote.sh <batch.mjs args...>
#   e.g. sh scripts/rec/remote.sh comp-119 --mode screencast --no-live
#
# Syncs registry/ + scripts/ + registry.json there first (so new take scripts
# and demo fixes are picked up by its dev server), and copies back
# .rec/reports, .rec/sheets and .rec/out.
set -e
HOST="${REC_HOST:-mbp}"
cd "$(dirname "$0")/../.."
rsync -az registry scripts registry.json src "$HOST":stashui/ --exclude 'scripts/rec/bin'
ssh "$HOST" "cd ~/stashui && export PATH=/opt/homebrew/bin:\$PATH && REC_SLOTS=3 node scripts/rec/batch.mjs --base http://localhost:3100 $*"
mkdir -p .rec
for d in reports sheets out; do rsync -az "$HOST:stashui/.rec/$d" .rec/; done
