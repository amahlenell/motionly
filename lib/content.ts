export const name = "Motionly";
export const positioning = "Motionly is a creative studio that turns your existing photography and brand assets into promotional videos, social media content and seasonal campaigns. We use AI-assisted production with human creative direction and quality control.";
export const markets = ["New Zealand", "Australia", "South Africa"];

export const services = [
  {
    slug: "ai-promotional-videos",
    title: "AI promotional videos",
    label: "Promotional film",
    description: "Turn existing product photography and brand assets into human-directed promotional films for websites, launches and short-form ads.",
    intro: "Give your best photography a second life. We take existing product and brand imagery and develop a short film with a clear message, considered pacing and a visual treatment that feels like your brand.",
    uses: ["Product launches and hero films", "E-commerce and landing page video", "Short cutdowns for paid and organic social"],
    approach: "We review your assets, outline a concept and choose the shots that can support it. We then develop the edit with attention to product detail, colour, typography and the shape of the story.",
    formats: "Landscape, vertical and square edits as agreed in the brief.",
    faq: { question: "Can you make a promotional video from product photos?", answer: "Yes. Sharp, well-lit product photographs can provide the starting point for a short film. We review the angles, labels and brand details first so we can choose a treatment that respects the source assets." },
    project: "amber-ritual",
  },
  {
    slug: "social-media-content",
    title: "Branded social media content",
    label: "Social creative",
    description: "Create coordinated, brand-consistent short videos and stills for social media from the photography and identity you already have.",
    intro: "Give your product story a visual language that carries through the feed. We create a coordinated set of short videos, stills and platform-specific crops from the photography, messaging and identity you already have.",
    uses: ["Reels and other vertical placements", "Feed stills, carousels and product features", "Creative variants for paid social"],
    approach: "We identify your core message and decide which placements deserve their own composition. We keep type, colour and product detail coherent across the set so each piece can work on its own or as part of a campaign.",
    formats: "Vertical clips, square or portrait imagery and agreed placement-specific crops.",
    faq: { question: "What assets do you need for branded social content?", answer: "Start with your website, the product or message you want to highlight, and the best imagery you have. Logos, brand guidelines and examples of past content help us carry your visual identity across formats." },
    project: "slow-mornings",
  },
  {
    slug: "seasonal-marketing-campaigns",
    title: "Seasonal marketing campaigns",
    label: "Campaign creative",
    description: "Bring seasonal promotions and product launches together with one creative direction across video, social and web assets.",
    intro: "Build a cohesive creative set for a product launch, an important date or a seasonal offer. We develop a shared idea and adapt it into the visual formats your campaign needs.",
    uses: ["Seasonal collections and limited releases", "Product launch and offer campaigns", "Coordinated website, paid and organic social creative"],
    approach: "We start with the audience, offer and key dates. A shared visual direction gives the campaign a recognisable look while each asset is composed for the job and channel it serves.",
    formats: "A mix of campaign film, short social edits and stills, scoped by placement.",
    faq: { question: "How does campaign approval work?", answer: "We agree the direction and deliverable list up front. You review the first presentation and provide feedback, then approve the refined assets before final delivery." },
    project: "table-in-season",
  },
] as const;

export const projects = [
  {
    id: "amber-ritual",
    title: "Amber Ritual",
    category: "Product film",
    alt: "Amber perfume bottle on travertine in angled sunlight",
    asset: "/media/amber.webp",
    treatment: "Bring out the warm glass and textured stone with a slow push-in and an understated title reveal.",
    formats: "Landscape product film and portrait cutdown",
    service: "ai-promotional-videos",
  },
  {
    id: "slow-mornings",
    title: "Slow Mornings",
    category: "Social creative",
    alt: "Ivory coffee pouch and a ceramic cup on warm linen",
    asset: "/media/coffee.webp",
    treatment: "Move gently through a coffee still life and use a short headline to frame a vertical social spot.",
    formats: "9:16 social clip and 4:5 feed still",
    service: "social-media-content",
  },
  {
    id: "table-in-season",
    title: "The Table in Season",
    category: "Seasonal campaign",
    alt: "Olive oil bottle and ceramic tableware against a moss-green background",
    asset: "/media/olive.webp",
    treatment: "Use a single olive-toned still life as the basis for a campaign look, with a slow pullback to reveal the styling.",
    formats: "Landscape campaign film, square and portrait campaign stills",
    service: "seasonal-marketing-campaigns",
  },
] as const;

