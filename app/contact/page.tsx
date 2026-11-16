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
    <div className="contact-page">
    <PageIntro title={source === "brand-discovery" ? "Let’s explore your brand." : "Start a creative project."} intro="Tell us what you’d like to create. We’ll reply by email." />
    <section className="shell contact-layout" aria-label="Project enquiry">
      <EnquiryForm source={source} website={normaliseWebsite(website) ?? website} service={service} />
    </section>
    </div>
  </>;
}
