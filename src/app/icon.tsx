import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05050b",
          borderRadius: 7,
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#c4b5fd",
            fontFamily: "sans-serif",
          }}
        >
          C
        </span>
      </div>
    ),
    size
  );
}
