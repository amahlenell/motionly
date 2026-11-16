import { EnquiryForm } from "@/components/enquiry-form";
import { JsonLd, PageIntro } from "@/components/site";
import { pages, services } from "@/lib/content";
import { breadcrumb, pageMetadata } from "@/lib/seo";
import { normaliseWebsite } from "@/lib/website";

export const metadata = pageMetadata("/contact", pages["/contact"].title, pages["/contact"].description);

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const source = query.source === "brand-discovery" ? "brand-discovery" : "contact";
  const website = typeof query.website === "string" && query.website.length <= 300 ? query.website.trim() : "";
  const service = services.find(({slug}) => slug === query.service)?.slug ?? "";

  return <>
    <JsonLd data={breadcrumb("/contact", "Contact")} />
    <PageIntro title={source === "brand-discovery" ? "Let’s explore your brand." : "Start a creative project."} intro="Tell us a little about your brand, what you have already and what you’d like to create. We’ll review your brief and get back to you by email." />
    <section className="shell contact-layout" aria-label="Project enquiry">
      <div className="reading contact-note"><h2>What happens next?</h2><p>We review your website and brief, identify what your existing assets can support and discuss a scope that suits the project.</p><p>Working remotely with businesses in New Zealand, Australia and South Africa.</p></div>
      <EnquiryForm source={source} website={normaliseWebsite(website) ?? website} service={service} />
    </section>
  </>;
}
