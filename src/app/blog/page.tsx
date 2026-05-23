import type { Metadata } from 'next';
import Link from 'next/link';

import './blog.css';
import './blogIndex.css';
import JsonLd from '@/app/components/jsonLd';
import { countries } from '@/app/components/countryExport';
import { guides } from '@/app/components/guideExport';
import {
    blogJsonLd,
    breadcrumbJsonLd,
    displayName,
    formatDate,
    guideCoverPhoto,
    readTimeMinutes,
    sortedByDate,
    sortedGuidesByDate,
} from '@/app/lib/seo';
import { SITE_NAME } from '@/app/lib/site';

export const metadata: Metadata = {
    title: 'Travel journal',
    description:
        'All travel journal entries — field notes, practical tips, and photo diaries from Iceland, Finland, Norway, Taiwan, China, and Korea.',
    alternates: { canonical: '/blog' },
    openGraph: {
        title: `Travel journal — ${SITE_NAME}`,
        description:
            'All travel journal entries — field notes, practical tips, and photo diaries from every destination.',
        url: '/blog',
        type: 'website',
    },
};

export default function BlogIndexPage() {
    const posts = sortedByDate(countries);
    const guidePosts = sortedGuidesByDate(guides);

    return (
        <main className="blog-index-page">
            <JsonLd data={blogJsonLd(countries)} />
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'Home', path: '/' },
                    { name: 'Travel journal', path: '/blog' },
                ])}
            />

            <div className="blog-index-container">
                <Link href="/" className="blog-back">← Home</Link>
                <p className="blog-eyebrow">The travel journal</p>
                <h1 className="blog-index-title">Stories from the road</h1>
                <p className="blog-index-intro">
                    Field notes from every trip — what was worth it, what I&apos;d skip, and the
                    tips I wish someone had told me before landing.
                </p>

                <div className="blog-index-list">
                    {posts.map((country) => (
                        <article key={country.slug} className="post-card">
                            <Link href={`/blog/${country.slug}`} className="post-card-imagewrap">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="post-card-image"
                                    src={country.coverPhoto?.src}
                                    alt={country.coverPhoto?.alt ?? displayName(country)}
                                    loading="lazy"
                                />
                            </Link>
                            <div className="post-card-body">
                                <p className="post-card-meta">
                                    {country.date && <span>{formatDate(country.date)}</span>}
                                    <span>{readTimeMinutes(country.blog)} min read</span>
                                </p>
                                <h2 className="post-card-title">
                                    <Link href={`/blog/${country.slug}`}>{displayName(country)}</Link>
                                </h2>
                                <p className="post-card-tagline">{country.titleText}</p>
                                <p className="post-card-excerpt">{country.excerpt}</p>
                                <div className="post-card-links">
                                    <Link href={`/blog/${country.slug}`} className="post-card-link">
                                        Read the story →
                                    </Link>
                                    <Link href={`/photos/${country.slug}`} className="post-card-link secondary">
                                        Photos →
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {guidePosts.length > 0 && (
                    <section className="guides-section" aria-labelledby="guides-heading">
                        <p className="blog-eyebrow">Plan your own trip</p>
                        <h2 id="guides-heading" className="guides-heading">Travel guides</h2>
                        <p className="guides-intro">
                            The practical companions to the stories above — itineraries, routes, and
                            the logistics I wish I&apos;d known in advance.
                        </p>

                        <div className="guides-grid">
                            {guidePosts.map((guide) => {
                                const country = countries.find((c) => c.slug === guide.countrySlug);
                                const cover = guideCoverPhoto(guide, country);
                                const paragraphs = guide.sections.flatMap((s) => s.paragraphs);
                                return (
                                    <article key={guide.slug} className="guide-card">
                                        <Link href={`/guides/${guide.slug}`} className="guide-card-imagewrap">
                                            {cover && (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img
                                                    className="guide-card-image"
                                                    src={cover.src}
                                                    alt={cover.alt}
                                                    loading="lazy"
                                                />
                                            )}
                                        </Link>
                                        <div className="guide-card-body">
                                            <p className="post-card-meta">
                                                {country && <span>{displayName(country)}</span>}
                                                {guide.date && <span>{formatDate(guide.date)}</span>}
                                                <span>{readTimeMinutes(paragraphs)} min read</span>
                                            </p>
                                            <h3 className="guide-card-title">
                                                <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                                            </h3>
                                            <p className="guide-card-excerpt">{guide.excerpt}</p>
                                            <Link href={`/guides/${guide.slug}`} className="post-card-link">
                                                Read the guide →
                                            </Link>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
