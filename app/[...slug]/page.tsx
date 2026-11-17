import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CampaignComparison } from "@/components/campaign-comparison";
import { CreativePreview } from "@/components/creative-preview";
import { ProductionJourney } from "@/components/production-journey";
import { ButtonLink, CallToAction, JsonLd, PageIntro, ServicesGrid, Steps, TextLink } from "@/components/site";
import { campaignConcepts, campaignForService, heroStudy, markets, pages, positioning, projects, services, servicePath } from "@/lib/content";
import { absolute, breadcrumb, organisation, pageMetadata } from "@/lib/seo";

const infoPaths = ["/work", "/services", "/how-it-works", "/about", "/privacy", "/terms"] as const;
type Route = { params: Promise<{ slug: string[] }> };

function getPage(slug: string[]) {
  const path = "/" + slug.join("/");
  const service = services.find((item) => servicePath(item.slug) === path);
  if (service) return { path, info: service, service };
  const infoPath = infoPaths.find((item) => item === path);
  if (!infoPath) notFound();
  return { path, info: pages[infoPath], service: undefined };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [...infoPaths, ...services.map(({ slug }) => servicePath(slug))]
    .map((path) => ({ slug: path.slice(1).split("/") }));
}

export async function generateMetadata({ params }: Route) {
  const { path, info } = getPage((await params).slug);
  return pageMetadata(path, info.title, info.description);
}

