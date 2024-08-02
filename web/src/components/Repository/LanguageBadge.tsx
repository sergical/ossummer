import React, { useMemo } from 'react';

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function generateColor(language: string): string {
  const hash = hashString(language);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

function getLuminance(hsl: string): number {
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return 0;
  const [, , , lightness] = match;
  return parseInt(lightness, 10) / 100;
}

export default function LanguageBadge({ language }: { language: string | null }) {
  const backgroundColor = useMemo(() => generateColor(language ?? ''), [language]);
  const textColor = useMemo(
    () => (getLuminance(backgroundColor) > 0.5 ? '#000' : '#fff'),
    [backgroundColor],
  );

  if (!language) return null;
  return (
    <div
      className="inline-block rounded-md px-2 py-1 text-xs"
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      {language}
    </div>
  );
}
