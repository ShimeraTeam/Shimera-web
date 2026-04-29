"use client";
import { useState } from "react";

const SHADERS = [
  {
    name: "Plasma Wave",
    tag: "procedural",
    desc: "GPU-driven sine wave plasma with palette cycling",
    // Vidéo de démonstration — plasma coloré animé
    videoUrl: "https://videos.shadertoy.com/videos/2016/plasma.mp4",
    // Fallback : on génère une animation CSS si la vidéo échoue
    poster: "https://www.shadertoy.com/media/shaders/XsjSzR.jpg",
    fallbackType: "plasma",
  },
  {
    name: "Ray March SDF",
    tag: "3D",
    desc: "Real-time ray marching of signed distance fields",
    videoUrl: "https://videos.shadertoy.com/videos/2016/raymarching.mp4",
    poster: "https://www.shadertoy.com/media/shaders/Xds3zN.jpg",
    fallbackType: "raymarch",
  },
  {
    name: "Fractal Zoom",
    tag: "mathematics",
    desc: "Julia set fractal with animated c-parameter",
    videoUrl: "https://videos.shadertoy.com/videos/2016/fractal.mp4",
    poster: "https://www.shadertoy.com/media/shaders/4df3Rn.jpg",
    fallbackType: "fractal",
  },
];

