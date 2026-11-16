"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ImageIcon, Play } from "lucide-react";

export function CreativePreview({ asset, alt, title, variant }: { asset: string; alt: string; title: string; variant: string }) {
  const [treatment, setTreatment] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const reduceMotion = useReducedMotion();
  const pullBack = variant === "table-in-season";

  return <div className="comparison">
    <div className={"comparison-stage" + (treatment ? " comparison-treated" : "")}>
      <motion.div
        key={playCount}
        className="comparison-photo"
        initial={treatment && !reduceMotion ? { scale: pullBack ? 1.14 : 1, x: 0 } : false}
        animate={{ scale: treatment && !reduceMotion && !pullBack ? 1.16 : 1, x: treatment && !reduceMotion && variant === "slow-mornings" ? "3%" : 0 }}
        transition={{ duration: treatment && !reduceMotion ? 5 : 0, ease: "easeOut" }}
      >
        <Image src={asset} alt={alt} fill sizes="(max-width: 760px) 92vw, 52vw" />
      </motion.div>
      {treatment && <motion.p
        className="comparison-title"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.65 }}
      >{title}</motion.p>}
    </div>
    <div className="comparison-controls" role="group" aria-label={title + " asset comparison"}>
      <button type="button" aria-pressed={!treatment} onClick={() => setTreatment(false)}><ImageIcon size={17} aria-hidden="true" />Source still</button>
      <button type="button" aria-pressed={treatment} onClick={() => {setTreatment(true); setPlayCount((count) => count + 1);}}><Play size={17} aria-hidden="true" />Motion study</button>
    </div>
  </div>;
}
