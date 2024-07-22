import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HoverLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group flex items-center gap-2 text-2xl font-bold">
      <span className="relative">
        <span className="relative z-10 transition-colors duration-300 group-hover:text-transparent">
          {children}
        </span>
        <span className="text-gradient absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {children}
        </span>
      </span>
      <span className="relative">
        <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
        <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ArrowRight className="text-gradient h-4 w-4 translate-x-1" />
        </span>
      </span>
    </Link>
  );
}
