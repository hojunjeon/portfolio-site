import type { ReactNode } from "react";

/* DESIGN_V2.md §5 컴포넌트 계약.
   props 시그니처가 계약이다 — 페이지 코드는 이 API로만 작성하고,
   foundation 작업자는 내부 구현·스타일을 완성하되 시그니처를 바꾸지 않는다.
   스타일 원칙: 자체색 1px 보더/톤 계조만, 그림자·글로우 0, 라운드 캡,
   콘텐츠는 항상 기본 상태에서 완전히 보인다(entrance 숨김 금지). */

export function Stat({
  value,
  label,
  sub,
  emphasis = false,
  dark = false,
}: {
  value: ReactNode;
  label: string;
  sub?: string;
  emphasis?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`stat${emphasis ? " stat-emphasis" : ""}${dark ? " stat-dark" : ""}`}>
      <span className="stat-figure">{value}</span>
      <span className="stat-label">{label}</span>
      {sub ? <span className="stat-sub">{sub}</span> : null}
    </div>
  );
}

export function StatRow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <div className={`stat-row${dark ? " stat-row-dark" : ""}`}>{children}</div>;
}

export function DeltaStat({
  before,
  after,
  label,
  unit,
  dark = false,
}: {
  before: string;
  after: string;
  label: string;
  unit?: string;
  dark?: boolean;
}) {
  return (
    <div className={`delta-stat${dark ? " delta-stat-dark" : ""}`}>
      <span className="delta-before">
        {before}
        {unit}
      </span>
      <span className="delta-arrow" aria-hidden="true">
        →
      </span>
      <span className="delta-after">
        {after}
        {unit}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export function RingStat({
  percent,
  label,
  dark = false,
}: {
  percent: number;
  label: string;
  dark?: boolean;
}) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className={`ring-stat${dark ? " ring-stat-dark" : ""}`}>
      <svg viewBox="0 0 120 120" width="120" height="120" role="img" aria-label={`${percent}% ${label}`}>
        {/* 배경 링 */}
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke={dark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          strokeWidth="4"
        />
        {/* 진행 링 */}
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke={dark ? "#2997ff" : "#004b96"}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transformOrigin: "60px 60px", transform: "rotate(-90deg)" }}
        />
        {/* 중앙 텍스트 — text-anchor: middle + dominant-baseline: central로 수직·수평 중앙 정렬 검증 */}
        <text x="60" y="60" textAnchor="middle" dominantBaseline="central" fontSize="28" fontWeight="800" fill={dark ? "#ffffff" : "#1d1d1f"}>
          {percent}%
        </text>
      </svg>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export function BarCompare({
  items,
  max,
  dark = false,
}: {
  items: { label: string; value: number; display?: string; muted?: boolean }[];
  max: number;
  dark?: boolean;
}) {
  return (
    <figure className={`bar-compare${dark ? " bar-compare-dark" : ""}`}>
      {items.map((item) => (
        <div key={item.label} className={`bar-compare-row${item.muted ? " bar-muted" : ""}`}>
          <span className="bar-label">{item.label}</span>
          <span className="bar-track">
            <span className="bar-fill" style={{ width: `${(item.value / max) * 100}%` }} />
          </span>
          <span className="bar-value">{item.display ?? item.value}</span>
        </div>
      ))}
    </figure>
  );
}

export function StepGate({
  steps,
  dark = false,
}: {
  steps: string[];
  dark?: boolean;
}) {
  return (
    <figure className={`step-gate${dark ? " step-gate-dark" : ""}`}>
      <ol className="step-gate-list">
        {steps.map((step, index) => (
          <li key={step}>
            <span className="step-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="step-label">{step}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function Timeline({
  items,
  dark = false,
}: {
  items: { date: string; title: string; desc?: string; muted?: boolean }[];
  dark?: boolean;
}) {
  return (
    <ol className={`viz-timeline${dark ? " viz-timeline-dark" : ""}`}>
      {items.map((item) => (
        <li key={`${item.date}-${item.title}`} className={item.muted ? "timeline-muted" : undefined}>
          {item.date ? <span className="timeline-date">{item.date}</span> : null}
          <span className="timeline-title">{item.title}</span>
          {item.desc ? <span className="timeline-desc">{item.desc}</span> : null}
        </li>
      ))}
    </ol>
  );
}

export function StatusTable({
  caption,
  columns,
  rows,
  dark = false,
}: {
  caption: string;
  columns: string[];
  rows: { cells: ReactNode[]; status?: "done" | "wip" }[];
  dark?: boolean;
}) {
  return (
    <div className={`status-table-wrap${dark ? " status-table-dark" : ""}`}>
      <table className="status-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={row.status === "wip" ? "status-wip" : undefined}>
              {row.cells.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type ArchNode = {
  id: string;
  label: string;
  kind?: "sensor" | "process" | "safety" | "output";
};

export type ArchEdge = {
  from: string;
  to: string;
  label?: string;
  kind?: "main" | "branch" | "loop";
};

/* rows 가 그리드 배치(행×열)를 결정한다 — 자동 레이아웃을 만들지 말 것.
   노드: rounded rect(8px) + 자체색 보더. 엣지: 직각 엘보 2px 라운드 캡.
   branch 는 실제로 갈라지고 loop 는 실제로 되돌아간다.
   SVG 텍스트는 text-anchor + dominant-baseline 로 중앙 정렬을 검증한다.
   rows 셀은 null 가능 (빈 그리드 셀 표현). */
export function ArchDiagram({
  rows,
  edges,
  dark = false,
}: {
  rows: (ArchNode | null)[][];
  edges: ArchEdge[];
  dark?: boolean;
}) {
  // 노드 맵: id → {row, col, x, y, w (auto-sized)}
  const nodeMap = new Map<string, { row: number; col: number; x: number; y: number; w: number }>();
  const nodeHeight = 44;
  const rowGap = 120; // vertical distance between row centers
  const padding = 24; // Defect #6: reduce from 40 to 24
  let maxNodeWidth = 0;
  const tempNodeMap = new Map<string, { w: number }>();

  // Step 1a: Pre-compute all node widths to find max for adaptive colWidth
  rows.forEach((row) => {
    row.forEach((node) => {
      if (!node) return;

      // Auto-size width based on label with correct CJK/latin metrics
      // Defect #6: Include Hangul syllables (U+AC00–U+D7A3) and jamo (U+3130–U+318F)
      const labelLines = node.label.split("\n");
      let maxWidth = 0;
      labelLines.forEach((line) => {
        let charWidth = 0;
        for (let i = 0; i < line.length; i++) {
          const charCode = line.charCodeAt(i);
          // CJK (U+2E80–U+9FFF), Hangul syllables (U+AC00–U+D7A3), Hangul jamo (U+3130–U+318F): 1 unit per char
          // Latin/digits: 0.62 * fontSize
          if ((charCode > 0x2e80 && charCode < 0x9fff) ||
              (charCode >= 0xac00 && charCode <= 0xd7a3) ||
              (charCode >= 0x3130 && charCode <= 0x318f)) {
            charWidth += 13; // Full-width char
          } else {
            charWidth += 13 * 0.62; // Latin char width
          }
        }
        maxWidth = Math.max(maxWidth, charWidth);
      });
      const autoNodeWidth = Math.max(maxWidth + 28, 100); // +28 padding
      maxNodeWidth = Math.max(maxNodeWidth, autoNodeWidth);
      tempNodeMap.set(node.id, { w: autoNodeWidth });
    });
  });

  // Defect #6: Adaptive colWidth based on actual content
  const colWidth = maxNodeWidth + 28;

  // Defect #3: Adaptive vertical padding: single-row gets ~8u, multi-row gets 24
  const rowCount = rows.length;
  const adaptivePadding = rowCount <= 1 ? 8 : 24;

  // Step 1b: Calculate node positions using adaptive colWidth and padding
  rows.forEach((row, rowIdx) => {
    row.forEach((node, colIdx) => {
      if (!node) return; // 빈 셀 스킵
      const x = padding + colIdx * colWidth + colWidth / 2;
      const y = adaptivePadding + rowIdx * rowGap + nodeHeight / 2;
      const autoNodeWidth = tempNodeMap.get(node.id)!.w;

      nodeMap.set(node.id, { row: rowIdx, col: colIdx, x, y, w: autoNodeWidth });
    });
  });

  // Defect #4: Check if diagram has edge labels
  const hasLabels = edges.some((e) => e.label && nodeMap.has(e.from) && nodeMap.has(e.to));

  // Defect #2: Reserve label lane upfront for single-row diagrams with labels
  // (hasLabels 선언 뒤에 와야 한다 — TDZ 주의)
  const labelLaneReserve = rowCount <= 1 && hasLabels ? 24 : 0;

  // Defect #2: Compute viewBox dimensions from actual routed edge paths
  // First pass: find all nodes and their boundaries
  const maxNodeY = Array.from(nodeMap.values()).reduce((max, node) => Math.max(max, node.y), 0);
  const maxNodeX = Array.from(nodeMap.values()).reduce((max, node) => Math.max(max, node.x), 0);
  const maxStoredNodeWidth = Array.from(nodeMap.values()).reduce((max, node) => Math.max(max, node.w), 0);

  let maxRoutedX = maxNodeX + maxStoredNodeWidth / 2; // Base: right edge of rightmost node
  let maxRoutedY = maxNodeY + nodeHeight / 2; // Base: bottom of lowest node

  // Defect #3: Estimate maxBranchLaneY early for consistent loopY calculation
  // Do a first pass to count branch edges from each source
  let maxBranchLaneY = 0;
  const branchEdgeCounts = new Map<string, number>();
  edges.forEach((edge) => {
    if (edge.kind === "branch" && nodeMap.has(edge.from)) {
      const sourceKey = edge.from;
      branchEdgeCounts.set(sourceKey, (branchEdgeCounts.get(sourceKey) || 0) + 1);
    }
  });
  // Compute max branch lane from initial estimate
  for (const [sourceKey, count] of branchEdgeCounts.entries()) {
    const fromNode = nodeMap.get(sourceKey)!;
    const baseBranchY = fromNode.y + 22 + 16;
    const deepestLaneY = baseBranchY + (count - 1) * 8;
    maxBranchLaneY = Math.max(maxBranchLaneY, deepestLaneY);
  }

  // Second pass: check edges for routing that extends beyond node boundaries
  edges.forEach((edge) => {
    if (!nodeMap.has(edge.from) || !nodeMap.has(edge.to)) return;
    const fromNode = nodeMap.get(edge.from)!;
    const toNode = nodeMap.get(edge.to)!;

    if (edge.kind === "branch") {
      // Branch routing: down from source, across, down to target
      maxRoutedY = Math.max(maxRoutedY, fromNode.y + 38);
    } else if (edge.kind === "loop") {
      // Defect #3: Use consistent loopY formula (matches drawEdgePath line 550)
      const loopY = maxBranchLaneY > 0 ? (maxBranchLaneY + 10) : (Math.max(fromNode.y, toNode.y) + 22 + 18);
      const corridorX = toNode.x - toNode.w / 2 - 16;
      maxRoutedY = Math.max(maxRoutedY, loopY);
      // Loop extends from source's right edge (x + w/2) + 40 to corridor at left
      const loopRightExtent = fromNode.x + fromNode.w / 2 + 40;
      const loopLeftExtent = corridorX;
      maxRoutedX = Math.max(maxRoutedX, loopRightExtent);
      maxRoutedX = Math.max(maxRoutedX, loopLeftExtent); // Also check left extent if it's far left
    } else if (fromNode.row === toNode.row) {
      // Same-row main edges with intervening node use bypass routing
      const minX = Math.min(fromNode.x, toNode.x);
      const maxX = Math.max(fromNode.x, toNode.x);
      let hasIntervening = false;
      Array.from(nodeMap.values()).forEach((n) => {
        if (n.row === fromNode.row && n.x > minX && n.x < maxX) {
          hasIntervening = true;
        }
      });
      if (hasIntervening) {
        // Bypass routing uses bypassY = fromNode.y + 38
        maxRoutedY = Math.max(maxRoutedY, fromNode.y + 38);
      }
    }
  });

  // Defect #3: Use adaptive padding (symmetric top/bottom)
  // Defect #2: Add label lane reserve for single-row diagrams
  // Label extent buffer will be added after label positions are computed
  const viewBoxWidthBase = maxRoutedX + adaptivePadding;
  const viewBoxHeightBase = maxRoutedY + adaptivePadding + labelLaneReserve;

  // Helper: compute perimeter anchors
  const getAnchor = (node: { x: number; y: number; w: number }, side: "top" | "bottom" | "left" | "right") => {
    const halfW = node.w / 2;
    const halfH = nodeHeight / 2;
    switch (side) {
      case "top": return { x: node.x, y: node.y - halfH };
      case "bottom": return { x: node.x, y: node.y + halfH };
      case "left": return { x: node.x - halfW, y: node.y };
      case "right": return { x: node.x + halfW, y: node.y };
    }
  };

  // Implementation of exact routing algorithm with sibling lane separation
  // Returns both the path d-string and the ACTUAL source anchor used (for grouping siblings)
  const drawEdgePath = (
    fromNode: { x: number; y: number; w: number; row: number },
    toNode: { x: number; y: number; w: number; row: number },
    kind?: string,
    siblingIndex = 0,
    siblingCount = 1
  ): { d: string; endAnchor: { x: number; y: number; dir: string }; sourceAnchor: { x: number; y: number; dir: string } } => {
    const sameRow = fromNode.y === toNode.y;
    const sameCol = fromNode.x === toNode.x;

    // Rule 1: SAME ROW, kind main
    if (sameRow && kind !== "branch" && kind !== "loop") {
      const start = getAnchor(fromNode, "right");
      const end = getAnchor(toNode, "left");

      // Check for intervening nodes on same row
      let hasIntervening = false;
      const minX = Math.min(fromNode.x, toNode.x);
      const maxX = Math.max(fromNode.x, toNode.x);

      Array.from(nodeMap.values()).forEach((n) => {
        if (n.row === fromNode.row && n.x > minX && n.x < maxX) {
          hasIntervening = true;
        }
      });

      // If intervening node exists, route below the band
      if (hasIntervening) {
        const bypassY = fromNode.y + 22 + 16; // below the node band
        const bottomEnd = getAnchor(toNode, "bottom");
        const d = `M ${start.x} ${start.y} L ${start.x} ${bypassY} L ${toNode.x} ${bypassY} L ${toNode.x} ${bottomEnd.y}`;
        return { d, endAnchor: { ...bottomEnd, dir: "up" }, sourceAnchor: { x: start.x, y: start.y, dir: "right" } };
      }

      return { d: `M ${start.x} ${start.y} L ${end.x} ${end.y}`, endAnchor: { ...end, dir: "right" }, sourceAnchor: { x: start.x, y: start.y, dir: "right" } };
    }

    // Rule 2: DIFFERENT ROW, same column → vertical elbow with corridor jog if blocked
    if (sameCol && !sameRow && kind !== "branch" && kind !== "loop") {
      const start = getAnchor(fromNode, "bottom");
      const end = getAnchor(toNode, "top");

      // Defect #2: Apply sibling lane separation if there are multiple siblings from same source to same row
      // Group by source + row direction (toNode.row > fromNode.row -> "down", else "up")
      let midY: number;
      if (siblingCount > 1) {
        const baseBranchY = fromNode.y + 22 + 16;
        const siblingLaneOffset = siblingIndex * 8;
        midY = baseBranchY + siblingLaneOffset;
      } else {
        midY = (start.y + end.y) / 2;
      }

      // Defect #2: Check for nodes in intermediate rows that block the vertical corridor
      const minRow = Math.min(fromNode.row, toNode.row);
      const maxRow = Math.max(fromNode.row, toNode.row);
      let corridorBlocked = false;

      for (const node of Array.from(nodeMap.values())) {
        // Check if node is in an intermediate row and in the same column corridor (x ± w/2)
        if (node.row > minRow && node.row < maxRow) {
          const nodeLeft = node.x - node.w / 2;
          const nodeRight = node.x + node.w / 2;
          const corridorX = start.x; // vertical line at this x

          if (corridorX >= nodeLeft && corridorX <= nodeRight) {
            corridorBlocked = true;
            break;
          }
        }
      }

      // If blocked, jog sideways into a clear corridor
      if (corridorBlocked) {
        // Find a clear x-position to the left or right of the obstruction
        const clearX = toNode.x - toNode.w / 2 - 16; // corridor left of target
        // Defect #1: Final leg must be vertical — descend to (end.y - 16), cross to toNode.x, then drop vertically
        const d = `M ${start.x} ${start.y} L ${start.x} ${midY} L ${clearX} ${midY} L ${clearX} ${end.y - 16} L ${toNode.x} ${end.y - 16} L ${toNode.x} ${end.y}`;
        return { d, endAnchor: { ...end, dir: "down" }, sourceAnchor: { x: start.x, y: start.y, dir: "down" } };
      }

      // No obstruction, use simple vertical path with sibling lane separation
      let d = `M ${start.x} ${start.y} L ${start.x} ${midY}`;
      if (start.x !== end.x) {
        d += ` L ${end.x} ${midY}`;
      }
      d += ` L ${end.x} ${end.y}`;
      return { d, endAnchor: { ...end, dir: "down" }, sourceAnchor: { x: start.x, y: start.y, dir: "down" } };
    }

    // Rule 3: DIFFERENT ROW & column, kind main → 3-leg elbow with round corners
    if (!sameRow && kind !== "branch" && kind !== "loop") {
      const start = getAnchor(fromNode, "bottom");
      // Defect #2: Apply sibling lane separation if there are multiple siblings from same source to same row direction
      let my: number;
      if (siblingCount > 1) {
        const baseBranchY = fromNode.y + 22 + 16;
        const siblingLaneOffset = siblingIndex * 8;
        my = baseBranchY + siblingLaneOffset;
      } else {
        my = (fromNode.y + toNode.y) / 2;
      }
      const end = getAnchor(toNode, "top");
      // 3-leg: down, right (if needed), down with slight quadratic rounding
      let d = `M ${start.x} ${start.y} L ${start.x} ${my}`;
      if (start.x !== toNode.x) {
        d += ` L ${toNode.x} ${my}`;
      }
      d += ` L ${toNode.x} ${end.y}`;
      return { d, endAnchor: { ...end, dir: "down" }, sourceAnchor: { x: start.x, y: start.y, dir: "down" } };
    }

    // Rule 4: kind "branch" → route based on row delta with sibling lane separation
    if (kind === "branch") {
      const start = getAnchor(fromNode, "bottom");

      // Compute sibling lane offset: each sibling gets its own lane at baseBranchY + k * 8 (k = 0..N-1)
      // This keeps horizontal legs of siblings on distinct lanes, ≥8u apart
      const baseBranchY = fromNode.y + 22 + 16;
      const siblingLaneOffset = (siblingIndex >= 0 && siblingCount > 1) ? (siblingIndex * 8) : 0;
      const branchY = baseBranchY + siblingLaneOffset;

      if (toNode.row > fromNode.row) {
        // Target in lower row → enter at top, arrow pointing DOWN
        const end = getAnchor(toNode, "top");

        // Defect #1: Check for nodes in intermediate rows that block the horizontal corridor to target
        let corridorBlocked = false;
        const minRow = fromNode.row;
        const maxRow = toNode.row;
        const corridorX = toNode.x;

        for (const node of Array.from(nodeMap.values())) {
          if (node.row > minRow && node.row < maxRow) {
            const nodeLeft = node.x - node.w / 2;
            const nodeRight = node.x + node.w / 2;
            if (corridorX >= nodeLeft && corridorX <= nodeRight) {
              corridorBlocked = true;
              break;
            }
          }
        }

        let d = `M ${start.x} ${start.y} L ${start.x} ${branchY}`;

        // If blocked, jog into a clear corridor
        if (corridorBlocked) {
          const clearX = toNode.x - toNode.w / 2 - 16;
          // Defect #1: Final leg must be vertical — descend to (end.y - 16), cross to toNode.x, then drop vertically
          d += ` L ${clearX} ${branchY} L ${clearX} ${end.y - 16} L ${toNode.x} ${end.y - 16} L ${toNode.x} ${end.y}`;
        } else {
          if (start.x !== toNode.x) {
            d += ` L ${toNode.x} ${branchY}`;
          }
          d += ` L ${toNode.x} ${end.y}`;
        }
        return { d, endAnchor: { ...end, dir: "down" }, sourceAnchor: { x: start.x, y: start.y, dir: "down" } };
      } else if (toNode.row === fromNode.row) {
        // Same row → keep below-the-band route, arrow UP
        const end = getAnchor(toNode, "bottom");
        const d = `M ${start.x} ${start.y} L ${start.x} ${branchY} L ${toNode.x} ${branchY} L ${toNode.x} ${end.y}`;
        return { d, endAnchor: { ...end, dir: "up" }, sourceAnchor: { x: start.x, y: start.y, dir: "down" } };
      } else {
        // Target in higher row → enter at bottom, arrow UP
        const end = getAnchor(toNode, "bottom");
        const d = `M ${start.x} ${start.y} L ${start.x} ${branchY} L ${toNode.x} ${branchY} L ${toNode.x} ${end.y}`;
        return { d, endAnchor: { ...end, dir: "up" }, sourceAnchor: { x: start.x, y: start.y, dir: "down" } };
      }
    }

    // Rule 5: kind "loop" → route OUTSIDE node band in clear corridor, fully orthogonal
    if (kind === "loop") {
      // Defect #3: Loop corridor must take its own lane BELOW the deepest branch lane
      // Note: maxBranchLaneY is precomputed and available in closure
      const loopY = maxBranchLaneY > 0 ? (maxBranchLaneY + 10) : (Math.max(fromNode.y, toNode.y) + 22 + 18);
      const start = getAnchor(fromNode, "right");

      // Defect #1: Fully orthogonal: corridor riser (vertical) at corridorX, then horizontal leg at target.y
      const corridorX = toNode.x - toNode.w / 2 - 16; // Clear corridor left of target
      const targetLeftAnchor = getAnchor(toNode, "left");

      // Path segments: right from start, down to loopY, left in corridor to corridorX,
      // up to target.y, right to target's left anchor
      const d = `M ${start.x} ${start.y} L ${start.x + 40} ${start.y} L ${start.x + 40} ${loopY} L ${corridorX} ${loopY} L ${corridorX} ${toNode.y} L ${targetLeftAnchor.x} ${targetLeftAnchor.y}`;
      return { d, endAnchor: { x: targetLeftAnchor.x, y: targetLeftAnchor.y, dir: "right" }, sourceAnchor: { x: start.x, y: start.y, dir: "right" } };
    }

    // Fallback
    return { d: `M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`, endAnchor: { x: toNode.x, y: toNode.y, dir: "down" }, sourceAnchor: { x: fromNode.x, y: fromNode.y, dir: "down" } };
  };

  // Render edges
  const validEdges = edges.filter((e) => nodeMap.has(e.from) && nodeMap.has(e.to));

  // Group edges by their source node and target row direction to determine sibling lane separation
  // Defect #2: Group both branch edges AND Rule 3 edges (different row, kind main) by source + row direction
  const sourceGroupMap = new Map<string, number[]>();
  validEdges.forEach((edge, idx) => {
    const fromNode = nodeMap.get(edge.from);
    const toNode = nodeMap.get(edge.to);
    if (!fromNode || !toNode) return;

    if (edge.kind === "branch") {
      // Branch edges: group by source node only
      const sourceKey = edge.from;
      if (!sourceGroupMap.has(sourceKey)) {
        sourceGroupMap.set(sourceKey, []);
      }
      sourceGroupMap.get(sourceKey)!.push(idx);
    } else if (fromNode.row !== toNode.row && edge.kind !== "loop") {
      // Rule 3 edges (different row, not loop): group by source node + target row direction
      const rowDirection = toNode.row > fromNode.row ? "down" : "up";
      const sourceKey = `${edge.from}:${rowDirection}`;
      if (!sourceGroupMap.has(sourceKey)) {
        sourceGroupMap.set(sourceKey, []);
      }
      sourceGroupMap.get(sourceKey)!.push(idx);
    }
  });

  // Defect #3: Precompute the deepest branch lane to position loop corridor below it
  maxBranchLaneY = 0;
  for (const [sourceKey, edgeIndices] of sourceGroupMap.entries()) {
    if (sourceKey.includes(":")) continue; // Skip Rule 3 entries (they have format "id:direction")
    // This is a branch edge group
    const edgeIdx = edgeIndices[0];
    const edge = validEdges[edgeIdx];
    const fromNode = nodeMap.get(edge.from)!;
    const baseBranchY = fromNode.y + 22 + 16;
    const siblingCount = edgeIndices.length;
    const deepestLaneY = baseBranchY + (siblingCount - 1) * 8;
    maxBranchLaneY = Math.max(maxBranchLaneY, deepestLaneY);
  }

  // Pre-compute all edge paths with sibling lane separation at route generation time
  const edgePaths = validEdges.map((edge, idx) => {
    const fromNode = nodeMap.get(edge.from)!;
    const toNode = nodeMap.get(edge.to)!;

    // Determine sibling index and count for this edge
    let siblingIndex = 0;
    let siblingCount = 1;
    if (edge.kind === "branch") {
      const sourceKey = edge.from;
      const siblingIndices = sourceGroupMap.get(sourceKey) || [];
      siblingIndex = siblingIndices.indexOf(idx);
      siblingCount = siblingIndices.length;

      // Safety check: if the edge isn't found in its source group, that's a bug
      // For now, ensure siblingIndex is non-negative
      if (siblingIndex < 0) {
        siblingIndex = 0;
      }
    } else if (fromNode.row !== toNode.row && edge.kind !== "loop") {
      // Defect #2: Rule 3 edges also get sibling lane separation
      const rowDirection = toNode.row > fromNode.row ? "down" : "up";
      const sourceKey = `${edge.from}:${rowDirection}`;
      const siblingIndices = sourceGroupMap.get(sourceKey) || [];
      siblingIndex = siblingIndices.indexOf(idx);
      siblingCount = siblingIndices.length;

      if (siblingIndex < 0) {
        siblingIndex = 0;
      }
    }

    return drawEdgePath(fromNode, toNode, edge.kind, siblingIndex, siblingCount); // siblingCount used in drawEdgePath
  });

  // Helper: parse path d string into segments [{x1, y1, x2, y2}, ...]
  const parsePathSegments = (d: string): { x1: number; y1: number; x2: number; y2: number }[] => {
    const segments: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const commands = d.match(/[ML]\s*[\d.-]+\s+[\d.-]+/g) || [];
    let currentX = 0;
    let currentY = 0;

    for (let i = 0; i < commands.length; i++) {
      const cmd = commands[i];
      if (!cmd) continue;
      const coords = cmd.match(/([\d.-]+)/g) || [];
      if (coords.length < 2 || coords[0] === undefined || coords[1] === undefined) continue;
      const x = parseFloat(coords[0]);
      const y = parseFloat(coords[1]);

      if (cmd.startsWith("M")) {
        currentX = x;
        currentY = y;
      } else if (cmd.startsWith("L")) {
        segments.push({ x1: currentX, y1: currentY, x2: x, y2: y });
        currentX = x;
        currentY = y;
      }
    }
    return segments;
  };

  // Build a shared list of all edge path segments for collision testing
  const allPathSegments: { x1: number; y1: number; x2: number; y2: number }[] = [];
  edgePaths.forEach((edgePath) => {
    const segments = parsePathSegments(edgePath.d);
    allPathSegments.push(...segments);
  });

  // Helper: compute label position from path segments with de-collision and viewBox clamping
  const computeLabelPosition = (
    d: string,
    label: string,
    fromNode: { x: number; y: number; w: number },
    toNode: { x: number; y: number; w: number },
    viewBoxWidth: number,
    viewBoxHeight: number
  ): { x: number; y: number } => {
    const segments = parsePathSegments(d);
    if (segments.length === 0) return { x: (fromNode.x + toNode.x) / 2, y: (fromNode.y + toNode.y) / 2 };

    // Find longest segment
    let longestIdx = 0;
    let longestLen = 0;
    segments.forEach((seg, idx) => {
      const len = Math.hypot(seg.x2 - seg.x1, seg.y2 - seg.y1);
      if (len > longestLen) {
        longestLen = len;
        longestIdx = idx;
      }
    });

    const seg = segments[longestIdx];

    // Defect #4: Measure label width using same char-width function as nodes
    const fontSize = 13;
    let labelWidth = 0;
    for (let i = 0; i < label.length; i++) {
      const charCode = label.charCodeAt(i);
      if ((charCode > 0x2e80 && charCode < 0x9fff) ||
          (charCode >= 0xac00 && charCode <= 0xd7a3) ||
          (charCode >= 0x3130 && charCode <= 0x318f)) {
        labelWidth += fontSize; // Full-width CJK/Hangul
      } else {
        labelWidth += fontSize * 0.62; // Latin char width
      }
    }
    labelWidth += 4; // padding

    const labelHeight = 16;
    const minDistToObjects = 3; // clearance from nodes, labels, paths

    // Offset perpendicular to the segment
    const dx = seg.x2 - seg.x1;
    const dy = seg.y2 - seg.y1;
    const len = Math.hypot(dx, dy);
    const perpX = dy / len;
    const perpY = -dx / len;

    // Base position: center of longest segment, offset perpendicular
    const baseLabelX = (seg.x1 + seg.x2) / 2 + perpX * 12;
    const baseLabelY = (seg.y1 + seg.y2) / 2 + perpY * 12;

    // Defect #4: Try candidate nudges in all four directions
    const candidates: { x: number; y: number; distance: number }[] = [];

    // Helper: check if a label bbox at (x, y) collides with any objects (test against ALL edge segments)
    const hasCollision = (labelX: number, labelY: number): boolean => {
      const labelLeft = labelX - labelWidth / 2;
      const labelRight = labelX + labelWidth / 2;
      const labelTop = labelY - labelHeight / 2;
      const labelBottom = labelY + labelHeight / 2;

      // Check node collision (with clearance)
      for (const node of Array.from(nodeMap.values())) {
        const nodeLeft = node.x - node.w / 2;
        const nodeRight = node.x + node.w / 2;
        const nodeTop = node.y - nodeHeight / 2;
        const nodeBottom = node.y + nodeHeight / 2;

        // Defect #4: Enforce minDistToObjects clearance from nodes too
        if (labelLeft < nodeRight + minDistToObjects && labelRight > nodeLeft - minDistToObjects &&
            labelTop < nodeBottom + minDistToObjects && labelBottom > nodeTop - minDistToObjects) {
          return true;
        }
      }

      // Check collision with ALL path segments (not just this edge's segments)
      // Defect #1: Use proper RECT-vs-SEGMENT distance test
      for (const pathSeg of allPathSegments) {
        const segX1 = pathSeg.x1;
        const segX2 = pathSeg.x2;
        const segY1 = pathSeg.y1;
        const segY2 = pathSeg.y2;
        const segDx = segX2 - segX1;
        const segDy = segY2 - segY1;
        const segLen = Math.hypot(segDx, segDy);

        if (segLen > 0) {
          // Orthogonal segments: either vertical (dx=0) or horizontal (dy=0)
          const isVertical = Math.abs(segDx) < 0.1; // ~vertical
          const isHorizontal = Math.abs(segDy) < 0.1; // ~horizontal

          let distToSegRect = Infinity;

          if (isVertical) {
            // Vertical segment: check horizontal distance from label bbox edges
            const segX = segX1;
            // Find the y-range of the segment
            const segMinY = Math.min(segY1, segY2);
            const segMaxY = Math.max(segY1, segY2);

            // Check if label y-range overlaps segment y-range
            if (!(labelBottom < segMinY || labelTop > segMaxY)) {
              // Y-ranges overlap: use horizontal distance
              const distLeft = Math.abs(labelRight - segX);
              const distRight = Math.abs(labelLeft - segX);
              distToSegRect = Math.min(distLeft, distRight);
            }
          } else if (isHorizontal) {
            // Horizontal segment: check vertical distance from label bbox edges
            const segY = segY1;
            // Find the x-range of the segment
            const segMinX = Math.min(segX1, segX2);
            const segMaxX = Math.max(segX1, segX2);

            // Check if label x-range overlaps segment x-range
            if (!(labelRight < segMinX || labelLeft > segMaxX)) {
              // X-ranges overlap: use vertical distance
              const distTop = Math.abs(labelBottom - segY);
              const distBottom = Math.abs(labelTop - segY);
              distToSegRect = Math.min(distTop, distBottom);
            }
          }

          if (distToSegRect < minDistToObjects) {
            return true;
          }
        }
      }

      return false;
    };

    // Defect #4: Clamp positions to keep label bboxes ≥8u inside viewBox
    // Defect #2: labelLaneReserve already expands viewBox, so just use standard bounds
    const labelClampMargin = 8;
    const labelSafeLeft = labelClampMargin + labelWidth / 2;
    const labelSafeRight = viewBoxWidth - labelClampMargin - labelWidth / 2;
    const labelSafeTop = labelClampMargin + labelHeight / 2;
    const labelSafeBottom = viewBoxHeight - labelClampMargin - labelHeight / 2;

    const isWithinViewBoxClamp = (x: number, y: number): boolean => {
      return x >= labelSafeLeft && x <= labelSafeRight && y >= labelSafeTop && y <= labelSafeBottom;
    };

    // Try base position
    if (!hasCollision(baseLabelX, baseLabelY) && isWithinViewBoxClamp(baseLabelX, baseLabelY)) {
      return { x: baseLabelX, y: baseLabelY };
    }

    // Try candidate nudges in all four directions with increasing distance
    const directions = [
      { dx: 0, dy: -1, name: "up" },
      { dx: 0, dy: 1, name: "down" },
      { dx: -1, dy: 0, name: "left" },
      { dx: 1, dy: 0, name: "right" },
    ];

    for (let distance = 12; distance <= 60; distance += 12) {
      for (const dir of directions) {
        const candidateX = baseLabelX + dir.dx * distance;
        const candidateY = baseLabelY + dir.dy * distance;

        if (!hasCollision(candidateX, candidateY) && isWithinViewBoxClamp(candidateX, candidateY)) {
          candidates.push({ x: candidateX, y: candidateY, distance });
        }
      }

      if (candidates.length > 0) {
        // Return the closest clear candidate
        return candidates.reduce((best, current) => current.distance < best.distance ? current : best);
      }
    }

    // Fallback: clamp to viewBox bounds even if colliding (grow viewBox if labels overflow)
    const clampedX = Math.max(labelSafeLeft, Math.min(labelSafeRight, baseLabelX));
    const clampedY = Math.max(labelSafeTop, Math.min(labelSafeBottom, baseLabelY));
    return { x: clampedX, y: clampedY };
  };

  // Compute final viewBox with label extents
  let maxLabelY = viewBoxHeightBase - adaptivePadding; // Start from base max
  if (hasLabels) {
    validEdges.forEach((edge, idx) => {
      if (edge.label) {
        const fromNode = nodeMap.get(edge.from)!;
        const toNode = nodeMap.get(edge.to)!;
        // Use base viewBox for label positioning
        const labelPos = computeLabelPosition(edgePaths[idx].d, edge.label, fromNode, toNode, viewBoxWidthBase, viewBoxHeightBase);
        const labelHeight = 16;
        const labelBottom = labelPos.y + labelHeight / 2;
        maxLabelY = Math.max(maxLabelY, labelBottom);
      }
    });
  }

  // Final viewBox with symmetric padding
  const viewBoxWidth = viewBoxWidthBase;
  const viewBoxHeight = maxLabelY + adaptivePadding;

  return (
    <figure className={`arch-diagram${dark ? " arch-diagram-dark" : ""}`}>
      <div className="arch-diagram-scroll">
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Architecture diagram"
          style={{
            width: "100%",
            maxWidth: "100%",
            height: "auto"
          }}
        >
          {/* Edge paths (render first, under nodes) */}
          {validEdges.map((edge, idx) => {
            const { d } = edgePaths[idx];

            return (
              <g key={`edge-${idx}`}>
                {/* Base solid path */}
                <path
                  d={d}
                  fill="none"
                  stroke={dark ? "#2997ff" : "#004b96"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="arch-edge"
                />
                {/* Defect #9: Overlay animated path — use surface tone at 0.5 opacity for visible compositing */}
                <path
                  d={d}
                  fill="none"
                  stroke={dark ? "rgba(39, 39, 41, 0.5)" : "rgba(255, 255, 255, 0.5)"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="arch-edge-overlay"
                />
              </g>
            );
          })}

          {/* Node groups (render second, over edges) */}
          {rows.map((row) =>
            row.map((node) => {
              if (!node) return null;
              const pos = nodeMap.get(node.id)!;
              const isSafety = node.kind === "safety";
              const borderColor = isSafety ? (dark ? "#2997ff" : "#004b96") : "currentColor";

              // Multi-line label support
              const labelLines = node.label.split("\n");
              const lineHeight = 14;
              const totalHeight = labelLines.length * lineHeight;
              const startY = pos.y - totalHeight / 2 + lineHeight / 2;

              const nodeY = pos.y - nodeHeight / 2;

              return (
                <g key={node.id}>
                  <rect
                    x={pos.x - pos.w / 2}
                    y={nodeY}
                    width={pos.w}
                    height={nodeHeight}
                    rx="8"
                    ry="8"
                    fill={dark ? "#272729" : "#ffffff"}
                    stroke={borderColor}
                    strokeWidth="1"
                  />
                  {/* Multi-line text with correct centering */}
                  <text
                    x={pos.x}
                    y={startY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="13"
                    fontWeight="600"
                    fill={isSafety ? borderColor : dark ? "#ffffff" : "#1d1d1f"}
                  >
                    {labelLines.map((line, idx) => (
                      <tspan key={idx} x={pos.x} dy={idx === 0 ? 0 : lineHeight}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })
          )}

          {/* Edge labels (render third, over nodes) */}
          {validEdges.map((edge, idx) => {
            if (!edge.label) return null;

            const fromNode = nodeMap.get(edge.from)!;
            const toNode = nodeMap.get(edge.to)!;
            const { d } = edgePaths[idx];

            // Compute label position from routed path with collision detection and viewBox clamping
            const labelPos = computeLabelPosition(d, edge.label, fromNode, toNode, viewBoxWidth, viewBoxHeight);

            return (
              <text
                key={`label-${idx}`}
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="13"
                fill={dark ? "#cccccc" : "#333333"}
                className="edge-label"
              >
                {edge.label}
              </text>
            );
          })}

          {/* Arrowheads (render last, on top) */}
          {validEdges.map((edge, idx) => {
            const { endAnchor } = edgePaths[idx];
            const arrowSize = 7;

            // Draw arrowhead as polygon, oriented along final segment direction
            let points = "";
            switch (endAnchor.dir) {
              case "right": // pointing right
                points = `${endAnchor.x - arrowSize},${endAnchor.y - arrowSize} ${endAnchor.x},${endAnchor.y} ${endAnchor.x - arrowSize},${endAnchor.y + arrowSize}`;
                break;
              case "down": // pointing down
                points = `${endAnchor.x - arrowSize},${endAnchor.y - arrowSize} ${endAnchor.x},${endAnchor.y} ${endAnchor.x + arrowSize},${endAnchor.y - arrowSize}`;
                break;
              case "up": // pointing up
                points = `${endAnchor.x - arrowSize},${endAnchor.y + arrowSize} ${endAnchor.x},${endAnchor.y} ${endAnchor.x + arrowSize},${endAnchor.y + arrowSize}`;
                break;
              default: // left
                points = `${endAnchor.x + arrowSize},${endAnchor.y - arrowSize} ${endAnchor.x},${endAnchor.y} ${endAnchor.x + arrowSize},${endAnchor.y + arrowSize}`;
            }

            return (
              <polygon
                key={`arrow-${idx}`}
                points={points}
                fill={dark ? "#2997ff" : "#004b96"}
              />
            );
          })}
        </svg>
      </div>
    </figure>
  );
}
