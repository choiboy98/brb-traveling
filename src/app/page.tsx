import type { Metadata } from 'next';
import Link from 'next/link';

import './landing.css';
import LandingHero from './components/landingHero';
import JsonLd from './components/jsonLd';
import { countries } from './components/countryExport';
import { displayName, formatDate, readTimeMinutes, sortedByDate, webSiteJsonLd } from './lib/seo';
import { SITE_DESCRIPTION } from './lib/site';

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <LandingHero />

      <section id="destinations" className="destinations" aria-labelledby="destinations-heading">
        <div className="destinations-inner">
          <p className="destinations-eyebrow">Travel journal</p>
          <h2 id="destinations-heading" className="destinations-heading">Destinations</h2>
          <p className="destinations-intro">
            Field notes, practical tips, and photo diaries from every stop so far.
            Pick a country to read the story or browse the gallery.
          </p>

          <div className="destinations-grid">
            {sortedByDate(countries).map((country) => (
              <article key={country.slug} className="destination-card">
                <Link href={`/blog/${country.slug}`} className="destination-card-imagewrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="destination-card-image"
                    src={country.coverPhoto?.src}
                    alt={country.coverPhoto?.alt ?? displayName(country)}
                    loading="lazy"
                  />
                </Link>
                <div className="destination-card-body">
                  <h3 className="destination-card-title">{displayName(country)}</h3>
                  <p className="destination-card-meta">
                    {country.date && <span>{formatDate(country.date)}</span>}
                    <span>{readTimeMinutes(country.blog)} min read</span>
                  </p>
                  <p className="destination-card-excerpt">{country.excerpt}</p>
                  <div className="destination-card-links">
                    <Link href={`/blog/${country.slug}`} className="destination-card-link">
                      Read the blog →
                    </Link>
                    <Link href={`/photos/${country.slug}`} className="destination-card-link">
                      View photos →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Link href="/blog" className="destinations-all-link">
            Read the full journal →
          </Link>
        </div>
      </section>
    </>
  )
}
