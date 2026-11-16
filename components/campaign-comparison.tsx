"use client";

import { useId, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { campaignConcepts } from "@/lib/content";

type Campaign = typeof campaignConcepts[number];

export function CampaignComparison({ concept, feature = false }: { concept: Campaign; feature?: boolean }) {
  const [split, setSplit] = useState(50);
  const id = useId();
  const sizes = feature ? "(max-width: 850px) 93vw, 62vw" : "(max-width: 720px) 93vw, 50vw";
  const position = (event: PointerEvent<HTMLDivElement>) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    setSplit(Math.min(100, Math.max(0, Math.round((event.clientX - left) / width * 100))));
  };

  return <div className={"campaign-comparison campaign-" + concept.tone} style={{ "--split": split + "%" } as CSSProperties}>
    <div
      className="campaign-comparison-stage"
      aria-hidden="true"
      onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); position(event); }}
      onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) position(event); }}
    >
      <Image src={concept.asset} alt="" fill sizes={sizes} className="campaign-source" />
      <div className="campaign-comparison-finish">
        <Image src={concept.asset} alt="" fill sizes={sizes} className="campaign-graded" />
        <div className="campaign-comparison-title">{concept.headline}</div>
      </div>
      <span className="comparison-corner corner-source">Source photo</span>
      <span className="comparison-corner corner-campaign">Campaign concept</span>
      <div className="campaign-divider"><span><MoveHorizontal size={18} /></span></div>
    </div>
    <div className="campaign-range">
      <button type="button" onClick={() => setSplit(100)}>Source photo</button>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={split}
        onChange={(event) => setSplit(Number(event.currentTarget.value))}
        aria-label={"Compare source and campaign concept for " + concept.title}
        aria-valuetext={(100 - split) + "% campaign concept"}
        aria-describedby={id + "-visual"}
      />
      <button type="button" onClick={() => setSplit(0)}>Campaign concept</button>
    </div>
    <p className="sr-only" id={id + "-visual"}>{concept.alt}. The campaign concept adds colour grading, a new crop and the headline “{concept.headline}”</p>
  </div>;
}
