"use client";
import { useState, useEffect, useRef } from "react";

const CODE_LINES = [
  { text: `#include <shimera/shimera.hpp>`, type: "include" },
  { text: ``, type: "blank" },
  { text: `int main() {`, type: "normal" },
  { text: `  // Initialize Shimera context`, type: "comment" },
  { text: `  shm::Context ctx = shm::Context::create();`, type: "normal" },
  { text: ``, type: "blank" },
  { text: `  // Load & compile shaders in one line`, type: "comment" },
  { text: `  auto shader = ctx.shader()`, type: "normal" },
  { text: `    .vert("shaders/scene.vert")`, type: "chain" },
  { text: `    .frag("shaders/pbr.frag")`, type: "chain" },
  { text: `    .build();`, type: "chain" },
  { text: ``, type: "blank" },
  { text: `  // Bind uniforms with fluent API`, type: "comment" },
  { text: `  shader.bind()`, type: "normal" },
  { text: `    .set("u_time", ctx.elapsed())`, type: "chain" },
  { text: `    .set("u_resolution", ctx.viewport())`, type: "chain" },
  { text: `    .set("u_color", glm::vec3(1.0f, 0.5f, 0.8f));`, type: "chain" },
  { text: ``, type: "blank" },
  { text: `  // Render loop — Shimera handles the rest`, type: "comment" },
  { text: `  ctx.run([&](shm::Frame& f) {`, type: "normal" },
  { text: `    f.clear(shm::Color::dark());`, type: "indent" },
  { text: `    f.draw(mesh, shader);`, type: "indent" },
  { text: `  });`, type: "normal" },
  { text: `}`, type: "normal" },
];

function renderLine(line: { text: string; type: string }) {
  if (line.type === "blank") return <span>&nbsp;</span>;
  if (line.type === "comment") {
    return <span className="code-comment">{line.text}</span>;
  }
  if (line.type === "include") {
    const parts = line.text.match(/^(#include)\s+(<.*>)$/);
    if (parts) {
      return (
        <>
          <span className="code-keyword">{parts[1]}</span>
          <span> </span>
          <span className="code-string">{parts[2]}</span>
        </>
      );
    }
  }

  // Generic colorizing
  let result = line.text;
  const indented = result.startsWith("    ") || result.startsWith("  ");

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: result
          .replace(/\b(int|auto|void|float|const|return)\b/g, '<span class="code-keyword">$1</span>')
          .replace(/\b(shm::\w+)/g, '<span class="code-type">$1</span>')
          .replace(/\b(glm::\w+)/g, '<span class="code-type">$1</span>')
          .replace(/"([^"]*)"/g, '<span class="code-string">"$1"</span>')
          .replace(/\.(vert|frag|build|bind|set|run|draw|clear|create|elapsed|viewport|dark|shader)\b/g, '.<span class="code-fn">$1</span>')
          .replace(/\b(main|ctx|shader|mesh|f)\b/g, '<span class="code-var">$1</span>')
          .replace(/\b(\d+\.\d+f?|\d+f?)\b/g, '<span class="code-number">$1</span>'),
      }}
    />
  );
}

export default function CodeBlock() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorLine, setCursorLine] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (visibleLines >= CODE_LINES.length) return;

    const delay = CODE_LINES[visibleLines].type === "blank" ? 80 : 90;
    const t = setTimeout(() => {
      setVisibleLines((v) => v + 1);
      setCursorLine(visibleLines);
    }, delay);
    return () => clearTimeout(t);
  }, [started, visibleLines]);

  return (
    <div ref={containerRef} style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: "12px",
      overflow: "hidden",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "0.8rem",
      lineHeight: "1.7",
    }}>
      {/* Window chrome */}
      <div style={{
        padding: "0.75rem 1rem",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "rgba(255,255,255,0.02)",
      }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }}/>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }}/>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }}/>
        <span style={{ marginLeft: "auto", color: "var(--text-dim)", fontSize: "0.7rem" }}>main.cpp — shimera demo</span>
      </div>

      {/* Code */}
      <div style={{ padding: "1.25rem 1.5rem", minHeight: "420px" }}>
        {CODE_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "1.5rem", minHeight: "1.4em" }}>
            {/* Line number */}
            <span style={{ color: "var(--text-dim)", fontSize: "0.7rem", minWidth: "1.5rem", textAlign: "right", userSelect: "none" }}>
              {i + 1}
            </span>
            {/* Code */}
            <span style={{ flex: 1 }}>
              {renderLine(line)}
              {i === cursorLine && visibleLines < CODE_LINES.length && (
                <span style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1em",
                  background: "var(--accent)",
                  marginLeft: "1px",
                  verticalAlign: "text-bottom",
                  animation: "type-cursor 0.8s step-end infinite",
                }}/>
              )}
            </span>
          </div>
        ))}
        {/* Final cursor when done */}
        {visibleLines >= CODE_LINES.length && (
          <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.2em" }}>
            <span style={{ color: "var(--text-dim)", fontSize: "0.7rem", minWidth: "1.5rem", textAlign: "right" }}>
              {CODE_LINES.length + 1}
            </span>
            <span>
              <span style={{
                display: "inline-block",
                width: "2px",
                height: "1em",
                background: "var(--accent)",
                verticalAlign: "text-bottom",
                animation: "type-cursor 1s step-end infinite",
              }}/>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
