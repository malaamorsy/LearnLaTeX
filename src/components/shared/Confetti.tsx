import { useEffect, useRef } from "react";
import styles from "./Confetti.module.css";

const COLORS = ["#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6", "#ec4899"];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 120 }, () => ({
      x: randomBetween(0, canvas.width),
      y: randomBetween(-canvas.height, 0),
      w: randomBetween(6, 14),
      h: randomBetween(10, 20),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: randomBetween(-2, 2),
      vy: randomBetween(3, 7),
      angle: randomBetween(0, Math.PI * 2),
      va: randomBetween(-0.1, 0.1),
    }));

    let alive = true;
    let frame = 0;

    function draw() {
      if (!alive || !ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.va;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      frame++;
      if (frame < 120) requestAnimationFrame(draw);
    }

    draw();
    return () => { alive = false; };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
