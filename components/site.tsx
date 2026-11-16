import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clapperboard, Layers3, PanelsTopLeft } from "lucide-react";
import { MobileMenu } from "@/components/mobile-menu";
import { campaignConcepts, campaignForService, services, servicePath, steps } from "@/lib/content";

const navigation = [
  ["Work", "/work"], ["Services", "/services"], ["How It Works", "/how-it-works"], ["About", "/about"],
];

export function Wordmark() {
  return <Link href="/" className="wordmark" aria-label="Motionly home"><Image src="/brand/motionly-colour.svg" alt="" width={145} height={34} unoptimized /></Link>;
}

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Wordmark />
        <nav aria-label="Main navigation" className="primary-nav">
          {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link href="/contact" className="header-cta">Get started <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <MobileMenu navigation={navigation} />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div><Wordmark /><p>We read your brand. We create your content.</p></div>
          <nav aria-label="Footer navigation">
            {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href="/contact">Get started</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Motionly</span>
          <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </div>
    </footer>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="text-link" href={href}>{children}<ArrowUpRight size={17} aria-hidden="true" /></Link>;
}

export function ButtonLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return <Link className={light ? "button button-light" : "button"} href={href}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}

export function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> }) {
  const payload = Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : { "@context": "https://schema.org", ...data };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, "\\u003c") }} />;
}

export function PageIntro({ title, intro, label }: { title: string; intro: string; label?: string }) {
  return (
    <section className="page-intro shell">
      {label && <p className="eyebrow">{label}</p>}
      <h1>{title}</h1>
      <p>{intro}</p>
    </section>
  );
}

export function WorkGrid() {
  return <div className="work-grid">
    {campaignConcepts.map((project) => (
      <article key={project.id} className="work-card scroll-reveal">
        <Link className="work-image" href={"/work#" + project.id} aria-label={project.title + " studio concept"}>
          <Image src={project.asset} alt={project.alt} fill sizes="(max-width: 650px) 92vw, (max-width: 850px) 46vw, 31vw" />
          <span className="work-badge">Studio concept</span>
          <span className="work-arrow"><ArrowUpRight size={19} aria-hidden="true" /></span>
        </Link>
        <p className="eyebrow">{project.category}</p>
        <h3><Link href={"/work#" + project.id}>{project.title}</Link></h3>
      </article>
    ))}
  </div>;
}

const serviceIcons = [Clapperboard, PanelsTopLeft, Layers3];
const serviceTreatments = [
  "Make the most of the product photography you already have with short, considered films for launches, websites and ads.",
  "Turn one clear brand idea into a set of short videos, stills and crops that belong together in the feed.",
  "Carry one creative direction from campaign hero to seasonal social and web placements.",
];

export function ServicesGrid() {
  return <div className="services-grid">
    {services.map((service, index) => {
      const Icon = serviceIcons[index];
      const campaign = campaignForService(service.slug);
      return (
        <article className="service-card scroll-reveal" key={service.slug}>
          <Link href={servicePath(service.slug)} className={"service-visual service-visual-" + campaign.tone} aria-label={"View " + service.title + (campaign.tone === "lifestyle" ? " · " + campaign.headline : "")}>
            <Image src={campaign.asset} alt="" fill sizes="(max-width: 720px) 90vw, 32vw" />
            {campaign.tone === "lifestyle" && (
              <span className="service-device" aria-hidden="true">
                <Image src={campaign.asset} alt="" fill sizes="110px" />
                <span>{campaign.headline}</span>
              </span>
            )}
          </Link>
          <div className="service-card-body">
            <Icon size={24} strokeWidth={1.35} aria-hidden="true" />
            <h3>{service.title}</h3>
            <p>{serviceTreatments[index]}</p>
            <TextLink href={servicePath(service.slug)}>Explore {service.label.toLowerCase()}</TextLink>
          </div>
        </article>
      );
    })}
  </div>;
}

export function Steps() {
  return <ol className="steps">
    {steps.map((step) => (
      <li key={step.title}>
        <span className="step-arrow"><ArrowRight size={20} strokeWidth={1.4} aria-hidden="true" /></span>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
      </li>
    ))}
  </ol>;
}

export function CallToAction() {
  return <section className="cta-section">
    <div className="shell cta-inner">
      <div><h2>Your next campaign could start here.</h2><p>Tell us what you’re launching and show us the assets you already have.</p></div>
      <ButtonLink href="/contact" light>Start a project</ButtonLink>
    </div>
  </section>;
}
