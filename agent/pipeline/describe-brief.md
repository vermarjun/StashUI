Goal: write the catalogue record for every component in one shard.

Contract (read it first, completely): agent/pipeline/describe.md

Your shard: .describe/shards/SHARD.txt  (one component name per line)

For each name, in the order listed, one at a time:
  1. Read  .describe/in/<name>.md   (title, measured facts, demo, source code)
  2. Open  .describe/in/<name>.jpg  with your file reading tool and look at it.
     It shows frames numbered 1 to 6 and a four-digit sheet code at the bottom right.
  3. Write .describe/out/<name>.json following the contract exactly.

When all are written, check your work:
  python3 agent/pipeline/describe_check.py --shard .describe/shards/SHARD.txt
Fix every ERROR by rewriting that field properly, look at every WARN, and run it
again until its last line says every record passes.

Constraints:
- All paths are relative to your working directory.
- Write only files under .describe/out/. Change nothing else.
- Do not open .describe/manifest.json or any other component's output.
- If you cannot see the images, stop: sparrow done --status blocked "cannot view images".

Report with sparrow done: how many records you wrote, the checker's last line,
and the names of components whose image was missing, blank, or disagreed with the code.
