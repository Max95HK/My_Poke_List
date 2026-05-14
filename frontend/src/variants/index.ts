/**
 * Node modules
 */
import { stagger, type Variants } from 'motion/react';

export const menuVariants: Variants = {
  open: ({ x, y }: { x: number; y: number }) => ({
    clipPath: `circle(150vmax at ${x}px ${y}px)`,
  }),
  closed: ({ x, y }: { x: number; y: number }) => ({
    clipPath: `circle(24px at ${x}px ${y}px)`,
  }),
};

export const navVariants: Variants = {
  open: {
    transition: { delayChildren: stagger(0.07, { startDelay: 0.2 }) },
  },
  closed: {
    transition: { delayChildren: stagger(0.05, { from: 'last' }) },
  },
};

export const navItemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {
        stiffness: 1000,
        velocity: -100,
      },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: {
        stiffness: 1000,
      },
    },
  },
};
