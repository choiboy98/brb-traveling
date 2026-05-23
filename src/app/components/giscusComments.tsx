'use client';

import { useEffect, useRef } from 'react';
import { GISCUS } from '@/app/lib/site';

/**
 * Comments via giscus (GitHub Discussions). Hidden until GISCUS is configured
 * in src/app/lib/site.ts — see the setup steps there.
 */
export default function GiscusComments() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!GISCUS.repoId || !containerRef.current || containerRef.current.hasChildNodes()) {
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.setAttribute('data-repo', GISCUS.repo);
        script.setAttribute('data-repo-id', GISCUS.repoId);
        script.setAttribute('data-category', GISCUS.category);
        script.setAttribute('data-category-id', GISCUS.categoryId);
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'top');
        script.setAttribute('data-theme', 'dark_dimmed');
        script.setAttribute('data-lang', 'en');
        containerRef.current.appendChild(script);
    }, []);

    if (!GISCUS.repoId) {
        return (
            <section className="post-comments" aria-label="Comments">
                <h2 className="post-section-heading">Comments</h2>
                <p className="post-comments-placeholder">
                    Comments are coming soon — check back shortly or reach out on social media.
                </p>
            </section>
        );
    }

    return (
        <section className="post-comments" aria-label="Comments">
            <h2 className="post-section-heading">Comments</h2>
            <div ref={containerRef} className="post-comments-widget" />
        </section>
    );
}
