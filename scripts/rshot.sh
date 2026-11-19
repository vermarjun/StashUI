#!/bin/sh
# Screenshot a component's live preview on the recording Mac ("mbp"), so
# verification never loads this machine. Syncs registry/ + src/ + public/ first
# (its dev server on :3200, run from ~/stashui, hot-reloads them), then copies the PNG back.
#
#   sh scripts/rshot.sh <name> <out.png> [hover-css-selector] [width] [height]
#
# Prints any page errors / failed requests the preview produced.
set -e
HOST="${REC_HOST:-mbp}"
name="$1"; out="$2"; sel="${3:-}"; w="${4:-1280}"; h="${5:-800}"
if [ -z "$name" ] || [ -z "$out" ]; then
  echo "usage: rshot.sh <name> <out.png> [selector] [w] [h]"; exit 2
fi
cd "$(dirname "$0")/.."
rsync -az registry src registry.json "$HOST":stashui/ >/dev/null
rsync -az public/ "$HOST":stashui/public/ --exclude previews --exclude r >/dev/null
rsync -az scripts/rshot-page.mjs "$HOST":stashui/scripts/ >/dev/null
remote="/tmp/rshot-$$-$(date +%s).png"
ssh "$HOST" "cd ~/stashui && export PATH=/opt/homebrew/bin:\$PATH && node scripts/rshot-page.mjs '$name' '$remote' '$sel' '$w' '$h'"
scp -q "$HOST:$remote" "$out"
echo "saved $out"
