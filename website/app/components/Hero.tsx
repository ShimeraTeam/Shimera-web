"use client";

export default function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      {/* Animated background - CSS only, no WebGL */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {/* Ambient orbs */}
        <div style={{
          position: "absolute",
          top: "20%", left: "60%",
          width: "600px", height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,106,255,0.12) 0%, transparent 70%)",
          animation: "heroOrb1 8s ease-in-out infinite",
          pointerEvents: "none",
        }}/>
        <div style={{
          position: "absolute",
          top: "50%", left: "30%",
          width: "400px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(61,223,255,0.07) 0%, transparent 70%)",
          animation: "heroOrb2 11s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}/>
        <div style={{
          position: "absolute",
          top: "10%", left: "10%",
          width: "300px", height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(61,255,160,0.05) 0%, transparent 70%)",
          animation: "heroOrb3 14s ease-in-out infinite",
          pointerEvents: "none",
        }}/>
      </div>

      {/* Radial vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, var(--bg) 85%)",
        pointerEvents: "none",
      }}/>

      {/* Content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "6rem 2rem 3rem", position: "relative", zIndex: 2, width: "100%" }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-bright)",
          borderRadius: "100px", padding: "0.3rem 0.85rem", marginBottom: "2rem",
          animation: "fadeUp 0.5s ease forwards",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }}/>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
            v0.8.0 — open source · C++17 · MIT license
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          marginBottom: "1.5rem",
          animation: "fadeUp 0.6s 0.1s ease both",
          maxWidth: "820px",
        }}>
          The modern GLSL
          <br/>
          <span className="gradient-text">shader library</span> for C++.
        </h1>

        <p style={{
          fontSize: "1.1rem",
          color: "var(--text-muted)",
          maxWidth: "540px",
          lineHeight: 1.7,
          marginBottom: "2.5rem",
          animation: "fadeUp 0.6s 0.2s ease both",
        }}>
          Shimera wraps OpenGL and GLSL in a clean, fluent C++ API. Load shaders, bind uniforms, and run your render loop — without ever writing boilerplate again.
        </p>

        {/* CTA row */}
        <div style={{
          display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap",
          animation: "fadeUp 0.6s 0.3s ease both",
          marginBottom: "3.5rem",
        }}>
          <a href="#integration" className="btn-primary">
            Get Started
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0l8 8-8 8-1.4-1.4 5.6-5.6H0V7h12.2L6.6 1.4z"/>
            </svg>
          </a>
          <a href="https://github.com" className="btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
          <a href="#features" className="btn-secondary">
            See shaders live →
          </a>
        </div>

        {/* Quick install */}
        <div style={{
          animation: "fadeUp 0.6s 0.4s ease both",
          display: "inline-flex",
          alignItems: "center",
          gap: "1rem",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          padding: "0.75rem 1.25rem",
        }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text-dim)", fontFamily: "'JetBrains Mono', monospace" }}>
            quick install
          </span>
          <div style={{ width: 1, height: 20, background: "var(--border)" }}/>
          <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <span style={{ color: "var(--text-dim)" }}>$</span>{" "}
            <span style={{ color: "var(--green)" }}>xmake</span>{" "}
            <span style={{ color: "var(--text-muted)" }}>require</span>{" "}
            <span style={{ color: "var(--accent)" }}>shimera</span>
          </code>
          <button
            onClick={() => navigator.clipboard?.writeText("xmake require shimera")}
            style={{
              background: "none", border: "none", cursor: "pointer", color: "var(--text-dim)",
              padding: "0.2rem", borderRadius: "4px", display: "flex", alignItems: "center",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-dim)")}
            title="Copy"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4 4v8h8V4H4zm-1-1h10v10H3V3zm-2 2H0V0h11v2H2v13H1V5z"/>
            </svg>
          </button>
        </div>

        {/* Mini stats row */}
        <div style={{
          display: "flex", gap: "2.5rem", marginTop: "3.5rem", flexWrap: "wrap",
          animation: "fadeUp 0.6s 0.5s ease both",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border)",
        }}>
          {[
            { v: "1.2k", l: "GitHub Stars" },
            { v: "420 FPS", l: "Peak GPU throughput" },
            { v: "C++17", l: "Modern standard" },
            { v: "MIT", l: "Open source license" },
          ].map(({ v, l }) => (
            <div key={l}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.25rem", fontWeight: 700 }}>{v}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "0.15rem" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes heroOrb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,30px)} }
        @keyframes heroOrb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-40px)} }
        @keyframes heroOrb3 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(20px,20px)} 66%{transform:translate(-20px,10px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </section>
  );
}
