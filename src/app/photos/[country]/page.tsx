import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { countries } from '@/app/components/countryExport';
import JsonLd from '@/app/components/jsonLd';
import PhotoGallery from '@/app/components/photoGallery';
import {
    breadcrumbJsonLd,
    displayName,
    imageGalleryJsonLd,
    photosMetadata,
} from '@/app/lib/seo';
import '../photos.css';

export function generateStaticParams() {
    return countries.map((c) => ({ country: c.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { country: string } }): Metadata {
    const country = countries.find((c) => c.slug === params.country);
    if (!country) {
        return {};
    }
    return photosMetadata(country);
}

export default function PhotosPage({ params }: { params: { country: string } }) {
    const country = countries.find((c) => c.slug === params.country);
    if (!country) {
        notFound();
    }

    const name = displayName(country);

    return (
        <main className="photos-page">
            <JsonLd data={imageGalleryJsonLd(country)} />
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'Home', path: '/' },
                    { name: 'Travel journal', path: '/blog' },
                    { name: `${name} photos`, path: `/photos/${country.slug}` },
                ])}
            />

            <header className="photos-header">
                <Link href="/" className="photos-back">← Back</Link>
                <p className="photos-eyebrow">Photos from</p>
                <h1 className="photos-title">{country.title}</h1>
                <Link href={`/blog/${country.slug}`} className="photos-blog-link">
                    Read the {name} story →
                </Link>
            </header>

            {country.photos.length > 0 ? (
                <PhotoGallery photos={country.photos} countryName={name} />
            ) : (
                <p className="photos-missing">No photos yet for {country.title}.</p>
            )}
        </main>
    );
}
