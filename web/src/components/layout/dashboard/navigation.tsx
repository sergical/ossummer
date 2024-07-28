// components/Navigation.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LogoutButton } from './logout-button';
import { MobileNavigation } from './mobile-navigation';

const navItems = [
  { href: '/projects', label: 'Projects' },
  { href: '/contributors', label: 'Contributors' },
];

export function Navigation() {
  return (
    <>
      {/* Mobile Navigation */}
      <MobileNavigation navItems={navItems} />

      {/* Desktop Sidebar Navigation */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-black/10 bg-white/50 backdrop-blur-lg lg:block">
        <div className="flex h-full flex-col p-6">
          <Link href="/" className="mb-8">
            <Image src="/logo-text.png" alt="OS Summer Logo" width={162} height={40} />
          </Link>
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-bold underline-offset-4 hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <LogoutButton />
          </div>
        </div>
      </aside>
    </>
  );
}
