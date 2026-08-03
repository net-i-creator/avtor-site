"use client";

import { useEffect, useRef } from "react";

interface WaveProps {
  className?: string;
  bars?: number;
  height?: number;
  animated?: boolean;
}

export function Wave({
  className = "",
  bars = 48,
  height = 120,
  animated = true,
}: WaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const barWidth = width / bars;
      const gap = Math.max(2, barWidth * 0.35);
      const bw = barWidth - gap;

      for (let i = 0; i < bars; i++) {
        const phase = i * 0.28;
        const wave1 = Math.sin(t * 0.035 + phase) * 0.5 + 0.5;
        const wave2 = Math.sin(t * 0.02 + phase * 1.4) * 0.5 + 0.5;
        const amp = 0.25 + wave1 * 0.45 + wave2 * 0.3;
        const barH = Math.max(8, height * amp * 0.85);
        const x = i * barWidth + gap / 2;
        const y = (height - barH) / 2;

        const gradient = ctx.createLinearGradient(x, y, x, y + barH);
        gradient.addColorStop(0, "rgba(255, 90, 31, 0.15)");
        gradient.addColorStop(0.5, "rgba(255, 90, 31, 0.9)");
        gradient.addColorStop(1, "rgba(255, 61, 0, 0.2)");

        ctx.fillStyle = gradient;
        const radius = Math.min(bw / 2, 6);
        roundRect(ctx, x, y, bw, barH, radius);
        ctx.fill();
      }

      if (animated) {
        t += 1;
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [bars, height, animated]);

  return (
    <div className={`pointer-events-none w-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
