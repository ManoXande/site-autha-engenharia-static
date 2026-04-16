"use client";
import { useEffect, useRef } from "react";

interface Node { name: string; x: number; y: number; main?: boolean; key?: boolean; }

// ─────────────────────────────────────────────────
// TIN mesh — 24 nodes with organic irregular offsets
// ViewBox: 480×336  |  Same topology: 32 triangles
// Positions are hand-perturbed to mimic a real
// Triangulated Irregular Network (survey data feel)
// dasharray raised to 110 to cover longer diagonals
// ─────────────────────────────────────────────────
const NODES: Node[] = [
  // Row 0  ─ 4 nodes
  { name: "Bom Jesus do Oeste",  x: 153, y: 51  },           // 0
  { name: "Modelo",              x: 199, y: 63  },           // 1
  { name: "Maravilha",           x: 283, y: 48  },           // 2
  { name: "Xanxerê",             x: 331, y: 59,  key: true },// 3
  // Row 1  ─ 5 nodes
  { name: "São Miguel do Oeste", x: 114, y: 103, key: true },// 4
  { name: "Cunha Porã",          x: 184, y: 123 },           // 5
  { name: "Chapecó",             x: 234, y: 115, main: true },// 6
  { name: "Pinhalzinho",         x: 316, y: 101 },           // 7
  { name: "Abelardo Luz",        x: 365, y: 120, key: true },// 8
  // Row 2  ─ 6 nodes
  { name: "Iporã do Oeste",      x: 80,  y: 161 },           // 9
  { name: "Mondaí",              x: 131, y: 181 },           // 10
  { name: "Caibi",               x: 219, y: 158 },           // 11
  { name: "Quilombo",            x: 264, y: 180 },           // 12
  { name: "Coronel Freitas",     x: 349, y: 157 },           // 13
  { name: "Irati",               x: 399, y: 176 },           // 14
  // Row 3  ─ 5 nodes
  { name: "Descanso",            x: 116, y: 218 },           // 15
  { name: "Palmitos",            x: 162, y: 236 },           // 16
  { name: "Riqueza",             x: 250, y: 215 },           // 17
  { name: "Caxambu do Sul",      x: 295, y: 234 },           // 18
  { name: "Guatambú",            x: 364, y: 232 },           // 19
  // Row 4  ─ 4 nodes
  { name: "São Carlos",          x: 135, y: 287 },           // 20
  { name: "Águas de Chapecó",    x: 216, y: 275 },           // 21
  { name: "Saudades",            x: 265, y: 288 },           // 22
  { name: "Nova Erechim",        x: 346, y: 277 },           // 23
];

// 32 triangles — complete hex grid triangulation
const TRIS: [number, number, number][] = [
  // Rows 0 → 1  (7)
  [0,4,5], [0,1,5], [1,5,6], [1,2,6], [2,6,7], [2,3,7], [3,7,8],
  // Rows 1 → 2  (9)
  [4,9,10], [4,5,10], [5,10,11], [5,6,11], [6,11,12], [6,7,12], [7,12,13], [7,8,13], [8,13,14],
  // Rows 2 → 3  (9)
  [9,10,15], [10,15,16], [10,11,16], [11,16,17], [11,12,17], [12,17,18], [12,13,18], [13,18,19], [13,14,19],
  // Rows 3 → 4  (7)
  [15,16,20], [16,20,21], [16,17,21], [17,21,22], [17,18,22], [18,22,23], [18,19,23],
];

// Hull — follows boundary nodes' actual TIN positions
// vertices: 0,1,2,3 → 8 → 14 → 19 → 23,22,21,20 → 15 → 9 → 4
const HULL =
  "M 153,51 L 199,63 L 283,48 L 331,59 " +
  "L 365,120 L 399,176 L 364,232 " +
  "L 346,277 L 265,288 L 216,275 L 135,287 " +
  "L 116,218 L 80,161 L 114,103 Z";

function uniqueEdges(tris: [number, number, number][]): [number, number][] {
  const seen = new Set<string>();
  const out: [number, number][] = [];
  for (const [a, b, c] of tris) {
    for (const [p, q] of [[a,b],[b,c],[a,c]] as [number,number][]) {
      const k = `${Math.min(p,q)}-${Math.max(p,q)}`;
      if (!seen.has(k)) { seen.add(k); out.push([p, q]); }
    }
  }
  return out;
}
const EDGES = uniqueEdges(TRIS);

