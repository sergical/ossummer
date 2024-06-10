import confetti from 'canvas-confetti';

type ConfettiOptions = {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  flat?: boolean;
  ticks?: number;
  origin?: { x: number; y: number };
  colors?: string[];
  shapes?: confetti.Shape[];
  zIndex?: number;
  disableForReducedMotion?: boolean;
  useWorker?: boolean;
  resize?: boolean;
  canvas?: HTMLCanvasElement | null;
  scalar?: number;
} & confetti.Options;

const Confetti = (options: ConfettiOptions) => {
  if (options.disableForReducedMotion && window.matchMedia('(prefers-reduced-motion)').matches) {
    return;
  }

  const confettiInstance = options.canvas
    ? confetti.create(options.canvas, {
        resize: options.resize ?? true,
        useWorker: options.useWorker ?? true,
      })
    : confetti;

  void confettiInstance({
    ...options,
  });
};

Confetti.shapeFromPath = (options: { path: string; [key: string]: unknown }) => {
  return confetti.shapeFromPath({ ...options });
};

Confetti.shapeFromText = (options: { text: string; [key: string]: unknown }) => {
  return confetti.shapeFromText({ ...options });
};

export { Confetti };
