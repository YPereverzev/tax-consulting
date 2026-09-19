import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Yuri Dmitriev — Buchhalter und Steuerspezialist in Deutschland";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4EFE6",
          color: "#1C1915",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontSize: 22,
            color: "#B45A32",
          }}
        >
          Deutschland · private Praxis
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, lineHeight: 0.95 }}>Yuri Dmitriev</div>
          <div style={{ marginTop: 24, fontSize: 28, color: "#5C564C", maxWidth: 820 }}>
            Buchhaltung und Steuern für GmbH, UG und Teams von 5–50.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
