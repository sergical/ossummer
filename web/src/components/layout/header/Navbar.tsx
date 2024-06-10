import { clsx } from 'clsx';
import NextLink from 'next/link';

import PrivyLogin from './PrivyLogin';
import { ThemeToggle } from './ThemeToggle';

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
        <div className="absolute size-8 rounded-full bg-foreground" />
      </NextLink>
      <NextLink
        href="/"
        passHref
        className="font-robotoMono text-center text-xl font-medium no-underline"
        aria-label="build-onchain-apps Github repository"
      >
        OSSUMMER
      </NextLink>
    </div>
  );
}

function Navbar() {
  return (
    <nav
      className={clsx(
        'flex flex-1 flex-grow items-center justify-between',
        'rounded-[50px] border border-stone-300 bg-background bg-opacity-10 p-4 backdrop-blur-2xl',
      )}
    >
      <div className="flex h-8 grow items-center justify-between gap-4">
        <NavbarTitle />
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
