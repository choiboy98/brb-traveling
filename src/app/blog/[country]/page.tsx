import Link from 'next/link';
import { notFound } from 'next/navigation';
import { countries } from '@/app/components/countryExport';
import '../blog.css';

export function generateStaticParams() {
    return countries.map((c) => ({ country: c.slug }));
}

export const dynamicParams = false;

export default function BlogPage({ params }: { params: { country: string } }) {
    const country = countries.find((c) => c.slug === params.country);
    if (!country) {
        notFound();
    }

    return (
        <main className="blog-page">
            <div className="blog-container">
                <Link href="/" className="blog-back">← Back</Link>
                <p className="blog-eyebrow">Field notes from</p>
                <h1 className="blog-title">{country.title}</h1>

                {country.blog.length > 0 ? (
                    country.blog.map((para, idx) => (
                        <p key={idx} className="blog-paragraph">{para}</p>
                    ))
                ) : (
                    <p className="blog-missing">No blog content yet for {country.title}.</p>
                )}

                <Link href={`/photos/${country.slug}`} className="blog-photos-link">
                    See the photos →
                </Link>
            </div>
        </main>
    );
}