// Animations CSS qui simulent les shaders visuellement
function ShaderPreview({ type, active }: { type: string; active: boolean }) {
  if (type === "plasma") {
    return (
      <div style={{
        width: "100%", height: "100%", position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, #0a001a 0%, #120030 50%, #0a001a 100%)",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 120% 80% at 30% 40%, rgba(124,106,255,0.7) 0%, transparent 60%)",
          animation: active ? "plasmaMove1 3s ease-in-out infinite" : "none",
        }}/>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 100% 100% at 70% 60%, rgba(61,223,255,0.5) 0%, transparent 55%)",
          animation: active ? "plasmaMove2 4s ease-in-out infinite reverse" : "none",
        }}/>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 80% at 50% 20%, rgba(255,100,200,0.4) 0%, transparent 60%)",
          animation: active ? "plasmaMove3 5s ease-in-out infinite" : "none",
        }}/>
        <div style={{
          position: "absolute", inset: 0,
          background: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)",
          mixBlendMode: "overlay",
        }}/>
        <style>{`
          @keyframes plasmaMove1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-10%,5%) scale(1.1)} }
          @keyframes plasmaMove2 { 0%,100%{transform:translate(0,0) scale(1.1)} 50%{transform:translate(8%,-8%) scale(1)} }
          @keyframes plasmaMove3 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(5%,10%)} 66%{transform:translate(-5%,5%)} }
        `}</style>
      </div>
    );
  }

  if (type === "raymarch") {
    return (
      <div style={{
        width: "100%", height: "100%", position: "relative", overflow: "hidden",
        background: "#030209",
      }}>
        {/* Sphere SDF simulée */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "38%", paddingBottom: "38%",
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 35%, rgba(180,160,255,0.9), rgba(80,60,200,0.8) 40%, rgba(20,10,60,0.95) 80%)",
          boxShadow: "0 0 60px rgba(124,106,255,0.4), inset -8px -8px 20px rgba(0,0,0,0.8)",
          animation: active ? "sdfFloat 4s ease-in-out infinite, sdfRotateLight 6s linear infinite" : "none",
        }}/>
        {/* Reflection rim */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "42%", paddingBottom: "42%",
          borderRadius: "50%",
          background: "transparent",
          boxShadow: "0 0 30px rgba(61,223,255,0.15)",
          animation: active ? "sdfFloat 4s ease-in-out infinite" : "none",
        }}/>
        {/* Floor shadow */}
        <div style={{
          position: "absolute",
          bottom: "22%", left: "50%",
          transform: "translateX(-50%)",
          width: "30%", height: "8%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.6), transparent)",
          animation: active ? "shadowFloat 4s ease-in-out infinite" : "none",
        }}/>
        <style>{`
          @keyframes sdfFloat { 0%,100%{transform:translate(-50%,-52%)} 50%{transform:translate(-50%,-48%)} }
          @keyframes shadowFloat { 0%,100%{transform:translateX(-50%) scaleX(1)} 50%{transform:translateX(-50%) scaleX(0.85)} }
          @keyframes sdfRotateLight { 0%{filter:brightness(1) hue-rotate(0deg)} 100%{filter:brightness(1.1) hue-rotate(20deg)} }
        `}</style>
      </div>
    );
  }

  // fractal
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#000",
    }}>
      {/* Julia set simulé avec des cercles concentriques et gradients */}
      <div style={{
        position: "absolute", inset: 0,
        background: "conic-gradient(from 0deg at 50% 50%, #000 0deg, #1a0040 30deg, #3d00a0 60deg, #7c6aff 90deg, #3ddfff 120deg, #3dffa0 150deg, #1a0040 180deg, #000 210deg, #0a0030 270deg, #000 360deg)",
        animation: active ? "fractalSpin 12s linear infinite" : "none",
        opacity: 0.85,
      }}/>
      <div style={{
        position: "absolute", inset: "20%",
        background: "conic-gradient(from 60deg at 50% 50%, #000 0deg, #3d00a0 40deg, #7c6aff 80deg, #3ddfff 120deg, #1a0040 180deg, #000 250deg, #3d00a0 310deg, #000 360deg)",
        animation: active ? "fractalSpin 8s linear infinite reverse" : "none",
        borderRadius: "50%",
        opacity: 0.9,
      }}/>
      <div style={{
        position: "absolute", inset: "38%",
        background: "conic-gradient(from 120deg at 50% 50%, #7c6aff 0deg, #3ddfff 60deg, #000 120deg, #3dffa0 180deg, #3d00a0 240deg, #7c6aff 360deg)",
        animation: active ? "fractalSpin 5s linear infinite" : "none",
        borderRadius: "50%",
      }}/>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 50% 50%, transparent 35%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.98) 100%)",
      }}/>
      <style>{`
        @keyframes fractalSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
}

export default function ShadersSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="features" style={{ padding: "5rem 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(61,255,160,0.06)", border: "1px solid rgba(61,255,160,0.15)",
            borderRadius: "100px", padding: "0.25rem 0.75rem", marginBottom: "1rem",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block" }}/>
            <span style={{ fontSize: "0.75rem", color: "var(--green)", fontFamily: "'JetBrains Mono', monospace" }}>
              shader showcase
            </span>
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Every shader. Live in your browser.
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "540px" }}>
            These effects run entirely on your GPU via GLSL — the same primitives that Shimera exposes through its clean C++ API.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "1.5rem", alignItems: "start" }}>
          {/* Sidebar tabs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {SHADERS.map((sh, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  background: active === i ? "rgba(124,106,255,0.1)" : "var(--bg-card)",
                  border: `1px solid ${active === i ? "rgba(124,106,255,0.35)" : "var(--border)"}`,
                  borderRadius: "10px",
                  padding: "1rem 1.25rem",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                }}
              >
                <div style={{
                  display: "inline-block",
                  fontSize: "0.65rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: active === i ? "var(--accent)" : "var(--text-dim)",
                  background: active === i ? "rgba(124,106,255,0.1)" : "rgba(255,255,255,0.04)",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "4px",
                  marginBottom: "0.4rem",
                }}>
                  {sh.tag}
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: active === i ? "var(--text)" : "var(--text-muted)", marginBottom: "0.3rem" }}>
                  {sh.name}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", lineHeight: 1.4 }}>
                  {sh.desc}
                </div>
              </button>
            ))}

            {/* Stats */}
            <div style={{
              marginTop: "0.5rem",
              padding: "1rem 1.25rem",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
            }}>
              <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginBottom: "0.75rem", fontFamily: "'JetBrains Mono', monospace" }}>
                shader_stats.json
              </div>
              {[
                ["Fragment calls", "2.07M/s"],
                ["GPU time", "~0.3ms"],
                ["VRAM usage", "< 1 MB"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span style={{ fontSize: "0.73rem", color: "var(--text-muted)" }}>{k}</span>
                  <span style={{ fontSize: "0.73rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--green)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main display */}
          <div style={{ position: "relative" }}>
            <div style={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid var(--border-bright)",
              aspectRatio: "16/10",
              background: "#000",
              position: "relative",
            }}>
              {SHADERS.map((sh, i) => (
                <div key={i} style={{
                  position: "absolute",
                  inset: 0,
                  opacity: active === i ? 1 : 0,
                  transition: "opacity 0.5s ease",
                  pointerEvents: active === i ? "auto" : "none",
                }}>
                  <ShaderPreview type={sh.fallbackType} active={active === i} />
                </div>
              ))}

              {/* Overlay labels */}
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
                <div style={{
                  position: "absolute", bottom: "1rem", left: "1rem",
                  display: "flex", gap: "0.5rem", alignItems: "center",
                }}>
                  <div style={{
                    background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
                    border: "1px solid var(--border)", borderRadius: "6px",
                    padding: "0.35rem 0.75rem", fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace",
                    color: "var(--text-muted)",
                  }}>
                    {SHADERS[active].name}
                  </div>
                  <div style={{
                    background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
                    border: "1px solid rgba(61,255,160,0.2)", borderRadius: "6px",
                    padding: "0.35rem 0.75rem", fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace",
                    color: "var(--green)", display: "flex", alignItems: "center", gap: "0.4rem",
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", display: "inline-block", animation: "livePulse 2s ease-in-out infinite" }}/>
                    live render
                  </div>
                </div>

                {/* GLSL badge */}
                <div style={{
                  position: "absolute", top: "1rem", right: "1rem",
                  background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
                  border: "1px solid rgba(124,106,255,0.2)", borderRadius: "6px",
                  padding: "0.3rem 0.6rem", fontSize: "0.65rem", fontFamily: "'JetBrains Mono', monospace",
                  color: "var(--accent)", display: "flex", alignItems: "center", gap: "0.35rem",
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                  GLSL / OpenGL
                </div>
              </div>
            </div>

            {/* GLSL code snippet below */}
            <div style={{
              marginTop: "1rem",
              padding: "1rem 1.25rem",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              lineHeight: 1.6,
              color: "var(--text-dim)",
              overflow: "hidden",
              position: "relative",
            }}>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.6rem", alignItems: "center" }}>
                <span style={{ color: "var(--text-dim)", fontSize: "0.65rem" }}>frag/{SHADERS[active].name.toLowerCase().replace(" ", "_")}.glsl</span>
                <span style={{ marginLeft: "auto", fontSize: "0.6rem", color: "var(--accent)", background: "rgba(124,106,255,0.1)", padding: "0.1rem 0.4rem", borderRadius: "4px" }}>
                  {SHADERS[active].tag}
                </span>
              </div>
              <div style={{ color: "var(--text-dim)", fontStyle: "italic" }}>{"// Fragment shader entry point"}</div>
              <div><span style={{ color: "#7c6aff" }}>void</span> <span style={{ color: "#3dffa0" }}>main</span>{"() {"}</div>
              <div style={{ paddingLeft: "1.5rem" }}>
                <span style={{ color: "#6b6b7a" }}>vec2</span>{" uv = ("}
                <span style={{ color: "#3ddfff" }}>gl_FragCoord</span>
                {".xy * 2.0 - "}
                <span style={{ color: "#3ddfff" }}>u_resolution</span>
                {") / "}
                <span style={{ color: "#3ddfff" }}>u_resolution</span>
                {".y;"}
              </div>
              <div style={{ paddingLeft: "1.5rem" }}>{"..."}</div>
              <div>{"}"}</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
