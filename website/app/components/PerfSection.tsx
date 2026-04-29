"use client";
import { useEffect, useRef, useState } from "react";

const PERF_DATA = [
  { label: "Shader Compilation", shimera: 1.2, raw: 4.8, unit: "ms" },
  { label: "Uniform Binding", shimera: 0.04, raw: 0.18, unit: "ms" },
  { label: "Context Init", shimera: 8.3, raw: 22.1, unit: "ms" },
  { label: "Batch Draw Calls", shimera: 0.31, raw: 0.89, unit: "ms" },
];

const THROUGHPUT_DATA = [
  { label: "Jan", fps: 0 },
  { label: "Feb", fps: 0 },
  { label: "Mar", fps: 180 },
  { label: "Apr", fps: 220 },
  { label: "May", fps: 260 },
  { label: "Jun", fps: 310 },
  { label: "Jul", fps: 380 },
  { label: "Aug", fps: 420 },
];

function AnimatedBar({ value, max, color, delay }: { value: number; max: number; color: string; delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth((value / max) * 100), delay);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, max, delay]);

  return (
    <div ref={ref} style={{
      height: "8px",
      background: "var(--bg-elevated)",
      borderRadius: "4px",
      overflow: "hidden",
    }}>
      <div style={{
        height: "100%",
        width: `${width}%`,
        background: color,
        borderRadius: "4px",
        transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: `0 0 8px ${color}66`,
      }}/>
    </div>
  );
}

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setVal(target);
              clearInterval(timer);
            } else {
              setVal(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// Sparkline SVG chart
function SparklineChart() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const w = 400, h = 120;
  const maxFps = 480;
  const points = THROUGHPUT_DATA.map((d, i) => ({
    x: (i / (THROUGHPUT_DATA.length - 1)) * (w - 40) + 20,
    y: h - 20 - (d.fps / maxFps) * (h - 30),
    fps: d.fps,
    label: d.label,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${h - 20} L ${points[0].x} ${h - 20} Z`;

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", overflow: "visible" }}>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)"/>
            <stop offset="100%" stopColor="var(--cyan)"/>
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((v) => (
          <line
            key={v}
            x1={20} y1={h - 20 - v * (h - 30)}
            x2={w - 20} y2={h - 20 - v * (h - 30)}
            stroke="var(--border)" strokeWidth="1"
          />
        ))}

        {/* Area */}
        {animated && (
          <path d={areaD} fill="url(#chartGrad)" style={{ transition: "opacity 0.5s" }}/>
        )}

        {/* Line */}
        {animated && (
          <path
            d={pathD}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Points */}
        {animated && points.filter(p => p.fps > 0).map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5"/>
          </g>
        ))}

        {/* X labels */}
        {THROUGHPUT_DATA.map((d, i) => (
          <text
            key={i}
            x={points[i].x}
            y={h - 4}
            textAnchor="middle"
            fill="var(--text-dim)"
            fontSize="9"
            fontFamily="'JetBrains Mono', monospace"
          >
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

export default function PerfSection() {
  return (
    <section id="performance" style={{ padding: "5rem 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(124,106,255,0.08)", border: "1px solid rgba(124,106,255,0.2)",
            borderRadius: "100px", padding: "0.25rem 0.75rem", marginBottom: "1rem",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }}/>
            <span style={{ fontSize: "0.75rem", color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}>
              benchmarks
            </span>
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Built for speed.
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "540px" }}>
            Shimera's zero-overhead abstraction layer adds no measurable cost vs raw OpenGL calls, while eliminating the boilerplate.
          </p>
        </div>

        {/* Big stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "var(--border)",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "3rem",
        }}>
          {[
            { value: 420, suffix: " FPS", label: "Peak framerate", sub: "on RTX 4090" },
            { value: 74, suffix: "%", label: "Less boilerplate", sub: "vs raw OpenGL" },
            { value: 3, suffix: "ms", label: "Avg compile time", sub: "full shader pipeline" },
            { value: 99, suffix: ".8%", label: "Draw accuracy", sub: "pixel-perfect" },
          ].map(({ value, suffix, label, sub }, i) => (
            <div key={i} style={{
              background: "var(--bg-card)",
              padding: "1.75rem",
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "2.25rem",
                fontWeight: 700,
                color: i % 2 === 0 ? "var(--text)" : "var(--accent)",
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}>
                <AnimatedNumber target={value} suffix={suffix}/>
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>{label}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {/* Bar chart */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.25rem", fontFamily: "'JetBrains Mono', monospace" }}>
              benchmark_results.json
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1.5rem" }}>
              Shimera vs raw OpenGL (lower is better)
            </h3>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--accent)", display: "inline-block" }}/>
                Shimera
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--text-dim)", display: "inline-block" }}/>
                Raw OpenGL
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {PERF_DATA.map((item, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.label}</span>
                    <span style={{ fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--accent)" }}>
                      {item.shimera}{item.unit}
                    </span>
                  </div>
                  <AnimatedBar value={item.shimera} max={item.raw} color="var(--accent)" delay={i * 150}/>
                  <div style={{ marginTop: "0.3rem" }}>
                    <AnimatedBar value={item.raw} max={item.raw} color="var(--text-dim)" delay={i * 150 + 100}/>
                  </div>
                  <div style={{ textAlign: "right", fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>
                    {item.raw}{item.unit} raw
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sparkline */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.25rem", fontFamily: "'JetBrains Mono', monospace" }}>
              throughput_2024.csv
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Framerate improvements over releases
            </h3>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              Each release brings measurable GPU throughput gains.
            </p>
            <SparklineChart/>
            <div style={{
              marginTop: "1.5rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}>
              {[
                { label: "Peak FPS", value: "420", note: "v0.8.0" },
                { label: "Avg overhead", value: "~0.2%", note: "vs raw GL" },
                { label: "Draw call cost", value: "0.31ms", note: "batched" },
                { label: "GPU mem usage", value: "−38%", note: "smart pooling" },
              ].map(({ label, value, note }) => (
                <div key={label} style={{
                  padding: "0.75rem",
                  background: "var(--bg-elevated)",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginBottom: "0.2rem" }}>{label}</div>
                  <div style={{ fontSize: "1rem", fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>{value}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>{note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
