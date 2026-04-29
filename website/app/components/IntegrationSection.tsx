"use client";
import CodeBlock from "./CodeBlock";

const STEPS = [
  {
    step: "01",
    title: "Add the library",
    code: `# With xmake
xmake require shimera

# Or CMake FetchContent
FetchContent_Declare(shimera
  GIT_REPO https://github.com/your/shimera
  GIT_TAG  v0.8.0)`,
    lang: "bash",
  },
  {
    step: "02",
    title: "Create a context",
    code: `#include <shimera/shimera.hpp>

auto ctx = shm::Context::create({
  .width = 1280,
  .height = 720,
  .title  = "My App",
});`,
    lang: "cpp",
  },
  {
    step: "03",
    title: "Load & run shaders",
    code: `auto shader = ctx.shader()
  .vert("shaders/mesh.vert")
  .frag("shaders/pbr.frag")
  .build();

ctx.run([&](shm::Frame& f) {
  shader.bind()
    .set("u_time", f.elapsed());
  f.draw(mesh, shader);
});`,
    lang: "cpp",
  },
];

export default function IntegrationSection() {
  return (
    <section id="integration" style={{ padding: "5rem 0", background: "linear-gradient(180deg, transparent 0%, rgba(124,106,255,0.03) 50%, transparent 100%)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "3.5rem", textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(61,223,255,0.06)", border: "1px solid rgba(61,223,255,0.15)",
            borderRadius: "100px", padding: "0.25rem 0.75rem", marginBottom: "1rem",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", display: "inline-block" }}/>
            <span style={{ fontSize: "0.75rem", color: "var(--cyan)", fontFamily: "'JetBrains Mono', monospace" }}>
              zero friction
            </span>
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            From zero to shader in{" "}
            <span className="gradient-text">3 lines.</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "500px", margin: "0 auto" }}>
            Shimera's fluent API was designed so that adding a shader pipeline feels as natural as writing a function call.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
          {/* Live code animation */}
          <div>
            <div style={{
              fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "1rem",
              fontFamily: "'JetBrains Mono', monospace",
              display: "flex", alignItems: "center", gap: "0.5rem",
            }}>
              <span style={{ color: "var(--accent)" }}>▶</span>
              Live typing animation — real Shimera API
            </div>
            <CodeBlock/>
          </div>

          {/* Steps + features */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {STEPS.map(({ step, title, code, lang }) => (
              <div key={step} className="card" style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    color: "var(--accent)",
                    background: "rgba(124,106,255,0.1)",
                    border: "1px solid rgba(124,106,255,0.2)",
                    borderRadius: "6px",
                    padding: "0.2rem 0.5rem",
                    minWidth: "fit-content",
                    marginTop: "2px",
                  }}>{step}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.6rem" }}>{title}</div>
                    <pre style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.72rem",
                      lineHeight: 1.7,
                      color: "var(--text-muted)",
                      background: "rgba(0,0,0,0.3)",
                      borderRadius: "6px",
                      padding: "0.75rem",
                      overflow: "auto",
                      margin: 0,
                    }}>
                      {code}
                    </pre>
                  </div>
                </div>
              </div>
            ))}

            {/* Feature pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
              {["Hot reload", "SPIR-V support", "Vulkan-ready", "OpenGL 3.3+", "WSL2 compat", "Header-only mode"].map((f) => (
                <span key={f} style={{
                  fontSize: "0.72rem",
                  color: "var(--text-muted)",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "100px",
                  padding: "0.2rem 0.65rem",
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
