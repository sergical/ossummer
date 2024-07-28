'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type ColorChangingHeadingProps = {
  text: string;
  color: string;
};

function ColorChangingHeading({ text, color }: ColorChangingHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 1], [0.04, 0.06, 1, 1]);

  return (
    <motion.h1
      ref={headingRef}
      className={`p-8 text-center text-4xl font-bold lg:text-9xl ${color}`}
      style={{ opacity }}
    >
      {text}
    </motion.h1>
  );
}

export default ColorChangingHeading;
