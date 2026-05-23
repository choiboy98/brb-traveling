import type { MetadataRoute } from "next";
import { countries } from "@/app/components/countryExport";
import { guides } from "@/app/components/guideExport";
import { SITE_URL } from "@/app/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const latest = [
        ...countries.map((c) => c.date),
        ...guides.map((g) => g.updated ?? g.date),
    ]
        .filter(Boolean)
        .sort()
        .at(-1);

    const entries: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified: latest ? new Date(latest) : new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${SITE_URL}/blog`,
            lastModified: latest ? new Date(latest) : new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
    ];

    for (const country of countries) {
        const lastModified = country.date ? new Date(country.date) : new Date();
        entries.push(
            {
                url: `${SITE_URL}/blog/${country.slug}`,
                lastModified,
                changeFrequency: "yearly",
                priority: 0.8,
            },
            {
                url: `${SITE_URL}/photos/${country.slug}`,
                lastModified,
                changeFrequency: "yearly",
                priority: 0.6,
            },
        );
    }

    for (const guide of guides) {
        const guideDate = guide.updated ?? guide.date;
        entries.push({
            url: `${SITE_URL}/guides/${guide.slug}`,
            lastModified: guideDate ? new Date(guideDate) : new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        });
    }

    return entries;
}