export default function TerritoryMap({
  className,
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animate) return;
    const svg = svgRef.current;
    if (!svg) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        svg.setAttribute("data-active", "true");
      },
      { threshold: 0.3 }
    );
    obs.observe(svg);
    return () => obs.disconnect();
  }, [animate]);

  const pingNodes = NODES
    .map((n, i) => ({ ...n, i }))
    .filter(n => n.main || n.key);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 480 336"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: 480, width: "100%", display: "block" }}
      className={className}
      role="img"
      aria-label="Mapa de atuação — base no oeste catarinense"
    >
      <defs>
        <radialGradient id="tm-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#4ade80" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
        </radialGradient>
        <filter id="tm-blur">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      <style>{`
        /* Hull */
        .tm-hull { opacity: 0; }
        svg[data-active] .tm-hull {
          animation: tmFadeIn 1.4s ease 0.05s forwards;
        }

        /* Triangle fills */
        .tm-tri { fill: rgba(74,222,128,0); stroke: none; }
        svg[data-active] .tm-tri {
          animation: tmTriReveal 0.9s ease forwards;
        }

        /* Mesh edges — dasharray 110 covers longest diagonal in TIN (~90px) */
        .tm-edge {
          stroke: rgba(74,222,128,0.20);
          stroke-width: 0.7;
          stroke-linecap: round;
          stroke-dasharray: 110;
          stroke-dashoffset: 110;
          fill: none;
        }
        svg[data-active] .tm-edge {
          animation: tmEdgeDraw 0.5s ease forwards;
        }

        /* Glow */
        .tm-glow { opacity: 0; }
        svg[data-active] .tm-glow {
          animation: tmFadeIn 2s ease 1.2s forwards;
        }

        /* Ping rings */
        .tm-ping {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          fill: rgba(74,222,128,0.42);
        }
        svg[data-active] .tm-ping {
          animation: tmPing 3s ease-out infinite;
        }

        /* Dots */
        .tm-dot {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        svg[data-active] .tm-dot {
          animation: tmDotPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }

        @keyframes tmFadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes tmTriReveal {
          0%   { fill: rgba(74,222,128,0);    }
          55%  { fill: rgba(74,222,128,0.07); }
          100% { fill: rgba(74,222,128,0.03); }
        }
        @keyframes tmEdgeDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes tmDotPop {
          0%   { opacity: 0; transform: scale(0.2);  }
          75%  { opacity: 1; transform: scale(1.2);  }
          100% { opacity: 1; transform: scale(1);    }
        }
        @keyframes tmPing {
          0%   { transform: scale(1);   opacity: 0;    }
          14%  { opacity: 0.45; }
          100% { transform: scale(5.5); opacity: 0;    }
        }
      `}</style>

      {/* ── Outer hull ── */}
      <path
        d={HULL}
        className="tm-hull"
        fill="rgba(74,222,128,0.022)"
        stroke="rgba(74,222,128,0.30)"
        strokeWidth={0.9}
        strokeDasharray="7 5"
      />

      {/* ── Triangle fills ── */}
      {TRIS.map(([a, b, c], i) => (
        <polygon
          key={`tri-${i}`}
          className="tm-tri"
          points={`${NODES[a].x},${NODES[a].y} ${NODES[b].x},${NODES[b].y} ${NODES[c].x},${NODES[c].y}`}
          style={{ animationDelay: `${150 + i * 52}ms` }}
        />
      ))}

      {/* ── Mesh edges ── */}
      {EDGES.map(([a, b], i) => (
        <line
          key={`edge-${i}`}
          className="tm-edge"
          x1={NODES[a].x} y1={NODES[a].y}
          x2={NODES[b].x} y2={NODES[b].y}
          style={{ animationDelay: `${260 + i * 26}ms` }}
        />
      ))}

      {/* ── Chapecó ambient glow ── */}
      <circle
        className="tm-glow"
        cx={NODES[6].x} cy={NODES[6].y}
        r={44}
        fill="url(#tm-glow)"
        filter="url(#tm-blur)"
        aria-hidden="true"
      />

      {/* ── Ping rings — main + key cities ── */}
      {pingNodes.map((n, pi) => (
        <circle
          key={`ping-${n.name}`}
          className="tm-ping"
          cx={n.x} cy={n.y}
          r={n.main ? 6 : 4}
          aria-hidden="true"
          style={{ animationDelay: `${1100 + pi * 460}ms` }}
        />
      ))}

      {/* ── Municipality dots — 3-tier hierarchy ── */}
      {NODES.map((n, i) => (
        <circle
          key={n.name}
          className="tm-dot"
          cx={n.x} cy={n.y}
          r={n.main ? 6 : n.key ? 4 : 3}
          fill={
            n.main ? "#4ade80"
            : n.key ? "rgba(74,222,128,0.88)"
            : "rgba(74,222,128,0.55)"
          }
          style={{
            filter: n.main
              ? "drop-shadow(0 0 6px rgba(74,222,128,0.95))"
              : n.key
              ? "drop-shadow(0 0 3px rgba(74,222,128,0.65))"
              : undefined,
            animationDelay: `${700 + i * 42}ms`,
          }}
        >
          <title>{n.name}</title>
        </circle>
      ))}

    </svg>
  );
}
