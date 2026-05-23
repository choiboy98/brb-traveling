import Link from 'next/link';
import { notFound } from 'next/navigation';
import { countries } from '@/app/components/countryExport';
import '../photos.css';

export function generateStaticParams() {
    return countries.map((c) => ({ country: c.slug }));
}

export const dynamicParams = false;

export default function PhotosPage({ params }: { params: { country: string } }) {
    const country = countries.find((c) => c.slug === params.country);
    if (!country) {
        notFound();
    }

    return (
        <main className="photos-page">
            <header className="photos-header">
                <Link href="/" className="photos-back">← Back</Link>
                <p className="photos-eyebrow">Photos from</p>
                <h1 className="photos-title">{country.title}</h1>
            </header>

            {country.photos.length > 0 ? (
                <div className="photos-grid">
                    {country.photos.map((photo, idx) => (
                        <div key={idx} className="photos-tile">
                            {/* Plain <img>: static export to GitHub Pages doesn't
                                support next/image's optimization runtime, and
                                these are user-provided travel photos served from
                                /public. */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={photo.src} alt={photo.alt} loading="lazy" />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="photos-missing">No photos yet for {country.title}.</p>
            )}
        </main>
    );
}
