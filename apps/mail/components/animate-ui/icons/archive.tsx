'use client';

import * as React from 'react';
import { motion, type Variants } from 'motion/react';

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from '@/components/animate-ui/icons/icon';

type ArchiveProps = IconProps<keyof typeof animations>;

const animations = {
  default: {
    group: {
      initial: {
        x: 0,
        y: 0,
        scale: 1,
      },
      animate: {
        x: [0, 2, -1, 3, 0],
        y: [0, -2, 1, -1, 0],
        scale: [1, 0.95, 1],
        transition: {
          duration: 1.2,
          ease: 'easeInOut',
        },
      },
    },

    pencil: {
      initial: {
        rotate: 0,
      },
      animate: {
        rotate: [0, -8, 4, -6, 0],
        transition: {
          duration: 1.2,
          ease: 'easeInOut',
        },
      },
    },

    stroke: {
      initial: {
        pathLength: 0,
        opacity: 0,
      },
      animate: {
        pathLength: 1,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: 'easeInOut',
        },
      },
    },
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, className, ...props }: ArchiveProps) {
  const { controls } = useAnimateIconContext();
  const variants = getVariants(animations);

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={`  ${className}`}
      fill="none"
      {...props}
    >
      <motion.g
        variants={variants.group}
        initial="initial"
        animate={controls}
      >
        {/* Pencil */}
        <motion.path
          variants={variants.pencil}
          initial="initial"
          animate={controls}
          d="m16.949 3.47-.618.619-1.164-1.165.625-.624a.823.823 0 0 1 1.157 0 .823.823 0 0 1 0 1.157zM8.423 11.997l7.153-7.153-1.165-1.165-7.16 7.147c-.11.11-.192.262-.247.414l-.303.978c-.055.206.137.4.33.33l.978-.303a.9.9 0 0 0 .414-.248"
          fill="rgba(255, 255, 255, 0.445)"
        />

        {/* Writing stroke */}
        <motion.path
          variants={variants.stroke}
          initial="initial"
          animate={controls}
          d="M9.578 5.438q.617 0 1.197.126l1.051-1.004a6.9 6.9 0 0 0-2.248-.372h-.35a6.603 6.603 0 0 0-6.603 6.602v.257c0 1.254.371 2.48 1.067 3.524a9.25 9.25 0 0 0 5.455 3.844"
          fill="none"
          stroke="rgba(255, 255, 255, 0.445)"
          strokeWidth={1}
          strokeLinecap="round"
        />

        {/* End curve */}
        <path
          d="M12.444 15.748a6.47 6.47 0 0 1-5.471-1.878l1.387-.433a5.22 5.22 0 0 0 3.92 1.072"
          fill="rgba(255, 255, 255, 0.445)"
        />
      </motion.g>
    </motion.svg>
  );
}

function Archive(props: ArchiveProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  Archive,
  Archive as ArchiveIcon,
  type ArchiveProps,
  type ArchiveProps as ArchiveIconProps,
};
