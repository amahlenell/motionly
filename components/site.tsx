import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
        <Link href="/contact" className="header-cta">Start a project <ArrowUpRight size={16} aria-hidden="true" /></Link>
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
          <Wordmark />
          <nav aria-label="Footer navigation">
            {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href="/contact">Start a project</Link>
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

export function PageIntro({ title, intro }: { title: string; intro: string }) {
  return (
    <section className="page-intro shell">
      <h1>{title}</h1>
      <p>{intro}</p>
    </section>
  );
}

export function WorkGrid() {
  return <div className="work-grid">
    {campaignConcepts.map((project) => (
      <article key={project.id} className="work-card scroll-reveal">
        <Link className="work-link" href={"/work#" + project.id}>
          <span className="work-image">
            <Image src={project.asset} alt={project.alt} fill sizes="(max-width: 650px) 92vw, (max-width: 850px) 46vw, 31vw" />
          </span>
          <h3 className="work-title">{project.title}<ArrowUpRight size={21} aria-hidden="true" /></h3>
        </Link>
      </article>
    ))}
  </div>;
}

const serviceTreatments = [
  "Product films for launches, websites and ads.",
  "Short videos and stills made to work together.",
  "One creative direction across every placement.",
];

export function ServicesGrid({ showImages = true }: { showImages?: boolean }) {
  return <div className={showImages ? "services-grid" : "services-rows"}>
    {services.map((service, index) => {
      const campaign = campaignForService(service.slug);
      return (
        <article className="service-card scroll-reveal" key={service.slug}>
          <Link href={servicePath(service.slug)} className="service-link">
            {showImages && <span className={"service-visual service-visual-" + campaign.tone}>
              <Image src={campaign.asset} alt="" fill sizes="(max-width: 720px) 90vw, 32vw" />
            </span>}
            <div className="service-card-body">
              <h3>{service.title}<ArrowUpRight size={21} aria-hidden="true" /></h3>
              <p>{serviceTreatments[index]}</p>
            </div>
          </Link>
        </article>
      );
    })}
  </div>;
}

export function Steps() {
  return <ol className="steps">
    {steps.map((step) => (
      <li key={step.title}>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
      </li>
    ))}
  </ol>;
}

export function CallToAction() {
  return <section className="cta-section">
    <div className="shell cta-inner">
      <h2>Have a project in mind?</h2>
      <ButtonLink href="/contact" light>Start a project</ButtonLink>
    </div>
  </section>;
}
