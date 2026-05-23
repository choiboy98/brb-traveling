import type { Metadata } from "next";
import { Country } from "@/app/components/country";
import { Guide } from "@/app/components/guide";
import {
    SITE_URL,
    SITE_NAME,
    SITE_DESCRIPTION,
    AUTHOR_NAME,
    DEFAULT_OG_IMAGE,
} from "./site";

export function absoluteUrl(path: string): string {
    return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function blogPath(slug: string): string {
    return `/blog/${slug}`;
}

export function photosPath(slug: string): string {
    return `/photos/${slug}`;
}

export function guidePath(slug: string): string {
    return `/guides/${slug}`;
}

/** "ICELAND" -> "Iceland" */
export function displayName(country: Country): string {
    const t = country.title.toLowerCase();
    return t.charAt(0).toUpperCase() + t.slice(1);
}

export function formatDate(iso: string): string {
    if (!iso) return "";
    const date = new Date(`${iso}T00:00:00`);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function readTimeMinutes(blog: string[]): number {
    const words = blog.join(" ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
}

export function sortedByDate(countries: Country[]): Country[] {
    return [...countries].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function sortedGuidesByDate(guides: Guide[]): Guide[] {
    return [...guides].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function guideCoverPhoto(guide: Guide, country: Country | undefined) {
    return guide.coverPhoto ?? country?.coverPhoto ?? null;
}

function ogImage(country: Country): string {
    return absoluteUrl(country.coverPhoto?.src ?? DEFAULT_OG_IMAGE);
}

export function blogPostMetadata(country: Country): Metadata {
    const name = displayName(country);
    const path = blogPath(country.slug);
    return {
        title: `${name} travel notes`,
        description: country.excerpt,
        alternates: { canonical: path },
        openGraph: {
            type: "article",
            title: `${name} travel notes — ${SITE_NAME}`,
            description: country.excerpt,
            url: path,
            siteName: SITE_NAME,
            publishedTime: country.date || undefined,
            authors: [AUTHOR_NAME],
            images: [{ url: ogImage(country), alt: country.coverPhoto?.alt ?? name }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${name} travel notes — ${SITE_NAME}`,
            description: country.excerpt,
            images: [ogImage(country)],
        },
    };
}

export function photosMetadata(country: Country): Metadata {
    const name = displayName(country);
    const path = photosPath(country.slug);
    const description = `Photo gallery from ${name} — ${country.photos.length} photos from the trip.`;
    return {
        title: `${name} photos`,
        description,
        alternates: { canonical: path },
        openGraph: {
            type: "website",
            title: `${name} photos — ${SITE_NAME}`,
            description,
            url: path,
            siteName: SITE_NAME,
            images: [{ url: ogImage(country), alt: country.coverPhoto?.alt ?? name }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${name} photos — ${SITE_NAME}`,
            description,
            images: [ogImage(country)],
        },
    };
}

export function guideMetadata(guide: Guide, country: Country | undefined): Metadata {
    const path = guidePath(guide.slug);
    const cover = guideCoverPhoto(guide, country);
    const image = absoluteUrl(cover?.src ?? DEFAULT_OG_IMAGE);
    return {
        title: guide.title,
        description: guide.excerpt,
        alternates: { canonical: path },
        openGraph: {
            type: "article",
            title: `${guide.title} — ${SITE_NAME}`,
            description: guide.excerpt,
            url: path,
            siteName: SITE_NAME,
            publishedTime: guide.date || undefined,
            modifiedTime: guide.updated ?? guide.date ?? undefined,
            authors: [AUTHOR_NAME],
            images: [{ url: image, alt: cover?.alt ?? guide.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${guide.title} — ${SITE_NAME}`,
            description: guide.excerpt,
            images: [image],
        },
    };
}

export function guideJsonLd(guide: Guide, country: Country | undefined) {
    const cover = guideCoverPhoto(guide, country);
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: guide.title,
        description: guide.excerpt,
        url: absoluteUrl(guidePath(guide.slug)),
        datePublished: guide.date || undefined,
        dateModified: guide.updated ?? guide.date ?? undefined,
        image: absoluteUrl(cover?.src ?? DEFAULT_OG_IMAGE),
        author: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
        publisher: { "@type": "Person", name: AUTHOR_NAME },
        mainEntityOfPage: absoluteUrl(guidePath(guide.slug)),
        ...(country
            ? { about: { "@type": "Country", name: displayName(country) } }
            : {}),
    };
}

export function webSiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        author: { "@type": "Person", name: AUTHOR_NAME },
    };
}

export function blogJsonLd(countries: Country[]) {
    return {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: `${SITE_NAME} travel journal`,
        url: absoluteUrl("/blog"),
        description: SITE_DESCRIPTION,
        author: { "@type": "Person", name: AUTHOR_NAME },
        blogPost: countries.map((c) => ({
            "@type": "BlogPosting",
            headline: `${displayName(c)} travel notes`,
            url: absoluteUrl(blogPath(c.slug)),
            datePublished: c.date || undefined,
        })),
    };
}

export function blogPostingJsonLd(country: Country) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: `${displayName(country)} travel notes`,
        description: country.excerpt,
        url: absoluteUrl(blogPath(country.slug)),
        datePublished: country.date || undefined,
        image: ogImage(country),
        author: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
        publisher: { "@type": "Person", name: AUTHOR_NAME },
        mainEntityOfPage: absoluteUrl(blogPath(country.slug)),
        about: { "@type": "Country", name: displayName(country) },
    };
}

export function imageGalleryJsonLd(country: Country) {
    return {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        name: `${displayName(country)} photos`,
        url: absoluteUrl(photosPath(country.slug)),
        author: { "@type": "Person", name: AUTHOR_NAME },
        image: country.photos.map((p) => ({
            "@type": "ImageObject",
            contentUrl: absoluteUrl(p.src),
            description: p.alt,
        })),
    };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}
