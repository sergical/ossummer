'use client';

function Ellipse({ className }: { className: string }) {
  return (
    <svg className={`absolute ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none">
      <ellipse cx="50" cy="50" rx="50" ry="50" fill="currentColor" />
    </svg>
  );
}

export function BackgroundAnimated() {
  return (
    <div className="absolute inset-0 overflow-hidden blur-lg">
      <Ellipse className="animate-float-orange text-[#FA3C0D]" />
      <Ellipse className="animate-float-purple text-[#FC80F5]" />
      <Ellipse className="animate-float-yellow text-[#FAB851]" />
    </div>
  );
}
