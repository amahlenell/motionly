"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";

const journeys = [
  { title: "A shoot-led production", steps: ["Concept planning", "Photoshoot", "Editing", "Formatting", "Campaign assets"], kind: "shoot" },
  { title: "With Motionly", steps: ["Share your assets", "Creative direction", "Production", "Review and approval"], kind: "motionly" },
];

export function ProductionJourney() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start 80%", "end 55%"] });

  return <section className="effort-band" ref={section} aria-labelledby="effort-heading">
    <div className="shell section effort-grid">
      <div className="effort-intro">
        <h2 id="effort-heading">Skip the production marathon. <em>Keep the creative magic.</em></h2>
        <p>Planning shoots, coordinating production, editing footage and preparing campaign assets can take considerable time. Motionly helps you make more of the visual content you already own.</p>
      </div>
      <div className="effort-journeys">
        {journeys.map(({ title, steps, kind }) => (
          <div className={"effort-track effort-track-" + kind} key={kind}>
            <h3>{title}</h3>
            <ol>{steps.map((step, i) => <li key={step}><span>{step}</span>{i < steps.length - 1 && <ArrowDown size={15} aria-hidden="true" />}</li>)}</ol>
          </div>
        ))}
        <div className="effort-progress" aria-hidden="true">
          <motion.span style={{ scaleX: reduced ? 1 : scrollYProgress }} />
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  </section>;
}
