"use client";
export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "3rem 2rem",
      maxWidth: "1100px",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
          <polygon points="14,2 26,9 26,19 14,26 2,19 2,9" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>
          <polygon points="14,7 21,11 21,17 14,21 7,17 7,11" stroke="var(--cyan)" strokeWidth="1" fill="none" opacity="0.5"/>
          <circle cx="14" cy="14" r="2" fill="var(--accent)"/>
        </svg>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--text-muted)" }}>
          Shimera
        </span>
        <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginLeft: "0.5rem", fontFamily: "'JetBrains Mono', monospace" }}>
          v0.8.0 · MIT
        </span>
      </div>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        {["GitHub", "Docs", "Changelog", "Discord"].map((link) => (
          <a
            key={link}
            href="#"
            style={{ fontSize: "0.8rem", color: "var(--text-dim)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-dim)")}
          >
            {link}
          </a>
        ))}
      </div>

      <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
        © 2025 Shimera — Open Source C++ Graphics
      </div>
    </footer>
  );
}
