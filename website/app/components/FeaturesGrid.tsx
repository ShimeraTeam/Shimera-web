"use client";
export default function FeaturesGrid() {
  const features = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
          <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>
      ),
      title: "Fluent C++ API",
      desc: "Method chaining inspired by modern Rust and Swift APIs. Build shader pipelines with zero boilerplate.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: "Hot Reload",
      desc: "Shaders reload in-place during development. Save your GLSL file, see changes instantly on screen.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
      title: "GPU Profiling",
      desc: "Built-in GL_TIME_ELAPSED queries expose per-pass GPU timing without external tools.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b8a" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: "Memory Safe",
      desc: "RAII everywhere. GPU resources are freed automatically when objects go out of scope.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffb347" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
      title: "SPIR-V Ready",
      desc: "Precompile shaders to SPIR-V for Vulkan compatibility or faster startup in production.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        </svg>
      ),
      title: "SFML & Raylib",
      desc: "Drop Shimera into existing SFML or Raylib projects without touching your windowing code.",
    },
  ];

  return (
    <section style={{ padding: "3rem 0 5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "var(--border)",
          borderRadius: "12px",
          overflow: "hidden",
        }}>
          {features.map((f, i) => (
            <div
              key={i}
              className="card"
              style={{
                borderRadius: 0,
                border: "none",
                padding: "1.75rem",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg-card)")}
            >
              <div style={{ marginBottom: "1rem" }}>{f.icon}</div>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem" }}>{f.title}</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
