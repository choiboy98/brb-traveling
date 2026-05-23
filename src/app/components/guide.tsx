import { Photo, QuickTip } from "./country";

export type GuideSection = {
    heading?: string;
    paragraphs: string[];
};

export type Guide = {
    slug: string;
    title: string;
    /** Slug of the related Country — used for cross-links and the default cover photo. */
    countrySlug: string;
    /** ISO 'YYYY-MM-DD' publish date. */
    date: string;
    /** ISO 'YYYY-MM-DD' last-updated date for evergreen refreshes. */
    updated?: string;
    excerpt: string;
    sections: GuideSection[];
    quickTips?: QuickTip[];
    /** Defaults to the related country's cover photo. */
    coverPhoto?: Photo;
};
