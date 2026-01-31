'use client';

import * as React from 'react';
import { motion, type Variants } from 'motion/react';

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from '@/components/animate-ui/icons/icon';

type ComposeProps = IconProps<keyof typeof animations>;

const animations = {
  default: {
    group: {
      initial: { rotate: 0 },
      animate: {
        rotate: -6,
        transition: {
          duration: 0.25,
          ease: 'easeInOut',
        },
      },
    },

    pencil: {
      initial: { x: 0, y: 0 },
      animate: {
        x: 1,
        y: -1,
        transition: {
          duration: 0.25,
          ease: 'easeInOut',
        },
      },
    },

    box: {
      initial: { opacity: 1 },
      animate: {
        opacity: 0.85,
        transition: {
          duration: 0.25,
          ease: 'easeInOut',
        },
      },
    },
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, className, ...props }: ComposeProps) {
  const { controls } = useAnimateIconContext();
  const variants = getVariants(animations);

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      {...props}
    >
      <motion.g
        variants={variants.group}
        initial="initial"
        animate={controls}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        {/* Pencil */}
        <motion.path
          d="M7.733 12.414q.138.126.298.07l1.51-.61 6.07-6.07-1.247-1.24L8.3 10.627l-.63 1.49q-.07.173.062.297m7.185-8.411 1.254 1.247.457-.464a.81.81 0 0 0 .25-.561.67.67 0 0 0-.229-.541l-.221-.222a.62.62 0 0 0-.513-.166.86.86 0 0 0-.547.264z"
          fill="rgba(255,255,255,0.81)"
          variants={variants.pencil}
          initial="initial"
          animate={controls}
        />

        {/* Box */}
        <motion.path
          d="M6.535 4.116A3.415 3.415 0 0 0 3.12 7.53v5.765a3.414 3.414 0 0 0 3.415 3.414h5.764a3.414 3.414 0 0 0 3.415-3.414v-2.451a.754.754 0 0 0-1.508 0v2.45a1.907 1.907 0 0 1-1.907 1.908H6.535a1.907 1.907 0 0 1-1.907-1.907V7.53a1.907 1.907 0 0 1 1.907-1.907h3.01a.754.754 0 1 0 0-1.507z"
          fill="rgba(255,255,255,0.81)"
          variants={variants.box}
          initial="initial"
          animate={controls}
        />
      </motion.g>
    </motion.svg>
  );
}

function Compose(props: ComposeProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  Compose,
  Compose as ComposeIcon,
  type ComposeProps,
  type ComposeProps as ComposeIconProps,
};
