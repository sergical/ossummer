'use client';

import React from 'react';
import { BookOpenIcon, BuildingIcon, HomeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LogoutButton } from './logout-button';
import { MobileNavigation } from './mobile-navigation';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: <HomeIcon className="h-4 w-4" /> },
  {
    href: '/dashboard/submissions',
    label: 'Submissions',
    icon: <BookOpenIcon className="h-4 w-4" />,
  },
  { href: '/dashboard/projects', label: 'Projects', icon: <BuildingIcon className="h-4 w-4" /> },
];

export function Navigation() {
  const pathname = usePathname();
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
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 rounded-md px-2 py-2 text-sm font-bold hover:bg-black/5',
                  pathname === item.href && 'bg-black/10',
                )}
              >
                {item.icon}
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
