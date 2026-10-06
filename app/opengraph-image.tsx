import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background: "radial-gradient(circle at 75% 40%, #1c2a38 0%, #09090a 60%)",
        color: "#ecebe6",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 4, color: "#8b8b90" }}>
        <span>{site.name.toUpperCase()}</span>
        <span>PORTFOLIO — {site.year}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.9 }}>
        <span style={{ fontSize: 132, fontWeight: 900, letterSpacing: -4 }}>GAME DEVELOPER</span>
        <span style={{ fontSize: 132, fontWeight: 900, letterSpacing: -4, color: "#b4b8bf" }}>
          <span style={{ color: "#9fd4ff", marginRight: 24 }}>+</span>AI ENGINEER
        </span>
      </div>
      <div style={{ fontSize: 26, color: "#ecebe6", opacity: 0.75, maxWidth: 900 }}>{site.tagline}</div>
    </div>,
    size,
  );
}
