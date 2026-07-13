import { ImageResponse } from "next/og";
import { PROFILE } from "@/lib/data/profile";

export const runtime = "edge";
export const alt = "Vennam Jaya Chandra — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Auto-generated at request time from real profile data — not a fabricated
// photo. Uses the same dark/teal palette as the site's design tokens.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#12161d",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(45,181,150,0.25), transparent 45%), radial-gradient(circle at 85% 85%, rgba(45,181,150,0.15), transparent 50%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#2db596",
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            fontSize: 84,
            fontStyle: "italic",
            color: "#f5f1e8",
            marginBottom: 24,
          }}
        >
          {PROFILE.name}
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#9ca3af" }}>
          {`${PROFILE.roles[0]} · ${PROFILE.roles[2]}`}
        </div>
      </div>
    ),
    { ...size }
  );
}
