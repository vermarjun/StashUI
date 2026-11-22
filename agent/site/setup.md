# Set up StashUI

StashUI is a catalogue of about 1,100 ready-made React components that a coding agent can see, choose from and install. No account, no key.

## If you are the agent doing the setup

Run exactly these three commands (Node 18 or newer):

```sh
mkdir -p ~/.stashui
curl -fsSL {{SITE}}/agent/stashui.mjs -o ~/.stashui/stashui.mjs
node ~/.stashui/stashui.mjs init
```

On Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force "$HOME\.stashui" | Out-Null
Invoke-WebRequest {{SITE}}/agent/stashui.mjs -OutFile "$HOME\.stashui\stashui.mjs"
node "$HOME\.stashui\stashui.mjs" init
```

They write only `~/.stashui/stashui.mjs` and the skill folders `~/.claude/skills/` and `~/.agents/skills/`. Nothing in the project changes and nothing is added to your PATH. The script's SHA-256 is `{{CLI_SHA256}}`; `init` checks every skill file against its published hash before writing it.

Then:

1. Read the skill `init` names in its last line (`stashui/SKILL.md`) and follow it for all UI work from now on, including in this session.
2. Run `node ~/.stashui/stashui.mjs browse` to confirm the catalogue answers.
3. Tell the user StashUI is ready, in one line.

Options: `init --project` puts the skills in this repository instead, so teammates get them through git. `init --mcp` also registers the MCP server.

Later, `node ~/.stashui/stashui.mjs update` fetches whatever is published now. The `context` command says when an update exists.

## If your agent has no shell

Claude Desktop, claude.ai, ChatGPT and similar: add `{{SITE}}/api/mcp` as a remote MCP server (HTTP, no login). It offers the same six operations and returns the images inline.

## What it touches

The `add` command runs `npx shadcn@latest add <names and urls>`; `--print` shows the command without running it. Images are saved under `.stashui/sheets/` in the project, in a folder that ignores itself in git. No telemetry beyond ordinary web server logs.

Protocol reference: {{SITE}}/api/agent/v1 · Skills index: {{SITE}}/.well-known/agent-skills/index.json
