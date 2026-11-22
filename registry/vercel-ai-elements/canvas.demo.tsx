"use client";

import type { Edge, Node, NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";

import { Canvas } from "./canvas";

type StepData = { title: string; detail: string; kind: string };

const StepNode = ({ data }: NodeProps<Node<StepData>>) => (
  <div className="w-56 rounded-lg border border-border bg-card text-card-foreground shadow-sm">
    <Handle className="!bg-muted-foreground" position={Position.Left} type="target" />
    <div className="border-b border-border px-3 py-2">
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{data.kind}</p>
      <p className="font-medium text-sm">{data.title}</p>
    </div>
    <p className="px-3 py-2 text-muted-foreground text-xs">{data.detail}</p>
    <Handle className="!bg-muted-foreground" position={Position.Right} type="source" />
  </div>
);

const nodeTypes = { step: StepNode };

const nodes: Node<StepData>[] = [
  { id: "1", type: "step", position: { x: 0, y: 120 }, data: { kind: "Trigger", title: "New support email", detail: "Inbox: support@acme.io" } },
  { id: "2", type: "step", position: { x: 300, y: 120 }, data: { kind: "Agent", title: "Classify intent", detail: "Billing, bug, or how-to" } },
  { id: "3", type: "step", position: { x: 600, y: 0 }, data: { kind: "Tool", title: "Search help center", detail: "Top 3 articles by relevance" } },
  { id: "4", type: "step", position: { x: 600, y: 240 }, data: { kind: "Tool", title: "Look up invoice", detail: "Billing API, last 90 days" } },
  { id: "5", type: "step", position: { x: 900, y: 120 }, data: { kind: "Agent", title: "Draft reply", detail: "Friendly, under 120 words" } },
];

const edges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e2-4", source: "2", target: "4", animated: true },
  { id: "e3-5", source: "3", target: "5" },
  { id: "e4-5", source: "4", target: "5" },
];

export default function CanvasDemo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden">
      <Canvas
        colorMode="dark"
        defaultEdges={edges}
        defaultNodes={nodes}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
      />
    </div>
  );
}