export default async function ContentPage({ params }: Route) {
  const { path, info, service } = getPage((await params).slug);
  const structured = [breadcrumb(path, info.title, Boolean(service))];
  if (service) {
    const campaign = campaignForService(service.slug);
    return <>
      <JsonLd data={[...structured, {
        "@type": "Service", name: service.title, description: service.description,
        url: absolute(path), areaServed: markets, provider: organisation,
      }]} />
      <PageIntro title={service.title} intro={service.intro} />
      <div className="shell article-grid">
        <section className="reading">
          <h2>What you can create</h2>
          <ul>{service.uses.map((use) => <li key={use}>{use}</li>)}</ul>
          <h2>How we make it</h2><p>{service.approach}</p>
          <h2>{service.faq.question}</h2><p>{service.faq.answer}</p>
        </section>
        <aside className="aside-card">
          <div className={"aside-image campaign-" + campaign.tone}><Image src={campaign.asset} alt={campaign.alt} fill sizes="(max-width: 720px) 90vw, 34vw" /></div>
          <h2>Formats</h2><p>{service.formats}</p>
          <TextLink href={"/work#" + campaign.id}>See the studio concept</TextLink>
          <ButtonLink href={"/contact?service=" + service.slug}>Enquire about this service</ButtonLink>
        </aside>
      </div>
      <CallToAction />
    </>;
  }

  let content;
  switch (path) {
    case "/work":
      content = <>
        <PageIntro title="Selected concepts." intro="Explore how a single photograph can become a campaign." />
        <div className="shell project-list">
          {campaignConcepts.map((concept) => <article key={concept.id} id={concept.id} className="project-detail scroll-reveal">
            <CampaignComparison concept={concept} />
            <div className="project-copy">
              <h2>{concept.title}</h2>
              <p>{concept.direction}</p>
              <p>{concept.formats}</p>
              <TextLink href={servicePath(concept.service)}>View this service</TextLink>
            </div>
          </article>)}
          <h2 className="other-studies-heading">Motion studies</h2>
          {projects.map((project) => <article key={project.id} id={project.id} className="project-detail">
            <CreativePreview asset={project.asset} alt={project.alt} title={project.title} variant={project.id} />
            <div className="project-copy">
              <h2>{project.title}</h2>
              <p>{project.treatment}</p>
              <p>{project.formats}.</p>
              <TextLink href={servicePath(project.service)}>View this service</TextLink>
            </div>
          </article>)}
          <details className="work-credits">
            <summary>Photo credits</summary>
            <ul>
              <li><a href={heroStudy.creditUrl}>{heroStudy.credit}</a></li>
              {campaignConcepts.map((concept) => <li key={concept.id}><a href={concept.creditUrl}>{concept.credit}</a></li>)}
            </ul>
          </details>
        </div>
        <CallToAction />
      </>;
      break;
    case "/services":
      content = <>
        <PageIntro title="Creative from the assets you already own." intro="Give your website photography, product imagery and visual identity more ways to work. Choose a single deliverable or a coordinated set of campaign assets." />
        <section className="shell article-end" aria-labelledby="services-heading">
          <h2 className="sr-only" id="services-heading">Motionly services</h2><ServicesGrid />
        </section>
        <CallToAction />
      </>;
      break;
    case "/how-it-works":
      content = <>
        <PageIntro title="From first look to final edit." intro="Start with your site, the images you have and what you want the work to achieve. We guide the creative from there." />
        <section className="shell article-end" aria-labelledby="process-heading">
          <h2 className="sr-only" id="process-heading">The creative process</h2><Steps />
        </section>
        <ProductionJourney />
        <section className="shell reading article-end process-notes"><h2>What should I prepare?</h2><p>A website link and a short brief are enough for the first conversation. Share your strongest photography, logo and brand guidelines once we agree the project direction.</p><h2>What can affect the result?</h2><p>Image resolution, lighting, angles and packaging detail influence the treatments we can use. We’ll flag anything that needs a different source image or creative approach before production.</p></section>
        <CallToAction />
      </>;
      break;
    case "/about":
      content = <>
        <PageIntro title="We read your brand. We create your content." intro={positioning} />
        <section className="shell reading article-end"><h2>Human creative direction</h2><p>We look at what makes your brand recognisable before developing a treatment. From story and pacing to packaging details and type, we review the work with your audience and intended use in mind.</p><h2>Work with us remotely</h2><p>Motionly works with businesses in New Zealand, Australia and South Africa. Briefing, feedback and delivery can all happen online.</p><TextLink href="/how-it-works">See our process</TextLink></section>
        <CallToAction />
      </>;
      break;
    case "/privacy":
      content = <>
        <PageIntro title="Privacy policy" intro="How Motionly handles project enquiries and website analytics." />
        <section className="shell reading article-end"><h2>What we collect</h2><p>The enquiry form asks for your name, email, business, project details and optionally your website, timeline and budget. A submission timestamp and referral source help us manage enquiries. We also use a short-lived, keyed identifier to limit automated submissions.</p><h2>How we use it</h2><p>We use enquiry details to review your brief, respond, prepare a scope and manage follow-up. Our hosting and database providers process information to operate the website and store enquiries.</p><h2>Website analytics</h2><p>We use Vercel Web Analytics to understand which pages people visit and how they find Motionly. Vercel processes page visits to provide traffic reports. <a href="https://vercel.com/docs/analytics/privacy-policy">Vercel Web Analytics privacy details</a>.</p><h2>Contact us about privacy</h2><p>Use the <Link href="/contact">contact form</Link> to ask about your information or request a correction or deletion.</p></section>
      </>;
      break;
    case "/terms":
      content = <>
        <PageIntro title="Website terms" intro="These terms cover browsing the Motionly website and sending an enquiry." />
        <section className="shell reading article-end"><h2>Project enquiries</h2><p>Sending an enquiry starts a conversation. Scope, pricing, timelines, revision rounds and usage rights will be agreed in writing before work begins.</p><h2>Brand assets</h2><p>Share assets you own or have permission to supply for creative production. Tell us about any restrictions or third-party licences that may affect how the work can be used.</p><h2>Portfolio material</h2><p>Items labelled studio concepts are illustrative creative treatments. Contact Motionly before reusing any studio concepts or media displayed on this website.</p></section>
      </>;
      break;
  }

  return <><JsonLd data={structured} />{content}</>;
}
