import { clsx } from 'clsx';
import Image from 'next/image';
import NextLink from 'next/link';

import PrivyLogin from './PrivyLogin';
import { ThemeToggle } from './ThemeToggle';

export const links = [
  {
    label: 'Explore',
    href: '/explore',
  },
  {
    label: 'Leaderboard',
    href: '/leaderboard',
  },
];

export function NavbarLink({
  href,
  children,
  target,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
  ariaLabel?: string;
}) {
  return (
    <NextLink
      href={href}
      className="font-robotoMono px-0 text-center text-base font-normal no-underline"
      target={target}
      aria-label={ariaLabel}
    >
      {children}
    </NextLink>
  );
}

export function NavbarTitle() {
  return (
    <div className="flex h-8 items-center justify-start gap-4">
      <NextLink href="/" passHref className="relative h-8 w-8" aria-label="Home page">
        <div className="size-8 rounded-full bg-[#2151F6] p-1">
          <Image
            src="/logo.png"
            alt="Ossummer logo"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      </NextLink>
      <div className="w-[172px]" />
    </div>
  );
}

function Navbar() {
  return (
    <nav
      className={clsx(
        'flex flex-1 flex-grow items-center justify-between',
        'rounded-[50px] border border-border bg-background/20 p-4 backdrop-blur-2xl',
      )}
    >
      <div className="flex h-8 grow items-center justify-between gap-4">
        <NavbarTitle />
        <ul className="flex items-center justify-start gap-8">
          {links.map((link) => (
            <li className="flex" key={link.href}>
              <NavbarLink href={link.href}>{link.label}</NavbarLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-start gap-8">
          <ul className="hidden items-center justify-start gap-8 md:flex">
            <li className="flex">
              <PrivyLogin />
            </li>

            <li className="flex">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
