import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink, JsonLd, ServicesGrid, TextLink, WorkGrid } from "@/components/site";
import { HeroCreative } from "@/components/hero-creative";
import { name, pages } from "@/lib/content";
import { absolute, organisation, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/", pages["/"].title, pages["/"].description);

export default function HomePage() {
  return <>
    <JsonLd data={[organisation, { "@type": "WebSite", name, url: absolute("/"), inLanguage: "en-NZ", publisher: { "@id": organisation["@id"] } }]} />
    <section className="homepage-hero">
      <HeroCreative />
      <div className="shell homepage-hero-inner">
        <h1>Your brand.<br />Beautifully in motion.</h1>
        <p>We turn the photos you already have into promotional films, social content and campaigns.</p>
        <ButtonLink href="#selected-work" light>See the work</ButtonLink>
      </div>
    </section>

    <section className="shell section home-work" id="selected-work" aria-labelledby="work-title">
      <div className="home-work-intro">
        <h2 id="work-title">See what your content could become.</h2>
        <TextLink href="/work">View studio concepts</TextLink>
      </div>
      <WorkGrid />
    </section>

    <section className="shell home-process" aria-labelledby="home-process-title">
      <div className="home-process-photo">
        <Image src="/media/amber.webp" alt="" fill sizes="(max-width: 720px) 100vw, 53vw" />
      </div>
      <div className="home-process-content">
        <h2 id="home-process-title">Start with what you have.</h2>
        <p>Share your best images. We’ll handle creative direction, editing and delivery.</p>
        <ButtonLink href="/how-it-works" light>How it works</ButtonLink>
      </div>
    </section>

    <section className="shell section home-services" aria-labelledby="home-services-title">
      <h2 id="home-services-title">What we create.</h2>
      <ServicesGrid showImages={false} />
    </section>

    <section className="discovery" aria-labelledby="discovery-title">
      <div className="shell discovery-inner">
        <h2 id="discovery-title">Have a project in mind?</h2>
        <form action="/contact" method="get">
          <input type="hidden" name="source" value="brand-discovery" />
          <label htmlFor="discovery-website">Your website</label>
          <div className="discovery-field">
            <input id="discovery-website" name="website" required inputMode="url" autoComplete="url" placeholder="yourbrand.co.nz" maxLength={300} />
            <button className="button" type="submit">Explore my brand <ArrowUpRight size={17} aria-hidden="true" /></button>
          </div>
        </form>
      </div>
    </section>
  </>;
}
