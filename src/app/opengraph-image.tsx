import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/**
 * Generated at build time (no external data), so it's free — no image file
 * to keep in sync. To change what it shows, edit the JSX below; to swap in
 * a designed asset instead, delete this file and drop an opengraph-image.png
 * next to it (Next.js picks either convention up automatically).
 */
export const alt = siteConfig.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#05050b",
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(139,92,246,0.4), transparent 55%), radial-gradient(circle at 88% 82%, rgba(59,130,246,0.35), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 34, fontWeight: 700 }}>
          <span style={{ color: "#c4b5fd" }}>Celi</span>
          <span style={{ color: "#f7f7fb", fontWeight: 400 }}>Digital</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 980 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 60,
              fontWeight: 600,
              lineHeight: 1.15,
              color: "#f7f7fb",
            }}
          >
            Mais pacientes para o seu consultório com um site profissional e{" "}
            <span style={{ color: "#c4b5fd", marginLeft: 16 }}>tráfego pago.</span>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#9a9ab0" }}>
            {siteConfig.tagline}
          </div>
        </div>
      </div>
    ),
    size
  );
}
