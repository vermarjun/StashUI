# Set up StashUI

StashUI is a catalogue of about 1,100 ready-made React components that a coding agent can see, choose from and install. No account, no key.

## If you are the agent doing the setup

Run exactly these three commands (Node 18 or newer):

```sh
mkdir -p ~/.stashui
curl -fsSL https://stashui.vermarjun.xyz/agent/stashui.mjs -o ~/.stashui/stashui.mjs
node ~/.stashui/stashui.mjs init
```

On Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force "$HOME\.stashui" | Out-Null
Invoke-WebRequest https://stashui.vermarjun.xyz/agent/stashui.mjs -OutFile "$HOME\.stashui\stashui.mjs"
node "$HOME\.stashui\stashui.mjs" init
```

They write only `~/.stashui/` (one script) and the skill folders `~/.claude/skills/` and `~/.agents/skills/`. Nothing in the project changes. The script's SHA-256 is `04e58a4f19824f1d83a7126f4700eac89a7d44fa8f473a34661d6414e7708263`; `init` checks every skill file against its published hash before writing it.

Then:

1. Read the skill `init` names in its last line (`stashui/SKILL.md`) and follow it for all UI work from now on, including in this session.
2. Run `stashui browse` (or `node ~/.stashui/stashui.mjs browse`) to confirm the catalogue answers.
3. Tell the user StashUI is ready, in one line.

Options: `init --project` puts the skills in this repository instead, so teammates get them through git. `init --mcp` also registers the MCP server.

## If your agent has no shell

Claude Desktop, claude.ai, ChatGPT and similar: add `https://stashui.vermarjun.xyz/api/mcp` as a remote MCP server (HTTP, no login). It offers the same six operations and returns the images inline.

## What it touches

`stashui add` runs `npx shadcn@latest add <urls>`; `--print` shows the command without running it. Images are saved under `.stashui/sheets/` in the project, in a folder that ignores itself in git. No telemetry beyond ordinary web server logs.

Protocol reference: https://stashui.vermarjun.xyz/api/agent/v1 · Skills index: https://stashui.vermarjun.xyz/.well-known/agent-skills/index.json
