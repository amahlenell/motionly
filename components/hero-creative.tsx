"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function HeroCreative() {
  const frame = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start start", "end start"] });
  const offset = useTransform(scrollYProgress, [0, 1], [0, 48]);

  return (
    <div ref={frame} className="homepage-hero-media" aria-hidden="true">
      <motion.div className="homepage-hero-photo" style={reduceMotion ? undefined : { y: offset }}>
        <Image src="/media/forest-fragrance.webp" alt="" fill sizes="100vw" preload />
      </motion.div>
    </div>
  );
}