export const steps = [
  { title: "Share your brand", text: "Send your website, the outcome you’re after and any existing visuals you want us to use." },
  { title: "Agree a direction", text: "We review your assets and propose a creative concept, formats and scope for you to approve." },
  { title: "Review the creative", text: "We produce the first edit or set and refine it with your feedback." },
  { title: "Get your files", text: "Approve the finished work and receive the agreed files ready for your channels." },
];

export const pages = {
  "/": { title: "AI-assisted creative studio", description: "Motionly turns your existing brand assets into promotional videos, branded social media content and seasonal campaigns with human creative direction." },
  "/work": { title: "Creative concepts and portfolio", description: "See how Motionly turns product imagery into concept films, branded social creative and seasonal campaign assets." },
  "/services": { title: "Creative production services", description: "Explore AI-assisted promotional videos, branded social media content and seasonal creative campaigns from Motionly." },
  "/how-it-works": { title: "How the creative process works", description: "See how Motionly reviews your existing assets, develops a creative direction and delivers approved videos and campaign content." },
  "/about": { title: "About the studio", description: "Meet Motionly, a done-for-you creative content studio combining AI-assisted production and human creative direction." },
  "/contact": { title: "Start a creative project", description: "Tell Motionly about your brand, existing assets and the content you need. Enquire about videos, social creative or campaign production." },
  "/privacy": { title: "Privacy policy", description: "How Motionly handles information supplied through a project enquiry." },
  "/terms": { title: "Website terms", description: "Terms for using the Motionly website, submitting an enquiry and viewing concept work." },
} as const;

export const servicePath = (slug: string) => "/services/" + slug;
export const publicPaths = [...Object.keys(pages), ...services.map(({slug}) => servicePath(slug))];

export const campaignConcepts = [
  {
    id: "daily-ritual",
    title: "The Daily Ritual",
    category: "Beauty & skincare",
    asset: "/media/beauty-editorial.webp",
    alt: "Hands holding a green glass dropper bottle",
    headline: "A moment for yourself.",
    source: "A close product photograph with naturally lit hands and green glass.",
    direction: "Use an intimate crop and deep green tonal grading to bring the texture and routine into focus.",
    formats: "Skincare launch ad, vertical reel or product-page hero.",
    service: "ai-promotional-videos",
    tone: "beauty",
    credit: "Maria Lupan",
    creditUrl: "https://unsplash.com/photos/a-person-holding-a-bottle-of-essential-oil-in-their-hands-TczKr5LWuJ0",
  },
  {
    id: "room-for-light",
    title: "A Room for Light",
    category: "Homeware & interiors",
    asset: "/media/interiors-editorial.webp",
    alt: "Wooden chairs and a table caught in warm sunlight",
    headline: "Make room for slow mornings.",
    source: "A sunlit interior with a table and wooden chairs.",
    direction: "Frame the light and timber as part of a lived-in setting. Carry that warmth into the type, pacing and wider campaign.",
    formats: "Collection page hero, seasonal social placement or display ad.",
    service: "seasonal-marketing-campaigns",
    tone: "interiors",
    credit: "Seyed Amir Mohammad Tabatabaee",
    creditUrl: "https://unsplash.com/photos/wooden-chairs-and-a-table-bathed-in-warm-sunlight-26648RNXUK0",
  },
  {
    id: "beyond-the-dunes",
    title: "Beyond the Dunes",
    category: "Fashion & lifestyle",
    asset: "/media/lifestyle-editorial.webp",
    alt: "A woman in a blue dress walking across sand dunes",
    headline: "Made for the long way.",
    source: "An outdoor lifestyle photograph with sand, sky and a figure in motion.",
    direction: "Let the scale of the dunes set the pace and balance the cool blue dress with warm sand and editorial type.",
    formats: "Fashion launch creative, social reel or lookbook opener.",
    service: "social-media-content",
    tone: "lifestyle",
    credit: "Katerina Kerdi",
    creditUrl: "https://unsplash.com/photos/woman-walking-on-sand-dunes-during-daytime-_OyMf5BbAxA",
  },
] as const;

export const heroStudy = {
  asset: "/media/hero-editorial.webp",
  alt: "A hand holding a small glass bottle in silhouette",
  headline: "A quieter kind of ritual.",
  credit: "Marco Palumbo",
  creditUrl: "https://unsplash.com/photos/a-silhouette-holds-a-bottle-of-serum-mkJ35YDCImM",
} as const;

export function campaignForService(slug: string) {
  return campaignConcepts.find((concept) => concept.service === slug) ?? campaignConcepts[0];
}
