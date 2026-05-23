import { countries } from "@/app/components/countryExport";
import { guides } from "@/app/components/guideExport";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, AUTHOR_NAME } from "@/app/lib/site";
import { displayName, formatDate, sortedByDate, sortedGuidesByDate } from "@/app/lib/seo";

export const dynamic = "force-static";

export async function GET() {
    const posts = sortedByDate(countries)
        .map((country) => {
            const name = displayName(country);
            const tips = country.quickTips
                .map((t) => `  - ${t.label}: ${t.tip}`)
                .join("\n");
            return `### ${name}${country.date ? ` (${formatDate(country.date)})` : ""}

${country.excerpt}

- Blog post: ${SITE_URL}/blog/${country.slug}
- Photo gallery: ${SITE_URL}/photos/${country.slug}
${tips ? `- Quick tips:\n${tips}` : ""}`;
        })
        .join("\n\n");

    const guideEntries = sortedGuidesByDate(guides)
        .map((guide) => {
            const country = countries.find((c) => c.slug === guide.countrySlug);
            const tips = (guide.quickTips ?? [])
                .map((t) => `  - ${t.label}: ${t.tip}`)
                .join("\n");
            return `### ${guide.title}${guide.date ? ` (${formatDate(guide.updated ?? guide.date)})` : ""}

${guide.excerpt}

- Guide: ${SITE_URL}/guides/${guide.slug}
${country ? `- Related trip: ${displayName(country)} — ${SITE_URL}/blog/${country.slug}` : ""}
${tips ? `- Quick tips:\n${tips}` : ""}`;
        })
        .join("\n\n");

    const text = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

A personal travel blog by ${AUTHOR_NAME}. Each destination has a written travel journal entry
with practical tips and a photo gallery.

## Pages

- Home: ${SITE_URL}
- Travel journal (all posts): ${SITE_URL}/blog
- RSS feed: ${SITE_URL}/rss.xml
- Sitemap: ${SITE_URL}/sitemap.xml

## Destinations

${posts}

## Travel guides

${guideEntries}
`;

    return new Response(text, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
}
