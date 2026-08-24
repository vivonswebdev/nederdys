import { BilingualText } from "@/components/ui/BilingualText";
import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { EveilLayout } from "./EveilLayout";
import { Confetti } from "@/components/Confetti";
import { sounds } from "@/lib/sounds";
import { recordEveilCompletion, speakBilingual } from "@/lib/eveil";

interface Props {
  childId: string;
}

const SIZE = 320;
const TOLERANCE = 34; // large : motricité fine 3-5 ans

type Point = { x: number; y: number };

interface Shape {
  id: string;
  name: string;
  nameNl: string;
  points: Point[];
}

const circle = (): Point[] =>
  Array.from({ length: 60 }, (_, i) => {
    const a = (i / 60) * Math.PI * 2;
    return { x: 160 + Math.cos(a) * 110, y: 160 + Math.sin(a) * 110 };
  });

const polyline = (corners: Point[]): Point[] => {
  const pts: Point[] = [];
  for (let i = 0; i < corners.length - 1; i++) {
    const a = corners[i];
    const b = corners[i + 1];
    for (let t = 0; t < 20; t++) {
      pts.push({ x: a.x + ((b.x - a.x) * t) / 20, y: a.y + ((b.y - a.y) * t) / 20 });
    }
  }
  pts.push(corners[corners.length - 1]);
  return pts;
};

const SHAPES: Shape[] = [
  { id: "ligne", name: "la ligne", nameNl: "de lijn", points: polyline([{ x: 40, y: 160 }, { x: 280, y: 160 }]) },
  {
    id: "carre",
    name: "le carré",
    nameNl: "het vierkant",
    points: polyline([
      { x: 60, y: 60 },
      { x: 260, y: 60 },
      { x: 260, y: 260 },
      { x: 60, y: 260 },
      { x: 60, y: 60 },
    ]),
  },
  {
    id: "triangle",
    name: "le triangle",
    nameNl: "de driehoek",
    points: polyline([
      { x: 160, y: 45 },
      { x: 275, y: 265 },
      { x: 45, y: 265 },
      { x: 160, y: 45 },
    ]),
  },
  { id: "cercle", name: "le rond", nameNl: "de cirkel", points: circle() },
];

export const TraceLaForme = ({ childId }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const visited = useRef<Set<number>>(new Set());
  const startedAt = useRef(Date.now());
  const [shapeIndex, setShapeIndex] = useState(0);
  const [completion, setCompletion] = useState(0);
  const [stars, setStars] = useState(0);
  const [done, setDone] = useState(false);
  const shape = SHAPES[shapeIndex];

  const say = () =>
    speakBilingual({
      nl: `Volg ${shape.nameNl} met je vinger!`,
      fr: `Suis ${shape.name} avec ton doigt !`,
    });

  const paintGuide = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.setLineDash([10, 12]);
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(120,120,120,0.45)";
    ctx.beginPath();
    shape.points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.stroke();
    ctx.setLineDash([]);
  };

  useEffect(() => {
    visited.current = new Set();
    setCompletion(0);
    paintGuide();
    const t = window.setTimeout(say, 400);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shapeIndex]);

  const point = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * SIZE,
      y: ((e.clientY - rect.top) / rect.height) * SIZE,
    };
  };

  const handleMove = (p: Point) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.strokeStyle = "hsl(var(--primary))";
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);

    shape.points.forEach((sp, i) => {
      if (Math.hypot(sp.x - p.x, sp.y - p.y) <= TOLERANCE) visited.current.add(i);
    });
    const pct = (visited.current.size / shape.points.length) * 100;
    setCompletion(pct);

    if (pct >= 70 && !done) succeed();
  };

  const succeed = () => {
    drawing.current = false;
    const nextStars = stars + 1;
    setStars(nextStars);
    sounds.victory();
    speakBilingual({ nl: "Goed zo, het is gelukt!", fr: "Bravo, c'est réussi !" });
    if (shapeIndex + 1 >= SHAPES.length) {
      setDone(true);
      void recordEveilCompletion({
        childId,
        activityId: "trace-la-forme",
        stars: nextStars,
        maxStars: SHAPES.length,
        durationSeconds: (Date.now() - startedAt.current) / 1000,
      });
    } else {
      window.setTimeout(() => setShapeIndex((i) => i + 1), 1400);
    }
  };

  return (
    <EveilLayout
      childId={childId}
      title="Trace la Forme"
      titleNl="Teken de Vorm"
      emoji="✏️"
      stars={stars}
      maxStars={SHAPES.length}
    >
      {(done || completion >= 70) && <Confetti />}
      <div className="space-y-6 text-center">
        <button
          onClick={say}
          aria-label="Réécouter la consigne"
          className="min-h-[80px] w-full max-w-sm mx-auto flex items-center justify-center gap-3 rounded-3xl bg-primary/15 text-primary text-2xl font-bold"
        >
          <Volume2 className="w-9 h-9" /> <BilingualText nl="Luisteren" fr="Écouter" single />
        </button>

        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          className="mx-auto w-full max-w-[320px] aspect-square touch-none rounded-3xl bg-card border-4 border-primary/30"
          onPointerDown={(e) => {
            if (done) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            drawing.current = true;
            const p = point(e);
            const ctx = canvasRef.current?.getContext("2d");
            ctx?.beginPath();
            ctx?.moveTo(p.x, p.y);
            handleMove(p);
          }}
          onPointerMove={(e) => {
            if (!drawing.current || done) return;
            handleMove(point(e));
          }}
          onPointerUp={() => (drawing.current = false)}
          onPointerLeave={() => (drawing.current = false)}
        />

        <div className="mx-auto w-full max-w-[320px]">
          <div className="h-5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${Math.min(100, completion)}%` }}
            />
          </div>
        </div>

        {done ? (
          <button
            onClick={() => {
              setShapeIndex(0);
              setStars(0);
              setDone(false);
              startedAt.current = Date.now();
            }}
            className="min-h-[80px] w-full max-w-sm mx-auto rounded-3xl bg-primary text-primary-foreground text-3xl font-bold"
          >
            🔁
          </button>
        ) : (
          <button
            onClick={() => {
              visited.current = new Set();
              setCompletion(0);
              paintGuide();
            }}
            aria-label="Effacer et recommencer"
            className="min-h-[80px] w-full max-w-sm mx-auto rounded-3xl bg-muted text-3xl font-bold"
          >
            🧽
          </button>
        )}
      </div>
    </EveilLayout>
  );
};

export default TraceLaForme;
