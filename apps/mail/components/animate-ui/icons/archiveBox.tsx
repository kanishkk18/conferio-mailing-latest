'use client';

import * as React from 'react';
import { motion, type Variants } from 'motion/react';

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from '@/components/animate-ui/icons/icon';

type ArchiveBoxProps = IconProps<keyof typeof animations>;

const animations = {
  default: {
    group: {
      initial: {
        y: 0,
      },
      animate: {
        y: 1,
        transition: {
          duration: 0.25,
          ease: 'easeInOut',
        },
      },
    },

    slot: {
      initial: {
        y: 0,
      },
      animate: {
        y: 1.5,
        transition: {
          duration: 0.25,
          ease: 'easeInOut',
        },
      },
    },

    box: {},
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, className, ...props }: ArchiveBoxProps) {
  const { controls } = useAnimateIconContext();
  const variants = getVariants(animations);

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 2 17 18"
      className={className}
      fill="none"
      {...props}
    >
      <motion.g
        variants={variants.group}
        initial="initial"
        animate={controls}
      >
        {/* Slot */}
        <motion.path
          d="M8 9.875a.625.625 0 1 0 0 1.25h4a.625.625 0 1 0 0-1.25z"
          fill="rgba(255, 255, 255, 0.445)"
          variants={variants.slot}
          initial="initial"
          animate={controls}
        />

        {/* Box */}
        <motion.path
          d="M3.125 4.75c0-.897.728-1.625 1.625-1.625h10.5c.898 0 1.625.728 1.625 1.625v1.57c0 .676-.413 1.256-1 1.5v7.43c0 .898-.727 1.625-1.625 1.625h-8.5a1.625 1.625 0 0 1-1.625-1.625V7.82c-.587-.244-1-.824-1-1.5zm11.5 3.195h-9.25v7.305c0 .207.168.375.375.375h8.5a.375.375 0 0 0 .375-.375zm1-1.625V4.75a.375.375 0 0 0-.375-.375H4.75a.375.375 0 0 0-.375.375v1.57c0 .205.164.372.369.375h10.512a.375.375 0 0 0 .369-.375"
          fill="rgba(255, 255, 255, 0.445)"
          variants={variants.box}
        />
      </motion.g>
    </motion.svg>
  );
}

function ArchiveBox(props: ArchiveBoxProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  ArchiveBox,
  ArchiveBox as ArchiveBoxIcon,
  type ArchiveBoxProps,
  type ArchiveBoxProps as ArchiveBoxIconProps,
};
