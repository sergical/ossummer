'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed left-0 right-0 top-6 z-50 flex justify-center px-4 lg:top-8">
      <div
        className={cn(
          isOpen && '!rounded-b-none !border-b-0',
          'flex w-full max-w-5xl items-center justify-between rounded-lg border border-black/10 bg-white/50 px-6 py-3 backdrop-blur-lg',
        )}
      >
        <div className="flex items-center gap-2">
          <Image src="/logo-text.png" alt="OS Summer Logo" width={162} height={40} />
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Button>
            <Link href="/projects">Explore projects</Link>
          </Button>
        </div>
        <button className="lg:hidden" onClick={toggleMenu} aria-label="Toggle menu" type="button">
          <motion.div
            animate={isOpen ? 'open' : 'closed'}
            className="flex h-6 w-6 flex-col items-center justify-center"
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 6 },
              }}
              className="mb-1.5 h-0.5 w-6 bg-black"
            />
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              className="mb-1.5 h-0.5 w-6 bg-black"
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -10 },
              }}
              className="h-0.5 w-6 bg-black"
            />
          </motion.div>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mx-4 overflow-hidden rounded-b-lg border border-black/10 bg-white/50 p-4 shadow-lg backdrop-blur-lg"
          >
            <div className="p-4">
              <Button className="mb-2 w-full">
                <Link href="/projects">Explore projects</Link>
              </Button>
              {/* Add more menu items here */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
