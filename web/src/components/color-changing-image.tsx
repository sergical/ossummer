'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type ColorTransitionImageProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
};

function ColorTransitionImage({ src, width, height, alt, className }: ColorTransitionImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['end end', 'start 240px'],
  });

  const filter = useTransform(
    scrollYProgress,
    [0.7, 0.9, 1],
    ['grayscale(100%)', 'grayscale(0%)', 'grayscale(100%)'],
  );

  return (
    <motion.div ref={imageRef} style={{ filter }} className={cn('overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}

export default ColorTransitionImage;
