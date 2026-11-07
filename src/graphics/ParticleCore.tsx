import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { useReducedMotion } from 'motion/react';
import { mulberry32 } from '../lib/prng';

/*
 * The hero sculpture: a 3D particle system drawn on a 2D canvas (no WebGL), so it
 * is light enough for phones. Particles morph between three formations:
 *   core → the Hadasoft mark → two interlocked rings (BizWhats × ACIP).
 * It runs only while visible, scales its particle count to the device, caps the
 * pixel ratio, and renders a single still frame for reduced-motion users.
 */

type Vec3 = [number, number, number];
type RGB = [number, number, number];

export type ShapeKey = 'core' | 'mark' | 'link';
const SHAPES: ShapeKey[] = ['core', 'mark', 'link'];

const TAU = Math.PI * 2;
const HOLD = 3.4;
const MORPH = 2.1;
const STAGGER = 0.6;
const STEP = HOLD + MORPH;

const IRIS: RGB[] = [
  [92, 225, 230],
  [140, 123, 255],
  [255, 122, 182],
  [255, 181, 71],
];
const AQUA: RGB = [65, 240, 210];
const CORAL: RGB = [255, 122, 89];
const PEARL: RGB = [232, 234, 255];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const mixRGB = (a: RGB, b: RGB, t: number): RGB => [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)];
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function iris(t: number): RGB {
  const x = clamp01(t) * (IRIS.length - 1);
  const i = Math.min(Math.floor(x), IRIS.length - 2);
  return mixRGB(IRIS[i], IRIS[i + 1], x - i);
}

interface Field {
  n: number;
  pos: Record<ShapeKey, Vec3[]>;
  col: Record<ShapeKey, RGB[]>;
  jitter: Vec3[];
  delay: number[];
  size: number[];
}

type Region =
  | { kind: 'rect'; x0: number; x1: number; y0: number; y1: number; w: number }
  | { kind: 'ring'; cx: number; cy: number; r0: number; r1: number; w: number };

// The logo mark in its own 28×28 drawing space (matches components/ui/Logo.tsx).
const MARK: Region[] = [
  { kind: 'rect', x0: 3.5, x1: 8.1, y0: 3, y1: 25, w: 101 },
  { kind: 'rect', x0: 19.9, x1: 24.5, y0: 3, y1: 25, w: 101 },
  { kind: 'rect', x0: 8.1, x1: 10.8, y0: 12.7, y1: 15.3, w: 8 },
  { kind: 'rect', x0: 17.2, x1: 19.9, y0: 12.7, y1: 15.3, w: 8 },
  { kind: 'ring', cx: 14, cy: 14, r0: 2.0, r1: 4.6, w: 56 },
];
const MARK_TOTAL = MARK.reduce((s, r) => s + r.w, 0);

function buildField(n: number): Field {
  const rand = mulberry32(20261107);
  const pos: Field['pos'] = { core: [], mark: [], link: [] };
  const col: Field['col'] = { core: [], mark: [], link: [] };
  const jitter: Vec3[] = [];
  const delay: number[] = [];
  const size: number[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < n; i++) {
    // Core: Fibonacci sphere with a little radial breathing room.
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = golden * i;
    const rr = 0.95 + rand() * 0.1;
    const cx = Math.cos(th) * r;
    pos.core.push([cx * rr, y * rr, Math.sin(th) * r * rr]);
    col.core.push(iris((cx + y * 0.75 + 1.75) / 3.5));

    // Mark: area-weighted samples inside the logo shapes, slightly extruded.
    let u = rand() * MARK_TOTAL;
    let region = MARK[0];
    for (const m of MARK) {
      if (u < m.w) {
        region = m;
        break;
      }
      u -= m.w;
    }
    let px: number;
    let py: number;
    if (region.kind === 'rect') {
      px = region.x0 + rand() * (region.x1 - region.x0);
      py = region.y0 + rand() * (region.y1 - region.y0);
      col.mark.push(mixRGB(PEARL, iris(py / 28), 0.28 + rand() * 0.2));
    } else {
      const a = rand() * TAU;
      const rad = Math.sqrt(region.r0 * region.r0 + rand() * (region.r1 * region.r1 - region.r0 * region.r0));
      px = region.cx + Math.cos(a) * rad;
      py = region.cy + Math.sin(a) * rad;
      col.mark.push(iris(a / TAU));
    }
    pos.mark.push([((px - 14) / 14) * 0.95, (-(py - 14) / 14) * 0.95, (rand() - 0.5) * 0.24]);

    // Link: two interlocked tori. Ring A (aqua, BizWhats) in XY, ring B (coral, ACIP) in XZ.
    const ringA = i % 2 === 0;
    const uu = rand() * TAU;
    const vv = rand() * TAU;
    const tube = 0.085 * Math.sqrt(rand());
    const R = 0.6 + tube * Math.cos(vv);
    pos.link.push(
      ringA
        ? [-0.36 + R * Math.cos(uu), R * Math.sin(uu), tube * Math.sin(vv)]
        : [0.36 + R * Math.cos(uu), tube * Math.sin(vv), R * Math.sin(uu)],
    );
    col.link.push(mixRGB(ringA ? AQUA : CORAL, PEARL, rand() * 0.28));

    // Per-particle personality.
    const ja = rand() * TAU;
    const jb = Math.acos(2 * rand() - 1);
    const jm = 0.35 + rand() * 0.55;
    jitter.push([Math.sin(jb) * Math.cos(ja) * jm, Math.sin(jb) * Math.sin(ja) * jm, Math.cos(jb) * jm]);
    delay.push(rand() * STAGGER);
    size.push(0.6 + rand() * 1.0);
  }
  return { n, pos, col, jitter, delay, size };
}

