import { ImageResponse } from "next/og";

export const alt = "Motionly Creative Studio, Your brand. Beautifully in motion.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", backgroundColor: "#17221D", color: "#F5F3EC", padding: "70px 92px" }}>
      <div style={{ fontSize: 35, letterSpacing: "0.08em", color: "#DCE8D0", marginBottom: 55 }}>MOTIONLY</div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 95, lineHeight: 0.99, letterSpacing: "-0.05em" }}><span>Your brand.</span><span>Beautifully in motion.</span></div>
      <div style={{ fontSize: 27, marginTop: 42, color: "#DCE8D0" }}>AI-assisted creative studio</div>
    </div>,
    size,
  );
}
