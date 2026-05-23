'use client';

import { useEffect, useRef } from 'react';

type Props = {
    src: string;     // path to HLS master.m3u8 (under public/)
    poster: string;  // path to poster jpg
    className?: string;
};

/**
 * Background video player that:
 *   - Streams an adaptive-bitrate HLS ladder via hls.js (Chrome/Firefox/Edge)
 *     or falls back to native HLS (Safari / iOS).
 *   - Autoplays muted on mount, loops forever, and exposes zero player UI.
 *   - Uses a poster so the first paint is instant while segments buffer.
 */
export default function BackgroundVideo({ src, poster, className }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let hls: any;
        let cancelled = false;

        // Safari (desktop + iOS) plays HLS natively.
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
            video.play().catch(() => { /* autoplay blocked; ignore */ });
            return;
        }

        // Everything else: dynamic-import hls.js so it only ships when needed.
        import('hls.js').then(({ default: Hls }) => {
            if (cancelled) return;
            if (!Hls.isSupported()) {
                // Last resort — point at the master URL and hope.
                video.src = src;
                return;
            }
            hls = new Hls({ enableWorker: true, lowLatencyMode: false });
            hls.loadSource(src);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch(() => { /* autoplay blocked; ignore */ });
            });
        });

        return () => {
            cancelled = true;
            if (hls) {
                try { hls.destroy(); } catch { /* noop */ }
            }
        };
    }, [src]);

    return (
        <video
            ref={videoRef}
            className={className}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
        />
    );
}
