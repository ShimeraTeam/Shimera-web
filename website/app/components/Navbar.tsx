"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const DOCS_URL = "https://shimerateam.github.io/ShimeraDocs/";

const NAV_LINKS = [
  { label: "Features",    href: "#features",    external: false },
  { label: "Performance", href: "#performance", external: false },
  { label: "Integration", href: "#integration", external: false },
  { label: "Docs",        href: DOCS_URL,       external: true  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: "0 2rem",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.3s, backdrop-filter 0.3s, border-color 0.3s",
        background: scrolled ? "rgba(5,5,7,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      {/* Logo */}
      <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Image src="logo.png" alt="Shimera Logo" width={32} height={32} />
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.02em", color: "var(--text)" }}>
          Shimera
        </span>
      </a>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {NAV_LINKS.map(({ label, href, external }) => (
          <a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            style={{
              fontSize: "0.875rem",
              color: "var(--text-muted)",
              textDecoration: "none",
              transition: "color 0.2s",
              fontWeight: 400,
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >
            {label}
            {external && (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" style={{ opacity: 0.5 }}>
                <path d="M3.5 3a.5.5 0 0 0 0 1H7.3L2.1 9.1a.5.5 0 0 0 .7.7L8 4.7V8.5a.5.5 0 0 0 1 0V3a.5.5 0 0 0-.5-.5H3.5z"/>
              </svg>
            )}
          </a>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <a
          href="https://github.com/ShimeraTeam/Shimera"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
          style={{ padding: "0.45rem 1rem", fontSize: "0.8rem" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <a
          href={DOCS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ padding: "0.45rem 1rem", fontSize: "0.8rem" }}
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}
