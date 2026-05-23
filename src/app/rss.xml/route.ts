import { countries } from "@/app/components/countryExport";
import { guides } from "@/app/components/guideExport";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, AUTHOR_NAME } from "@/app/lib/site";
import { displayName } from "@/app/lib/seo";

export const dynamic = "force-static";

function escapeXml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export async function GET() {
    const feedItems = [
        ...countries.map((country) => ({
            title: `${displayName(country)} travel notes`,
            url: `${SITE_URL}/blog/${country.slug}`,
            description: country.excerpt,
            date: country.date,
        })),
        ...guides.map((guide) => ({
            title: guide.title,
            url: `${SITE_URL}/guides/${guide.slug}`,
            description: guide.excerpt,
            date: guide.date,
        })),
    ].sort((a, b) => (a.date < b.date ? 1 : -1));

    const items = feedItems
        .map((item) => {
            const pubDate = item.date
                ? new Date(`${item.date}T00:00:00Z`).toUTCString()
                : "";
            return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <description>${escapeXml(item.description)}</description>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
    </item>`;
        })
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <managingEditor>${escapeXml(AUTHOR_NAME)}</managingEditor>
${items}
  </channel>
</rss>
`;

    return new Response(xml, {
        headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
}
