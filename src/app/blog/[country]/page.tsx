import { Fragment } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { countries } from '@/app/components/countryExport';
import { guidesForCountry } from '@/app/components/guideExport';
import JsonLd from '@/app/components/jsonLd';
import QuickTips from '@/app/components/quickTips';
import ShareButtons from '@/app/components/shareButtons';
import NewsletterSignup from '@/app/components/newsletterSignup';
import GiscusComments from '@/app/components/giscusComments';
import {
    absoluteUrl,
    blogPostMetadata,
    blogPostingJsonLd,
    breadcrumbJsonLd,
    displayName,
    formatDate,
    readTimeMinutes,
    sortedByDate,
} from '@/app/lib/seo';
import '../blog.css';

export function generateStaticParams() {
    return countries.map((c) => ({ country: c.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { country: string } }): Metadata {
    const country = countries.find((c) => c.slug === params.country);
    if (!country) {
        return {};
    }
    return blogPostMetadata(country);
}

export default function BlogPage({ params }: { params: { country: string } }) {
    const country = countries.find((c) => c.slug === params.country);
    if (!country) {
        notFound();
    }

    const name = displayName(country);
    const posts = sortedByDate(countries);
    const index = posts.findIndex((c) => c.slug === country.slug);
    const newerPost = index > 0 ? posts[index - 1] : null;
    const olderPost = index < posts.length - 1 ? posts[index + 1] : null;
    const teaserPhotos = country.photos.slice(0, 3);
    const tipsAfterIndex = Math.min(1, country.blog.length - 1);
    const relatedGuides = guidesForCountry(country.slug);

    return (
        <main className="blog-page">
            <JsonLd data={blogPostingJsonLd(country)} />
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'Home', path: '/' },
                    { name: 'Travel journal', path: '/blog' },
                    { name, path: `/blog/${country.slug}` },
                ])}
            />

            <article className="blog-container">
                <Link href="/blog" className="blog-back">← All stories</Link>
                <p className="blog-eyebrow">Field notes from</p>
                <h1 className="blog-title">{country.title}</h1>

                <p className="blog-meta">
                    {country.date && <time dateTime={country.date}>{formatDate(country.date)}</time>}
                    <span>{readTimeMinutes(country.blog)} min read</span>
                </p>

                {country.blog.length > 0 ? (
                    country.blog.map((para, idx) => (
                        <Fragment key={idx}>
                            <p className="blog-paragraph">{para}</p>
                            {idx === tipsAfterIndex && (
                                <QuickTips tips={country.quickTips} countryName={name} />
                            )}
                        </Fragment>
                    ))
                ) : (
                    <p className="blog-missing">No blog content yet for {country.title}.</p>
                )}

                {teaserPhotos.length > 0 && (
                    <section className="blog-photo-teaser" aria-label={`Photos from ${name}`}>
                        <h2 className="post-section-heading">From the camera roll</h2>
                        <div className="blog-photo-teaser-grid">
                            {teaserPhotos.map((photo) => (
                                <Link key={photo.src} href={`/photos/${country.slug}`} className="blog-photo-teaser-tile">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={photo.src} alt={photo.alt} loading="lazy" />
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                <Link href={`/photos/${country.slug}`} className="blog-photos-link">
                    See all the photos →
                </Link>

                {relatedGuides.length > 0 && (
                    <section className="related-guides" aria-label={`Travel guides for ${name}`}>
                        <h2 className="post-section-heading">Planning a trip to {name}?</h2>
                        <ul className="related-guides-list">
                            {relatedGuides.map((guide) => (
                                <li key={guide.slug}>
                                    <Link href={`/guides/${guide.slug}`} className="related-guide-link">
                                        <span className="related-guide-title">{guide.title}</span>
                                        <span className="related-guide-excerpt">{guide.excerpt}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                <ShareButtons
                    url={absoluteUrl(`/blog/${country.slug}`)}
                    title={`${name} travel notes — brb-traveling`}
                />

                <nav className="post-nav" aria-label="More stories">
                    {olderPost ? (
                        <Link href={`/blog/${olderPost.slug}`} className="post-nav-card">
                            <span className="post-nav-label">← Older story</span>
                            <span className="post-nav-title">{displayName(olderPost)}</span>
                        </Link>
                    ) : <span />}
                    {newerPost ? (
                        <Link href={`/blog/${newerPost.slug}`} className="post-nav-card next">
                            <span className="post-nav-label">Newer story →</span>
                            <span className="post-nav-title">{displayName(newerPost)}</span>
                        </Link>
                    ) : <span />}
                </nav>

                <NewsletterSignup />
                <GiscusComments />
            </article>
        </main>
    );
}
