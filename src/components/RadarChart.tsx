import { useCallback, useMemo } from "react";

interface RadarChartProps {
  data: { label: string; value: number }[];
  size?: number;
}

export function RadarChart({ data, size = 280 }: RadarChartProps) {
  const center = size / 2;
  const radius = size / 2 - 50;
  const levels = 4;
  const angleSlice = (Math.PI * 2) / data.length;

  const getPoint = useCallback(
    (value: number, index: number) => {
      const angle = angleSlice * index - Math.PI / 2;
      const r = (value / 100) * radius;
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle),
      };
    },
    [angleSlice, radius, center]
  );

  const gridLevels = useMemo(
    () =>
      Array.from({ length: levels }, (_, i) => {
        const r = (radius / levels) * (i + 1);
        const points = data
          .map((_, j) => {
            const angle = angleSlice * j - Math.PI / 2;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
          })
          .join(" ");
        return points;
      }),
    [data, angleSlice, radius, center, levels]
  );

  const dataPoints = data.map((d, i) => getPoint(d.value, i));
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      {/* Grid */}
      {gridLevels.map((points, i) => (
        <polygon key={i} points={points} fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
      ))}
      {/* Axes */}
      {data.map((d, i) => {
        const end = getPoint(100, i);
        return (
          <g key={i}>
            <line x1={center} y1={center} x2={end.x} y2={end.y} stroke="hsl(var(--border))" strokeWidth="1" />
            <text
              x={getPoint(118, i).x}
              y={getPoint(118, i).y}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-muted-foreground text-[10px]"
            >
              {d.label}
            </text>
          </g>
        );
      })}
      {/* Data polygon */}
      <polygon points={dataPath} fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />
      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="hsl(var(--primary))" />
      ))}
    </svg>
  );
}
