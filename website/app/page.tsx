"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturesGrid from "./components/FeaturesGrid";
import ShadersSection from "./components/ShadersSection";
import PerfSection from "./components/PerfSection";
import IntegrationSection from "./components/IntegrationSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar/>
      <main>
        <Hero/>
        <FeaturesGrid/>
        <ShadersSection/>
        <PerfSection/>
        <IntegrationSection/>

        {/* CTA section */}
        <section style={{ padding: "5rem 2rem", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div style={{
              background: "rgba(124,106,255,0.06)",
              border: "1px solid rgba(124,106,255,0.15)",
              borderRadius: "16px",
              padding: "3rem",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Decorative glow */}
              <div style={{
                position: "absolute",
                top: "-40px", left: "50%",
                transform: "translateX(-50%)",
                width: "200px", height: "200px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(124,106,255,0.15) 0%, transparent 70%)",
                pointerEvents: "none",
              }}/>
              <h2 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "2rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
                position: "relative",
              }}>
                Start building shaders today.
              </h2>
              <p style={{
                color: "var(--text-muted)",
                marginBottom: "2rem",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                position: "relative",
              }}>
                Shimera is free and open source. No licenses, no telemetry, no hidden costs. Just a clean API for OpenGL/GLSL.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", position: "relative", flexWrap: "wrap" }}>
                <a href="https://github.com" className="btn-primary">Star on GitHub</a>
                <a href="#integration" className="btn-secondary">Read the Docs</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
}
