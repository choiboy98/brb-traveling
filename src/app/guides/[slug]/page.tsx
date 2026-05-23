import { Fragment } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { countries } from '@/app/components/countryExport';
import { guides } from '@/app/components/guideExport';
import JsonLd from '@/app/components/jsonLd';
import QuickTips from '@/app/components/quickTips';
import ShareButtons from '@/app/components/shareButtons';
import NewsletterSignup from '@/app/components/newsletterSignup';
import GiscusComments from '@/app/components/giscusComments';
import {
    absoluteUrl,
    breadcrumbJsonLd,
    displayName,
    formatDate,
    guideCoverPhoto,
    guideJsonLd,
    guideMetadata,
    guidePath,
    readTimeMinutes,
} from '@/app/lib/seo';
import '../../blog/blog.css';
import '../guides.css';

export function generateStaticParams() {
    return guides.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const guide = guides.find((g) => g.slug === params.slug);
    if (!guide) {
        return {};
    }
    const country = countries.find((c) => c.slug === guide.countrySlug);
    return guideMetadata(guide, country);
}

export default function GuidePage({ params }: { params: { slug: string } }) {
    const guide = guides.find((g) => g.slug === params.slug);
    if (!guide) {
        notFound();
    }

    const country = countries.find((c) => c.slug === guide.countrySlug);
    const countryName = country ? displayName(country) : '';
    const cover = guideCoverPhoto(guide, country);
    const allParagraphs = guide.sections.flatMap((s) => s.paragraphs);

    return (
        <main className="blog-page">
            <JsonLd data={guideJsonLd(guide, country)} />
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'Home', path: '/' },
                    { name: 'Travel journal', path: '/blog' },
                    { name: guide.title, path: guidePath(guide.slug) },
                ])}
            />

            <article className="blog-container">
                <Link href="/blog" className="blog-back">← All stories &amp; guides</Link>
                <p className="blog-eyebrow">Travel guide{countryName ? ` · ${countryName}` : ''}</p>
                <h1 className="guide-title">{guide.title}</h1>

                <p className="blog-meta">
                    {guide.date && <time dateTime={guide.date}>{formatDate(guide.date)}</time>}
                    {guide.updated && <span>Updated {formatDate(guide.updated)}</span>}
                    <span>{readTimeMinutes(allParagraphs)} min read</span>
                </p>

                {guide.sections.map((section, sectionIdx) => (
                    <Fragment key={sectionIdx}>
                        {section.heading && <h2 className="guide-section-heading">{section.heading}</h2>}
                        {section.paragraphs.map((para, paraIdx) => (
                            <p key={paraIdx} className="blog-paragraph">{para}</p>
                        ))}
                        {sectionIdx === 0 && guide.quickTips && guide.quickTips.length > 0 && (
                            <QuickTips tips={guide.quickTips} countryName={countryName || guide.title} />
                        )}
                    </Fragment>
                ))}

                {country && (
                    <section className="guide-trip" aria-label={`More from ${countryName}`}>
                        <h2 className="post-section-heading">From this trip</h2>
                        <div className="guide-trip-card">
                            {cover && (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img className="guide-trip-image" src={cover.src} alt={cover.alt} loading="lazy" />
                            )}
                            <div className="guide-trip-body">
                                <p className="guide-trip-text">
                                    This guide comes from my {countryName} trip — the full story and photo diary are here:
                                </p>
                                <div className="guide-trip-links">
                                    <Link href={`/blog/${country.slug}`} className="blog-photos-link">
                                        Read the {countryName} story →
                                    </Link>
                                    <Link href={`/photos/${country.slug}`} className="blog-photos-link">
                                        View the photos →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <ShareButtons
                    url={absoluteUrl(guidePath(guide.slug))}
                    title={`${guide.title} — brb-traveling`}
                />

                <NewsletterSignup />
                <GiscusComments />
            </article>
        </main>
    );
}