function particleCount() {
  const w = window.innerWidth;
  const cores = navigator.hardwareConcurrency || 4;
  let n = w < 600 ? 760 : w < 1100 ? 1200 : 2000;
  if (cores <= 4) n = Math.min(n, 900);
  return n;
}

interface ParticleCoreProps {
  onShapeChange?: (shape: ShapeKey) => void;
  sx?: SxProps<Theme>;
}

export function ParticleCore({ onShapeChange, sx }: ParticleCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const onShapeRef = useRef(onShapeChange);
  useEffect(() => {
    onShapeRef.current = onShapeChange;
  }, [onShapeChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    const field = buildField(particleCount());
    const pointer = { x: 0, y: 0, active: false, tx: 0, ty: 0 };
    let tiltX = 0;
    let tiltY = 0;
    let w = 0;
    let h = 0;
    let clock = 0.6;
    let last = performance.now();
    let raf = 0;
    let visible = true;
    let shownShape = -1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, rect.width < 600 ? 1.5 : 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    };

    function draw(dt: number) {
      clock += dt;
      const t = clock;
      const step = Math.floor(t / STEP);
      const local = t - step * STEP;
      const from = SHAPES[step % SHAPES.length];
      const to = SHAPES[(step + 1) % SHAPES.length];
      const morphing = local > HOLD;
      const p = morphing ? (local - HOLD) / MORPH : 0;

      const label = morphing && p > 0.5 ? (step + 1) % SHAPES.length : step % SHAPES.length;
      if (label !== shownShape) {
        shownShape = label;
        onShapeRef.current?.(SHAPES[label]);
      }

      // Camera: gentle sway plus pointer tilt (eased).
      tiltX += (pointer.tx - tiltX) * 0.05;
      tiltY += (pointer.ty - tiltY) * 0.05;
      const yaw = Math.sin(t * 0.32) * 0.55 + tiltX;
      const pitch = 0.16 + Math.sin(t * 0.21) * 0.1 + tiltY;
      const cyw = Math.cos(yaw);
      const syw = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const spin = t * 0.42; // the core spins on its own axis
      const cs = Math.cos(spin);
      const ss = Math.sin(spin);

      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) * 0.38;
      const D = 3.4;

      // Inner glow behind the sculpture.
      ctx.globalCompositeOperation = 'source-over';
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 1.25);
      glow.addColorStop(0, 'rgba(140,123,255,0.30)');
      glow.addColorStop(0.45, 'rgba(92,225,230,0.09)');
      glow.addColorStop(1, 'rgba(7,10,29,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      const repel = 95;
      const small = w < 600;

      for (let i = 0; i < field.n; i++) {
        let a = field.pos[from][i];
        let b = field.pos[to][i];
        if (from === 'core') a = [a[0] * cs - a[2] * ss, a[1], a[0] * ss + a[2] * cs];
        if (to === 'core') b = [b[0] * cs - b[2] * ss, b[1], b[0] * ss + b[2] * cs];

        const e = morphing ? easeInOut(clamp01((p * MORPH - field.delay[i]) / (MORPH - STAGGER))) : 0;
        const swirl = Math.sin(e * Math.PI) * 0.42;
        const j = field.jitter[i];
        const x = mix(a[0], b[0], e) + j[0] * swirl;
        const y = mix(a[1], b[1], e) + j[1] * swirl;
        const z = mix(a[2], b[2], e) + j[2] * swirl;

        // Rotate (yaw, then pitch) and project.
        const x1 = x * cyw - z * syw;
        const z1 = x * syw + z * cyw;
        const y2 = y * cp - z1 * sp;
        const z2 = y * sp + z1 * cp;
        const persp = D / (D - z2);
        let sx = cx + x1 * scale * persp;
        let sy = cy - y2 * scale * persp;

        if (pointer.active) {
          const dx = sx - pointer.x;
          const dy = sy - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < repel * repel && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / repel) * 26;
            sx += (dx / d) * f;
            sy += (dy / d) * f;
          }
        }

        const depth = clamp01((z2 + 1.25) / 2.5);
        const c = mixRGB(field.col[from][i], field.col[to][i], e);
        const radius = (0.75 + field.size[i] * 0.95) * persp * (small ? 0.85 : 1);
        const alpha = 0.3 + depth * 0.7;

        ctx.fillStyle = `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, TAU);
        ctx.fill();

        if (depth > 0.62 && field.size[i] > 1.15) {
          ctx.fillStyle = `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},0.09)`;
          ctx.beginPath();
          ctx.arc(sx, sy, radius * 3.6, 0, TAU);
          ctx.fill();
        }
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const start = () => {
      if (raf || reduce) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
      pointer.tx = ((pointer.x / r.width) * 2 - 1) * 0.45;
      pointer.ty = ((pointer.y / r.height) * 2 - 1) * 0.3;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.tx = 0;
      pointer.ty = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { rootMargin: '80px' },
    );
    io.observe(canvas);

    if (reduce) draw(0);
    else start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [reduce]);

  return (
    <Box sx={[{ position: 'relative', width: '100%' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="A glowing particle sculpture that forms a spinning core, then the Hadasoft mark, then two interlocked rings standing for BizWhats and ACIP."
        style={{ display: 'block', width: '100%', height: '100%', touchAction: 'pan-y' }}
      />
    </Box>
  );
}
