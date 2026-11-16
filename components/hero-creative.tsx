"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeftRight } from "lucide-react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { heroStudy } from "@/lib/content";

export function HeroCreative() {
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<boolean | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start start", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const pitch = useSpring(useMotionValue(0), { stiffness: 190, damping: 28 });
  const yaw = useSpring(useMotionValue(0), { stiffness: 190, damping: 28 });
  const creative = selected ?? (!reduced && scrolled);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setScrolled(progress > 0.19);
  });

  return (
    <figure className="hero-study" data-creative={creative}>
      <div
        ref={stage}
        className="hero-study-stage"
        onPointerMove={(event) => {
          if (reduced || event.pointerType !== "mouse") return;
          const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
          pitch.set(3 - (event.clientY - top) / height * 6);
          yaw.set((event.clientX - left) / width * 7 - 3.5);
        }}
        onPointerLeave={() => { pitch.set(0); yaw.set(0); }}
      >
        <motion.div id="hero-campaign-study" className="hero-study-frame" style={reduced ? undefined : { rotateX: pitch, rotateY: yaw }}>
          <motion.div className="hero-study-photo" style={reduced ? undefined : { y: parallax }}>
            <Image src={heroStudy.asset} alt={heroStudy.alt} fill sizes="(max-width: 720px) 92vw, 52vw" preload />
          </motion.div>
          <div className="hero-study-grade" />
          <span className="hero-study-label">{creative ? "Campaign concept" : "Source photograph"}</span>
          <p className="hero-study-headline" aria-hidden={!creative}>{heroStudy.headline}</p>
        </motion.div>
      </div>
      <figcaption className="hero-study-controls">
        <span>Studio concept · <a href={heroStudy.creditUrl}>{heroStudy.credit}</a></span>
        <button
          type="button"
          aria-controls="hero-campaign-study"
          onClick={() => setSelected(!creative)}
        >
          <ArrowLeftRight size={17} aria-hidden="true" />
          <span>{creative ? "Show source" : "See the transformation"}</span>
        </button>
      </figcaption>
    </figure>
  );
}
