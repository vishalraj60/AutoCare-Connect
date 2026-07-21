import React from 'react';

/** Minimal pure-SVG bar chart — no external deps */
export function BarChart({ data = [], height = 120, color = '#2563EB', label = 'jobs' }) {
  if (!data.length) return null;
  const max = Math.max(...data.map(d => d[label] || 0), 1);
  const W = 40;
  const GAP = 8;
  const totalW = data.length * (W + GAP) - GAP;

  return (
    <div className="overflow-x-auto">
      <svg width={totalW} height={height + 24} style={{ minWidth: '100%', display: 'block' }}>
        {data.map((d, i) => {
          const val = d[label] || 0;
          const barH = Math.round((val / max) * height);
          const x = i * (W + GAP);
          const y = height - barH;
          return (
            <g key={i}>
              {/* Background bar */}
              <rect x={x} y={0} width={W} height={height} rx={6} fill="#F8FAFC" />
              {/* Value bar */}
              <rect x={x} y={y} width={W} height={barH} rx={6} fill={color} opacity={0.85} />
              {/* Label */}
              <text x={x + W / 2} y={height + 16} textAnchor="middle" fontSize={10} fill="#94a3b8" fontFamily="Inter, system-ui">
                {d.label}
              </text>
              {/* Value tooltip on top */}
              {barH > 14 && (
                <text x={x + W / 2} y={y + 13} textAnchor="middle" fontSize={10} fill="white" fontWeight="700" fontFamily="Inter, system-ui">
                  {val}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Mini sparkline for stat cards */
export function Sparkline({ values = [], color = '#2563EB', height = 32, width = 80 }) {
  if (values.length < 2) return null;
  const max = Math.max(...values, 1);
  const min = Math.min(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);

  const points = values.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  const fillPoints = `0,${height} ${points} ${(values.length - 1) * step},${height}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fillPoints} fill={`url(#sg-${color.replace('#','')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
