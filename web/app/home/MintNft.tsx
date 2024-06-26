'use client';

import { cubicBezier, motion } from 'framer-motion';
import Image from 'next/image';

export function MintNft() {
  const variant1 = {
    initial: {
      y: 4,
      scale: 0.5,
      opacity: 0,
      transition: {
        delay: 0.05,
        duration: 0.3,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      y: -2,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.05,
        duration: 0.3,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };
  const variant2 = {
    initial: {
      y: -2,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.05,
        duration: 0.3,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      y: 8,
      opacity: 1,
      scale: 1.05,
      boxShadow:
        'rgba(39,245,76,0.15) 10px 20px 70px -20px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px',
      transition: {
        delay: 0.05,
        duration: 0.3,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };

  const containerVariants = {
    initial: {},
    whileHover: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="relative h-full w-full transform-gpu rounded-lg border bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] md:max-h-[500px]">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileHover="whileHover"
        className="flex h-full w-full cursor-pointer flex-col justify-between"
      >
        <motion.div className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-y-2 overflow-hidden rounded-t-xl p-8">
          <motion.p variants={variant1} className="w-fit rounded-full border px-2 text-[15px]">
            Minted Onchain ✨
          </motion.p>
          <motion.div variants={variant2} className="flex max-w-[300px] items-start gap-x-2 p-4">
            <div className="flex h-[200px] w-[200px] shrink-0 rounded-full bg-blue-500">
              <Image
                width={200}
                height={200}
                className="h-full w-full rounded-full object-cover"
                src="/OssNFT/ossnft.png"
                alt="jane"
              />
            </div>
          </motion.div>
        </motion.div>
        <div className="flex w-full flex-col items-start border-t border-neutral-200 p-4 dark:border-neutral-800">
          <h2 className="text-xl font-semibold">Mint your NFT</h2>
          <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
            Mint your NFT to unlock the rewards
          </p>
        </div>
      </motion.div>
    </div>
  );
}
