import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="container flex flex-col gap-y-5 rounded-lg px-7 py-5 md:px-10">
      <div className="flex justify-between">
        <Image
          width={162}
          height={40}
          className="h-[40px] w-[162px] object-contain"
          src="/logo-text.png"
          alt="OSSummer Logo"
        />
        <div className="flex gap-4">
          <div className="flex flex-col gap-y-1">
            <p>Built in Toronto</p>
            <p>All rights onchain</p>
          </div>
          <Image width={48} height={52} src="/canada.png" alt="Made in canada" />
          <div className="flex flex-col gap-y-1">
            <p>Built in Toronto</p>
            <p>All rights onchain</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
