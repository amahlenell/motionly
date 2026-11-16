import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ButtonLink, CallToAction, JsonLd, ServicesGrid, Steps, TextLink, WorkGrid } from "@/components/site";
import { CampaignComparison } from "@/components/campaign-comparison";
import { HeroCreative } from "@/components/hero-creative";
import { ProductionJourney } from "@/components/production-journey";
import { campaignConcepts, name, pages, positioning } from "@/lib/content";
import { absolute, organisation, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/", pages["/"].title, pages["/"].description);

export default function HomePage() {
  return <>
    <JsonLd data={[organisation, {"@type": "WebSite", name, url: absolute("/"), inLanguage: "en-NZ", publisher: {"@id": organisation["@id"]}}]} />
    <section className="hero cinematic-hero">
      <div className="shell cinematic-hero-inner">
        <div className="hero-content">
          <p className="eyebrow">Creative production studio</p>
          <h1>Your brand.<br /><em>Beautifully in motion.</em></h1>
          <p>Skip the hours of filming, editing and complicated production. We transform the photography, products and brand assets you already have into beautiful content that moves people.</p>
          <div className="hero-actions">
            <ButtonLink href="/contact" light>Bring your content to life</ButtonLink>
            <Link href="#see-whats-possible" className="hero-secondary">See what’s possible <ArrowDown size={17} aria-hidden="true" /></Link>
          </div>
        </div>
        <HeroCreative />
      </div>
    </section>

    <section className="discovery">
      <div className="shell discovery-inner">
        <div>
          <h2>We get to know your brand before we create.</h2>
          <p>Every great campaign starts with understanding your brand. Share your website and we’ll explore how your existing content could become something extraordinary.</p>
        </div>
        <form action="/contact" method="get">
          <input type="hidden" name="source" value="brand-discovery" />
          <label htmlFor="discovery-website">Your website</label>
          <div className="discovery-field">
            <input id="discovery-website" name="website" required inputMode="url" autoComplete="url" placeholder="yourbrand.co.nz" maxLength={300} />
            <button className="button" type="submit">Explore my brand <ArrowUpRight size={17} aria-hidden="true" /></button>
          </div>
          <p>Continue to the enquiry form for a studio review.</p>
        </form>
      </div>
    </section>

    <section className="showcase-band" id="see-whats-possible" aria-labelledby="showcase-title">
      <div className="shell section home-work">
        <div className="section-head scroll-reveal">
          <div><p className="eyebrow">From source to campaign</p><h2 id="showcase-title">See what your content<br className="wide-break" /> could become.</h2>
            <p>Your existing photography is only the beginning. Explore how a single image can inspire an entire creative campaign.</p></div>
          <TextLink href="/work">Explore all concepts</TextLink>
        </div>
        <article className="showcase-feature scroll-reveal">
          <CampaignComparison concept={campaignConcepts[0]} feature />
          <div className="showcase-copy">
            <p className="eyebrow">{campaignConcepts[0].category}</p>
            <h3>{campaignConcepts[0].title}</h3>
            <p>{campaignConcepts[0].direction}</p>
            <p className="showcase-formats">{campaignConcepts[0].formats}</p>
            <TextLink href="/work#daily-ritual">Explore this concept</TextLink>
          </div>
        </article>
        <WorkGrid />
      </div>
    </section>

    <ProductionJourney />

    <section className="service-band">
      <div className="shell section">
        <div className="section-head"><div><p className="eyebrow">Services</p><h2>Creative for your next launch.</h2></div><TextLink href="/services">Explore services</TextLink></div>
        <ServicesGrid />
      </div>
    </section>

    <section className="shell section scroll-reveal">
      <div className="section-head"><div><p className="eyebrow">Our process</p><h2>From first look to final edit.</h2></div><TextLink href="/how-it-works">How it works</TextLink></div>
      <Steps />
    </section>

    <section className="studio-band">
      <div className="shell section studio-inner">
        <div><p className="eyebrow">About the studio</p><h2>Creative direction, grounded in your brand.</h2></div>
        <div><p>{positioning}</p><p>Working remotely with brands in New Zealand, Australia and South Africa.</p><TextLink href="/about">About Motionly</TextLink></div>
      </div>
    </section>
    <CallToAction />
  </>;
}
