# Set up StashUI

StashUI is a catalogue of about 1,100 ready-made React components that a coding agent can see, choose from and install. No account, no key.

## If you are the agent doing the setup

Run this one command, exactly as written. It is the same in every shell on macOS, Linux and Windows (bash, zsh, PowerShell, cmd) and needs only Node 18 or newer:

```sh
node -e "const fs=require('fs'),d=require('os').homedir()+'/.stashui',f=d+'/stashui.mjs';fs.mkdirSync(d,{recursive:true});fetch('{{SITE}}/agent/stashui.mjs').then(r=>r.ok?r.text():Promise.reject(Error('HTTP '+r.status))).then(t=>{fs.writeFileSync(f,t);process.exit(require('child_process').spawnSync(process.execPath,[f,'init'],{stdio:'inherit'}).status)})"
```

It downloads one script to `.stashui/stashui.mjs` in your home folder and runs its `init`, which installs three skills into `.claude/skills/` and `.agents/skills/` in your home folder. Nothing in the project changes and nothing is added to your PATH. The script's SHA-256 is `{{CLI_SHA256}}`; `init` checks every skill file against its published hash before writing it.

The same thing as separate steps, if you would rather run them one at a time:

```bash
mkdir -p ~/.stashui
curl -fsSL {{SITE}}/agent/stashui.mjs -o ~/.stashui/stashui.mjs
node ~/.stashui/stashui.mjs init
```

```powershell
New-Item -ItemType Directory -Force "$HOME\.stashui" | Out-Null
Invoke-WebRequest -UseBasicParsing {{SITE}}/agent/stashui.mjs -OutFile "$HOME\.stashui\stashui.mjs"
node "$HOME\.stashui\stashui.mjs" init
```

Then:

1. Read the skill `init` names in its last line (`stashui/SKILL.md`) and follow it for all UI work from now on, including in this session.
2. Run the `browse` check that `init` prints in its last line, to confirm the catalogue answers. Use the command exactly as printed: it is written for this machine's shell.
3. Tell the user StashUI is ready, in one line.

Options: `init --project` puts the skills in this repository instead, so teammates get them through git. `init --mcp` also registers the MCP server.

Later, the same command with `update` fetches whatever is published now. The `context` command says when an update exists.

## If your agent has no shell

Claude Desktop, claude.ai, ChatGPT and similar: add `{{SITE}}/api/mcp` as a remote MCP server (HTTP, no login). It offers the same six operations and returns the images inline.

## What it touches

The `add` command runs `npx shadcn@latest add <names and urls>`; `--print` shows the command without running it. Images are saved under `.stashui/sheets/` in the project, in a folder that ignores itself in git. No telemetry beyond ordinary web server logs.

Protocol reference: {{SITE}}/api/agent/v1 · Skills index: {{SITE}}/.well-known/agent-skills/index.json
