import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="container w-full">
      <div className="flex flex-col items-center justify-between gap-4 p-6 lg:flex-row">
        <Image
          width={162}
          height={40}
          className="h-[40px] w-[162px] object-contain"
          src="/logo-text.png"
          alt="OSSummer Logo"
        />
        <div className="flex items-center gap-4 text-xs">
          <div className="flex flex-col gap-y-1 text-right">
            <p>Built in Toronto</p>
            <p>All rights onchain</p>
          </div>
          <Image width={48} height={52} src="/canada.png" alt="Made in canada" />
          <div className="flex flex-col gap-y-1">
            <p>
              <a
                href="https://twitter.com/sergedottech"
                className="underline-offset-4 hover:underline"
              >
                Sergiy Dybskiy
              </a>
            </p>
            <p>
              <a href="https://simonoff.design/" className="underline-offset-4 hover:underline">
                Elijah Semenov
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-1 font-semibold">
          <p>{new Date().getFullYear()} &apos;til Infinity</p>
        </div>
      </div>
    </footer>
  );
}
