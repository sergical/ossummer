import React from 'react';

export default function LanguageBadge({ language }: { language: string | null }) {
  if (!language) return null;
  return <div className="rounded-md bg-blue-500 px-2 py-1 text-xs text-white">{language}</div>;
}
