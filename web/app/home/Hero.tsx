'use client';

import { useRef } from 'react';
import { useLogin, usePrivy } from '@privy-io/react-auth';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RetroGrid from '@/components/magicui/retro-grid';
import { cn } from '@/lib/utils';

export function Hero() {
  const fadeInRef = useRef(null);
  const fadeInInView = useInView(fadeInRef, {
    once: true,
  });

  const router = useRouter();
  const { ready, authenticated } = usePrivy();

  const { login } = useLogin({
    onComplete: (user, isNewUser, wasAlreadyAuthenticated, loginMethod, linkedAccount) => {
      console.log(user, isNewUser, wasAlreadyAuthenticated, loginMethod, linkedAccount);
      if (!wasAlreadyAuthenticated) {
        router.push('/profile');
      }
    },
    onError: (error) => {
      console.log(error);
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    },
  });

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  const fadeUpVariants = {
    initial: {
      opacity: 0,
      y: 24,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="hero">
      <div className="relative h-full overflow-hidden py-14">
        <RetroGrid className="z-0" />
        <div className="container z-10 flex flex-col">
          <div className="mt-20 grid grid-cols-1">
            <div className="flex flex-col items-center gap-6 pb-8 text-center">
              <motion.h1
                ref={fadeInRef}
                className="text-balance bg-gradient-to-br from-black from-30% to-black/60 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl"
                animate={fadeInInView ? 'animate' : 'initial'}
                variants={fadeUpVariants}
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: 'spring',
                }}
              >
                Open Source <br /> Summer <br />
              </motion.h1>

              <motion.p
                className="text-balance text-lg tracking-tight text-gray-400 md:text-xl"
                animate={fadeInInView ? 'animate' : 'initial'}
                variants={fadeUpVariants}
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: 'spring',
                }}
              >
                Contribute to Open Source. Mint your special NFT. Get rewards.
              </motion.p>

              <motion.div
                animate={fadeInInView ? 'animate' : 'initial'}
                variants={fadeUpVariants}
                className="flex flex-col gap-4 lg:flex-row"
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: 'spring',
                }}
              >
                {authenticated ? (
                  <Link
                    href="/profile"
                    className={cn(
                      // colors
                      'bg-primary text-primary-foreground shadow hover:bg-primary/90',

                      // layout
                      'group relative inline-flex h-9 w-full items-center justify-center gap-2 overflow-hidden whitespace-pre rounded-md px-4 py-2 text-base font-semibold tracking-tighter focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:flex',

                      // animation
                      'transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2',
                    )}
                  >
                    Get Started
                    <ChevronRight className="size-4 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                ) : (
                  <button
                    className={cn(
                      // colors
                      'bg-primary text-primary-foreground shadow hover:bg-primary/90',

                      // layout
                      'group relative inline-flex h-9 w-full items-center justify-center gap-2 overflow-hidden whitespace-pre rounded-md px-4 py-2 text-base font-semibold tracking-tighter focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:flex',

                      // animation
                      'transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2',
                    )}
                    disabled={disableLogin}
                    onClick={login}
                    type="button"
                  >
                    Get Started
                    <ChevronRight className="size-4 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
