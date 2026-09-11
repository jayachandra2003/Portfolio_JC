"use client";

import { useEffect, useRef } from "react";
import WebGLFluidEnhanced from "webgl-fluid-enhanced";

export function FluidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fluidRef = useRef<WebGLFluidEnhanced | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if user prefers reduced motion or if WebGL is unavailable
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    try {
      const fluid = new WebGLFluidEnhanced(container);
      fluidRef.current = fluid;

      fluid.setConfig({
        simResolution: 128,
        dyeResolution: 512,
        densityDissipation: 4.2, // Faster, cleaner dissipation so background stays clear
        velocityDissipation: 2.0,
        pressure: 0.8,
        pressureIterations: 20,
        curl: 20, // Gentle, organic smoke curves
        splatRadius: 0.12, // Smaller, refined trail radius
        splatForce: 3500, // Softer drag force
        shading: true,
        colorful: true,
        colorUpdateSpeed: 8,
        colorPalette: [
          "#10b981", // Emerald
          "#14b8a6", // Teal
          "#06b6d4", // Cyan
          "#38bdf8", // Sky
          "#6366f1", // Indigo
        ],
        hover: true,
        transparent: true,
        backgroundColor: "#00000000",
        brightness: 0.45, // Decreased intensity/brightness
        bloom: true,
        bloomIterations: 3,
        bloomResolution: 256,
        bloomIntensity: 0.25, // Subtle, soft bloom
        bloomThreshold: 0.4,
        bloomSoftKnee: 0.7,
        sunrays: false,
      });

      fluid.start();

      // Trigger a subtle opening ambient splat
      setTimeout(() => {
        try {
          fluid.multipleSplats(1);
        } catch {}
      }, 300);

      // Listen on window so mouse movement over ANY UI element drives the fluid
      let lastX = 0;
      let lastY = 0;
      let lastTime = Date.now();

      function handlePointerMove(e: MouseEvent | TouchEvent) {
        if (!fluidRef.current) return;
        const now = Date.now();
        const dt = Math.max((now - lastTime) / 1000, 0.001);
        lastTime = now;

        let clientX = 0;
        let clientY = 0;

        if ("touches" in e) {
          const touch = e.touches[0];
          if (!touch) return;
          clientX = touch.clientX;
          clientY = touch.clientY;
        } else {
          clientX = e.clientX;
          clientY = e.clientY;
        }

        const pr = window.devicePixelRatio || 1;
        const pixelX = clientX * pr;
        const pixelY = clientY * pr;

        const dx = (clientX - lastX) * 6;
        const dy = (clientY - lastY) * 6;

        lastX = clientX;
        lastY = clientY;

        // Only trigger splat if there's notable movement
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          try {
            fluidRef.current.splatAtLocation(pixelX, pixelY, dx, dy);
          } catch {}
        }
      }

      window.addEventListener("mousemove", handlePointerMove, { passive: true });
      window.addEventListener("touchmove", handlePointerMove, { passive: true });

      return () => {
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("touchmove", handlePointerMove);
        try {
          fluid.stop();
        } catch {}
      };
    } catch (err) {
      console.warn("WebGL Fluid Simulation initialization skipped:", err);
    }
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen overflow-hidden"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -10,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <div
        ref={containerRef}
        className="h-full w-full opacity-60"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
