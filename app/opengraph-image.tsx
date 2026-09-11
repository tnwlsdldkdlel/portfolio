import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Frontend Engineer — Publishing & Web Performance";

// 한글 글리프를 싣지 않기 위해 OG 그래픽은 라틴·숫자만으로 구성한다.
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
          padding: "72px 80px",
          background: "#f0f3ef",
          color: "#161a17",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#1c7a51",
            }}
          />
          <div style={{ fontSize: 24, letterSpacing: 4, color: "#57635a" }}>
            FRONTEND · PUBLISHING · WEB PERFORMANCE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 92, lineHeight: 1, letterSpacing: -3 }}>
            Measure first,
          </div>
          <div
            style={{
              fontSize: 92,
              lineHeight: 1,
              letterSpacing: -3,
              color: "#1c7a51",
            }}
          >
            then build.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 56,
            borderTop: "1px solid rgba(22,26,23,.2)",
            paddingTop: 28,
          }}
        >
          {[
            ["-92%", "PAGE WEIGHT"],
            ["0.000", "CLS"],
            ["-81%", "WEBFONT"],
            ["100", "LIGHTHOUSE"],
          ].map(([value, label]) => (
            <div
              key={label}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              <div style={{ fontSize: 48, letterSpacing: -2 }}>{value}</div>
              <div style={{ fontSize: 20, letterSpacing: 3, color: "#8b958d" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
