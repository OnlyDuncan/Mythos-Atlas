"use client";

import { useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type OnConnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { myths } from "@/data/myths";
import { useRouter } from "next/navigation";

function buildGraph(focusId?: string) {
  const nodes: Node[] = myths.map((myth, i) => {
    const angle = (i / myths.length) * 2 * Math.PI;
    const radius = focusId ? (myth.id === focusId ? 0 : 320) : 380;
    return {
      id: myth.id,
      data: { label: myth.title, category: myth.category, accent: myth.accentColor },
      position: {
        x: 500 + radius * Math.cos(angle),
        y: 400 + radius * Math.sin(angle),
      },
      style: {
        background: myth.id === focusId ? myth.accentColor : "#1e1e2e",
        color: myth.id === focusId ? "#fff" : "#e2e8f0",
        border: `1px solid ${myth.accentColor}80`,
        borderRadius: "12px",
        padding: "10px 16px",
        fontSize: "12px",
        fontWeight: myth.id === focusId ? 700 : 500,
        boxShadow: myth.id === focusId ? `0 0 20px ${myth.accentColor}88` : "none",
        minWidth: 120,
        textAlign: "center",
      },
    };
  });

  const edgeSet = new Set<string>();
  const edges: Edge[] = [];

  myths.forEach((myth) => {
    // Explicit related edges
    myth.relatedIds.forEach((relId) => {
      const key = [myth.id, relId].sort().join("--");
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push({
          id: key,
          source: myth.id,
          target: relId,
          style: { stroke: "#7c3aed55", strokeWidth: 1.5 },
          animated: myth.id === focusId || relId === focusId,
        });
      }
    });

    // Shared-tag edges (only if 2+ tags overlap)
    myths.forEach((other) => {
      if (other.id === myth.id) return;
      const overlap = myth.tags.filter((t) => other.tags.includes(t));
      if (overlap.length >= 2) {
        const key = [myth.id, other.id].sort().join("--");
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edges.push({
            id: key,
            source: myth.id,
            target: other.id,
            style: { stroke: "#ffffff15", strokeWidth: 1 },
            animated: false,
          });
        }
      }
    });
  });

  return { nodes, edges };
}

export default function GraphPage() {
  return (
    <Suspense fallback={<div className="flex h-[calc(100vh-64px)] items-center justify-center bg-[#080810] text-slate-500">Loading graph…</div>}>
      <GraphInner />
    </Suspense>
  );
}

function GraphInner() {
  const searchParams = useSearchParams();
  const focusId = searchParams.get("focus") ?? undefined;
  const router = useRouter();

  const { nodes: initNodes, edges: initEdges } = buildGraph(focusId);
  const [nodes, , onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      router.push(`/myth/${node.id}`);
    },
    [router]
  );

  return (
    <div className="relative h-[calc(100vh-64px)] w-full bg-[#080810]">
      {/* Legend */}
      <div className="absolute left-4 top-4 z-10 rounded-xl border border-white/10 bg-[#0f0f1a]/90 p-4 text-xs text-slate-400 backdrop-blur">
        <p className="mb-2 font-semibold text-slate-300">Graph Key</p>
        <div className="flex items-center gap-2 mb-1">
          <span className="block h-px w-6 bg-violet-600" /> Explicit connection
        </div>
        <div className="flex items-center gap-2">
          <span className="block h-px w-6 bg-white/20" /> Shared themes (2+)
        </div>
        <p className="mt-3 text-slate-500">Click a node to open its entry</p>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
        colorMode="dark"
        style={{ background: "#080810" }}
      >
        <Background color="#ffffff08" gap={32} />
        <Controls style={{ background: "#1e1e2e", borderColor: "#ffffff20", color: "#e2e8f0" }} />
        <MiniMap
          nodeColor={(node) => (node.style as { border?: string })?.border?.split(" ")[2] ?? "#7c3aed"}
          style={{ background: "#0f0f1a", borderColor: "#ffffff10" }}
        />
      </ReactFlow>
    </div>
  );
}
