import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shimera - OpenGL/GLSL Shader Library for C++",
  description: "A modern, open-source C++ graphics library wrapping OpenGL and GLSL. Integrate shaders in minutes, not hours.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
