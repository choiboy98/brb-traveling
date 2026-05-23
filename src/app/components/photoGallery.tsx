'use client';

import { useCallback, useEffect, useState } from 'react';
import { Photo } from './country';

export default function PhotoGallery({ photos, countryName }: { photos: Photo[]; countryName: string }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const close = useCallback(() => setActiveIndex(null), []);

    const showPrev = useCallback(() => {
        setActiveIndex((idx) => (idx === null ? idx : (idx - 1 + photos.length) % photos.length));
    }, [photos.length]);

    const showNext = useCallback(() => {
        setActiveIndex((idx) => (idx === null ? idx : (idx + 1) % photos.length));
    }, [photos.length]);

    useEffect(() => {
        if (activeIndex === null) {
            return;
        }

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') close();
            if (event.key === 'ArrowLeft') showPrev();
            if (event.key === 'ArrowRight') showNext();
        }

        document.addEventListener('keydown', onKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
        };
    }, [activeIndex, close, showPrev, showNext]);

    const activePhoto = activeIndex === null ? null : photos[activeIndex];

    return (
        <>
            <div className="photos-grid">
                {photos.map((photo, idx) => (
                    <button
                        key={idx}
                        type="button"
                        className="photos-tile"
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`View photo: ${photo.alt}`}
                    >
                        {/* Plain <img>: static export to GitHub Pages doesn't
                            support next/image's optimization runtime, and
                            these are user-provided travel photos served from
                            /public. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photo.src} alt={photo.alt} loading="lazy" />
                    </button>
                ))}
            </div>

            {activePhoto && (
                <div
                    className="lightbox-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${countryName} photo viewer`}
                    onClick={close}
                >
                    <button
                        type="button"
                        className="lightbox-close"
                        aria-label="Close photo viewer"
                        onClick={close}
                    >
                        ×
                    </button>

                    <button
                        type="button"
                        className="lightbox-arrow lightbox-arrow-left"
                        aria-label="Previous photo"
                        onClick={(e) => { e.stopPropagation(); showPrev(); }}
                    >
                        ‹
                    </button>

                    <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="lightbox-image" src={activePhoto.src} alt={activePhoto.alt} />
                        <figcaption className="lightbox-caption">
                            <span className="lightbox-caption-text">{activePhoto.alt}</span>
                            <span className="lightbox-counter">
                                {(activeIndex as number) + 1} / {photos.length}
                            </span>
                        </figcaption>
                    </figure>

                    <button
                        type="button"
                        className="lightbox-arrow lightbox-arrow-right"
                        aria-label="Next photo"
                        onClick={(e) => { e.stopPropagation(); showNext(); }}
                    >
                        ›
                    </button>
                </div>
            )}
        </>
    );
}
