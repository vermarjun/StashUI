"use client";

import AgentAvatar from "./agent-avatar";

const AGENTS = [
  { name: "Atlas", role: "Research", status: "Reading 14 sources" },
  { name: "Juniper", role: "Code review", status: "Reviewing PR #482" },
  { name: "Orion", role: "Data analyst", status: "Building Q3 cohort chart" },
  { name: "Wren", role: "Support triage", status: "3 tickets in queue" },
  { name: "Sable", role: "Copywriter", status: "Drafting launch email" },
  { name: "Kestrel", role: "QA", status: "Running 212 tests" },
];

export default function AgentAvatarDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-10 p-8">
      <AgentAvatar seed="atlas-research" size={128} />
      <div className="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
        {AGENTS.map((agent) => (
          <div
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
            key={agent.name}
          >
            <AgentAvatar seed={agent.name.toLowerCase()} size={40} />
            <div className="min-w-0">
              <p className="font-medium text-foreground text-sm">
                {agent.name}
                <span className="ml-1.5 font-normal text-muted-foreground text-xs">
                  {agent.role}
                </span>
              </p>
              <p className="truncate text-muted-foreground text-xs">
                {agent.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
