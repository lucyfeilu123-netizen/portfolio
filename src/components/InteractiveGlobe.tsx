"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface GlobeProps {
  size?: number;
  className?: string;
}

const MARKERS = [
  { lat: 37.78, lng: -122.42, label: "San Francisco" },
  { lat: 39.91, lng: 116.39, label: "Beijing" },
  { lat: 22.54, lng: 114.06, label: "Shenzhen" },
  { lat: 23.13, lng: 113.26, label: "Guangzhou" },
  { lat: 34.76, lng: 113.65, label: "Zhengzhou" },
  { lat: 35.68, lng: 139.69, label: "Tokyo" },
  { lat: 51.51, lng: -0.13, label: "London" },
  { lat: 1.35, lng: 103.82, label: "Singapore" },
  { lat: -33.87, lng: 151.21, label: "Sydney" },
  { lat: 19.43, lng: -99.13, label: "Mexico City" },
];

const CONNECTIONS: { from: [number, number]; to: [number, number] }[] = [
  { from: [37.78, -122.42], to: [22.54, 114.06] },  // SF -> Shenzhen
  { from: [37.78, -122.42], to: [39.91, 116.39] },  // SF -> Beijing
  { from: [37.78, -122.42], to: [35.68, 139.69] },  // SF -> Tokyo
  { from: [22.54, 114.06], to: [1.35, 103.82] },     // Shenzhen -> Singapore
  { from: [22.54, 114.06], to: [34.76, 113.65] },     // Shenzhen -> Zhengzhou
  { from: [51.51, -0.13], to: [37.78, -122.42] },     // London -> SF
  { from: [1.35, 103.82], to: [-33.87, 151.21] },     // Singapore -> Sydney
  { from: [37.78, -122.42], to: [19.43, -99.13] },    // SF -> Mexico City
  { from: [23.13, 113.26], to: [35.68, 139.69] },     // Guangzhou -> Tokyo
];

function latLngToXYZ(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

function rotateY(x: number, y: number, z: number, angle: number): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos + z * sin, y, -x * sin + z * cos];
}

function rotateX(x: number, y: number, z: number, angle: number): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x, y * cos - z * sin, y * sin + z * cos];
}

function project(x: number, y: number, z: number, cx: number, cy: number, fov: number): [number, number] {
  const scale = fov / (fov + z);
  return [x * scale + cx, y * scale + cy];
}

export default function InteractiveGlobe({ size = 400, className }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [responsiveSize, setResponsiveSize] = useState(size);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setResponsiveSize(Math.min(size, containerWidth - 20));
      } else {
        setResponsiveSize(Math.min(size, window.innerWidth - 40));
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [size]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotYRef = useRef(0.4);
  const rotXRef = useRef(0.3);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, startRotY: 0, startRotX: 0 });
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const dotsRef = useRef<[number, number, number][]>([]);

  useEffect(() => {
    const dots: [number, number, number][] = [];
    const numDots = 1000;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < numDots; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numDots);
      dots.push([
        Math.cos(theta) * Math.sin(phi),
        Math.cos(phi),
        Math.sin(theta) * Math.sin(phi),
      ]);
    }
    dotsRef.current = dots;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.38;
    const fov = 600;

    if (!dragRef.current.active) {
      rotYRef.current += 0.002;
    }

    timeRef.current += 0.015;
    const time = timeRef.current;
    const ry = rotYRef.current;
    const rx = rotXRef.current;

    ctx.clearRect(0, 0, w, h);

    // Outer glow — pink tint to match theme
    const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.5);
    glowGrad.addColorStop(0, "rgba(236, 72, 153, 0.04)");
    glowGrad.addColorStop(1, "rgba(236, 72, 153, 0)");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, w, h);

    // Globe outline
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(236, 72, 153, 0.1)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Dots
    for (const dot of dotsRef.current) {
      let [x, y, z] = [dot[0] * radius, dot[1] * radius, dot[2] * radius];
      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);
      if (z > 0) continue;

      const [sx, sy] = project(x, y, z, cx, cy, fov);
      const depthAlpha = Math.max(0.1, 1 - (z + radius) / (2 * radius));

      ctx.beginPath();
      ctx.arc(sx, sy, 1 + depthAlpha * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(236, 72, 153, ${(depthAlpha * 0.6).toFixed(2)})`;
      ctx.fill();
    }

    // Connections
    for (const conn of CONNECTIONS) {
      let [x1, y1, z1] = latLngToXYZ(conn.from[0], conn.from[1], radius);
      let [x2, y2, z2] = latLngToXYZ(conn.to[0], conn.to[1], radius);
      [x1, y1, z1] = rotateX(x1, y1, z1, rx);
      [x1, y1, z1] = rotateY(x1, y1, z1, ry);
      [x2, y2, z2] = rotateX(x2, y2, z2, rx);
      [x2, y2, z2] = rotateY(x2, y2, z2, ry);

      if (z1 > radius * 0.3 && z2 > radius * 0.3) continue;

      const [sx1, sy1] = project(x1, y1, z1, cx, cy, fov);
      const [sx2, sy2] = project(x2, y2, z2, cx, cy, fov);

      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const midZ = (z1 + z2) / 2;
      const midLen = Math.sqrt(midX * midX + midY * midY + midZ * midZ);
      const arcHeight = radius * 1.25;
      const [scx, scy] = project(
        (midX / midLen) * arcHeight,
        (midY / midLen) * arcHeight,
        (midZ / midLen) * arcHeight,
        cx, cy, fov
      );

      ctx.beginPath();
      ctx.moveTo(sx1, sy1);
      ctx.quadraticCurveTo(scx, scy, sx2, sy2);
      ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Traveling dot
      const t = (Math.sin(time * 1.2 + conn.from[0] * 0.1) + 1) / 2;
      const tx = (1 - t) * (1 - t) * sx1 + 2 * (1 - t) * t * scx + t * t * sx2;
      const ty = (1 - t) * (1 - t) * sy1 + 2 * (1 - t) * t * scy + t * t * sy2;
      ctx.beginPath();
      ctx.arc(tx, ty, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(6, 182, 212, 0.9)";
      ctx.fill();
    }

    // Markers
    for (const marker of MARKERS) {
      let [x, y, z] = latLngToXYZ(marker.lat, marker.lng, radius);
      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);
      if (z > radius * 0.1) continue;

      const [sx, sy] = project(x, y, z, cx, cy, fov);
      const pulse = Math.sin(time * 2 + marker.lat) * 0.5 + 0.5;

      ctx.beginPath();
      ctx.arc(sx, sy, 4 + pulse * 4, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(6, 182, 212, ${(0.2 + pulse * 0.15).toFixed(2)})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(6, 182, 212, 1)";
      ctx.fill();

      if (marker.label) {
        ctx.font = "10px system-ui, sans-serif";
        ctx.fillStyle = "rgba(6, 182, 212, 0.6)";
        ctx.fillText(marker.label, sx + 8, sy + 3);
      }
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      startRotY: rotYRef.current,
      startRotX: rotXRef.current,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    rotYRef.current = dragRef.current.startRotY + (e.clientX - dragRef.current.startX) * 0.005;
    rotXRef.current = Math.max(-1, Math.min(1, dragRef.current.startRotX + (e.clientY - dragRef.current.startY) * 0.005));
  }, []);

  const onPointerUp = useCallback(() => {
    dragRef.current.active = false;
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", maxWidth: size, display: "flex", justifyContent: "center" }}>
      <canvas
        ref={canvasRef}
        style={{ width: responsiveSize, height: responsiveSize, cursor: "grab", touchAction: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
    </div>
  );
}
