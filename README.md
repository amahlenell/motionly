# Motionly

Phase 1 website for Motionly, a done-for-you AI-assisted creative studio.

## Develop and check

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
npm run build
npm run typecheck
```

The work page shows three editorial campaign concepts from credited, licensed photographs, alongside the original generated-image motion studies. The comparisons show an original photograph and a static art-direction concept. Examples are labelled throughout.

## Brand and photography

Use the original SVGs in `public/brand/` for the colour wordmark, forest ink and white variants, compact ribbon symbol and social avatar. Use `motionly-avatar.png` for social platforms that need an upload-ready 512 × 512 image. The favicon uses the same ribbon mark.

Editorial photography is distributed under the [Unsplash License](https://unsplash.com/license).

| Asset | Photographer |
| --- | --- |
| Hero studio concept | [Marco Palumbo](https://unsplash.com/photos/a-silhouette-holds-a-bottle-of-serum-mkJ35YDCImM) |
| Beauty studio concept | [Maria Lupan](https://unsplash.com/photos/a-person-holding-a-bottle-of-essential-oil-in-their-hands-TczKr5LWuJ0) |
| Interiors studio concept | [Seyed Amir Mohammad Tabatabaee](https://unsplash.com/photos/wooden-chairs-and-a-table-bathed-in-warm-sunlight-26648RNXUK0) |
| Fashion studio concept | [Katerina Kerdi](https://unsplash.com/photos/woman-walking-on-sand-dunes-during-daytime-_OyMf5BbAxA) |

## Enquiries

1. Apply `supabase/migrations/202611170001_enquiries.sql` to the Motionly Supabase project.
2. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (legacy service role JWT) and `ENQUIRY_RATE_LIMIT_SECRET` (an independent random secret) as server-side environment variables. See `.env.example`.
3. Submit a test enquiry on the deployed host and confirm it appears in `public.motionly_enquiries`. The site reads the originating address from Vercel’s `x-vercel-forwarded-for` header. Use a trusted equivalent at the ingress if changing hosts.

Enquiries are written to Supabase for human review. The API confirms receipt after a successful write and reports an unavailable service if storage is missing. The database applies the rate limit and inserts the enquiry in the same transaction.

## Launch and search

Set `SITE_URL` to the final HTTPS origin and review the privacy and terms copy against the live business and data-handling details. Verify the domain with Google Search Console and Bing Webmaster Tools, optionally set their verification tokens, then submit `/sitemap.xml`. Check live canonicals, `/robots.txt`, Open Graph cards, service JSON-LD and the actual enquiry flow. Vercel previews intentionally block indexing. No tracking scripts or credentials are included.

Before launch, verify mobile layouts and run Lighthouse on the homepage, one service page and the enquiry page.
