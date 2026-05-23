export type Photo = {
    src: string;
    alt: string;
};

export type QuickTipLink = {
    text: string;
    href: string;
    /** Affiliate/commissionable link — rendered with rel="sponsored" and triggers the disclosure. */
    sponsored?: boolean;
};

export type QuickTip = {
    label: string;
    tip: string;
    links?: QuickTipLink[];
};

export function hasSponsoredLinks(tips: QuickTip[]): boolean {
    return tips.some((tip) => tip.links?.some((link) => link.sponsored));
}

export type CountryDetails = {
    /** Trip / publish date as ISO 'YYYY-MM-DD'. Used for blog ordering, RSS, and SEO. */
    date?: string;
    /** Short 1–2 sentence summary used on blog cards and meta descriptions. */
    excerpt?: string;
    quickTips?: QuickTip[];
    /** Defaults to the first photo. */
    coverPhoto?: Photo;
};

export class Country {
    title: string;
    countryCode: string;
    titleText: string;
    subText: string;
    textStyles: any;
    slug: string;
    blog: string[];
    photos: Photo[];
    date: string;
    excerpt: string;
    quickTips: QuickTip[];
    coverPhoto: Photo | null;

    constructor(
        title: string,
        countryCode: string,
        titleText: string,
        subText: string,
        textStyles: any,
        slug: string = "",
        blog: string[] = [],
        photos: Photo[] = [],
        details: CountryDetails = {},
    ) {
        this.title = title;
        this.countryCode = countryCode;
        this.titleText = titleText;
        this.subText = subText;
        this.textStyles = textStyles;
        this.slug = slug || title.toLowerCase();
        this.blog = blog;
        this.photos = photos;
        this.date = details.date ?? "";
        this.excerpt = details.excerpt ?? subText;
        this.quickTips = details.quickTips ?? [];
        this.coverPhoto = details.coverPhoto ?? photos[0] ?? null;
    }

    equals(otherCountry: Country) {
        return this.title == otherCountry.title && this.countryCode == otherCountry.countryCode &&
            this.titleText == otherCountry.titleText && this.subText == otherCountry.subText && this.textStyles == otherCountry.textStyles;
    }
}
