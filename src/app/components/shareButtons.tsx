'use client';

import { useState } from 'react';

export default function ShareButtons({ url, title }: { url: string; title: string }) {
    const [copied, setCopied] = useState(false);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard unavailable (e.g. non-secure context) — quietly do nothing.
        }
    }

    return (
        <div className="share-buttons" aria-label="Share this post">
            <span className="share-label">Share</span>
            <a
                className="share-button"
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                X / Twitter
            </a>
            <a
                className="share-button"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Facebook
            </a>
            <button type="button" className="share-button" onClick={copyLink}>
                {copied ? 'Copied!' : 'Copy link'}
            </button>
        </div>
    );
}
