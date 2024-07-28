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
    offset: ['start end', 'end start'],
  });

  const filter = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 1],
    ['grayscale(96%)', 'grayscale(94%)', 'grayscale(0%)', 'grayscale(0%)'],
  );

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 1], [0.04, 0.06, 1, 1]);

  return (
    <motion.div
      ref={imageRef}
      style={{ filter, opacity }}
      className={cn('overflow-hidden', className)}
    >
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
