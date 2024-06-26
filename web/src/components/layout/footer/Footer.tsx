import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { links } from '../header/Navbar';

type Icon = {
  icon: JSX.Element;
  url: string;
};

const icons: Icon[] = [{ icon: <GitHubLogoIcon />, url: 'https://github.com/sergical/ossummer' }];

// const links: LinkType[] = [
//   { text: 'Buy me coffee', url: '/buy-me-coffee' },
//   { text: 'ShipCasts', url: '/shipcasts' },
// ];

export default function Footer() {
  return (
    <footer className="container flex flex-col gap-y-5 rounded-lg px-7 py-5 md:px-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Image width={50} height={50} className="h-5 w-5" src="/logo.png" alt="OSSummer Logo" />
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">OSSUMMER</h2>
        </div>

        <div className="flex gap-x-2">
          {icons.map((icon, index) => (
            <Link
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              href={icon.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-5 w-5 items-center justify-center text-neutral-400 transition-all duration-100 ease-linear hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:font-medium dark:text-neutral-500 hover:dark:text-neutral-100"
            >
              {icon.icon}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-y-5 md:flex-row md:items-center">
        <ul className="flex flex-col gap-x-5 gap-y-2 text-neutral-500 md:flex-row md:items-center ">
          {links.map((link, index) => (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="text-[15px]/normal font-medium text-neutral-400 transition-all duration-100 ease-linear hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:font-medium dark:text-neutral-400 hover:dark:text-neutral-100"
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between text-sm font-medium tracking-tight text-neutral-500 dark:text-neutral-400">
          <p>All rights onchain - MIT - let&apos;s build 🔵</p>
        </div>
      </div>
    </footer>
  );
}
