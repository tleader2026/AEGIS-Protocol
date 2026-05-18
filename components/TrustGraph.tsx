"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

const graph = {
  nodes: [
    { id: "human", group: "approval" },
    { id: "agent-a", group: "agent" },
    { id: "agent-b", group: "agent" },
    { id: "model", group: "runtime" },
    { id: "tool", group: "runtime" },
    { id: "registry", group: "registry" },
    { id: "provenance", group: "registry" },
    { id: "impact", group: "impact" },
    { id: "rogue", group: "rogue" }
  ],
  links: [
    { source: "human", target: "agent-a", label: "approval" },
    { source: "agent-a", target: "model", label: "executes" },
    { source: "agent-a", target: "tool", label: "calls" },
    { source: "model", target: "provenance", label: "hashes" },
    { source: "tool", target: "impact", label: "receipt" },
    { source: "provenance", target: "registry", label: "anchors" },
    { source: "agent-b", target: "registry", label: "resolves" },
    { source: "rogue", target: "tool", label: "blocked" }
  ]
};

type SimNode = d3.SimulationNodeDatum & {
  id: string;
  group: string;
};

type SimLink = d3.SimulationLinkDatum<SimNode> & {
  source: string | SimNode;
  target: string | SimNode;
  label: string;
};

function fill(group: string) {
  if (group === "approval") return "#ffd166";
  if (group === "registry") return "#86a8ff";
  if (group === "impact") return "#ff6b9a";
  if (group === "rogue") return "#ff4d4d";
  return "#46f0c2";
}

export function TrustGraph() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const width = 860;
    const height = 420;

    const nodesData: SimNode[] = graph.nodes.map((node) => ({ ...node }));
    const linksData: SimLink[] = graph.links.map((link) => ({ ...link }));

    const simulation = d3
      .forceSimulation<SimNode>(nodesData)
      .force("link", d3.forceLink<SimNode, SimLink>(linksData).id((d) => d.id).distance(110))
      .force("charge", d3.forceManyBody().strength(-420))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.06))
      .force("y", d3.forceY(height / 2).strength(0.08));

    const root = svg.attr("viewBox", `0 0 ${width} ${height}`);

    const links = root
      .append("g")
      .selectAll("line")
      .data(simulation.force<d3.ForceLink<SimNode, SimLink>>("link")!.links())
      .join("line")
      .attr("stroke", (d: any) => (d.label === "blocked" ? "#ff4d4d" : "#d7fff6"))
      .attr("stroke-opacity", (d: any) => (d.label === "blocked" ? 0.65 : 0.28))
      .attr("stroke-width", (d: any) => (d.label === "blocked" ? 2.2 : 1.2))
      .attr("stroke-dasharray", (d: any) => (d.label === "blocked" ? "6 7" : "0"));

    const nodes = root
      .append("g")
      .selectAll("g")
      .data(simulation.nodes())
      .join("g")
      .call((
        d3.drag<SVGGElement, SimNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      ) as any);

    nodes
      .append("circle")
      .attr("r", (d: any) => (d.id === "registry" ? 24 : 18))
      .attr("fill", (d: any) => fill(d.group))
      .attr("fill-opacity", 0.18)
      .attr("stroke", (d: any) => fill(d.group))
      .attr("stroke-width", 1.6);

    nodes
      .append("text")
      .text((d: any) => d.id)
      .attr("text-anchor", "middle")
      .attr("dy", 34)
      .attr("fill", "currentColor")
      .attr("font-size", 12)
      .attr("font-family", "monospace");

    simulation.on("tick", () => {
      links
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
      nodes.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="border border-white/10 bg-white/[0.04] p-2 text-white shadow-panel light:border-ink/10 light:bg-ink/[0.03] light:text-ink">
      <svg ref={ref} className="h-[420px] w-full" role="img" aria-label="Interactive AEGIS trust graph" />
    </div>
  );
}
