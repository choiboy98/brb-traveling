export type Photo = {
    src: string;
    alt: string;
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

    constructor(
        title: string,
        countryCode: string,
        titleText: string,
        subText: string,
        textStyles: any,
        slug: string = "",
        blog: string[] = [],
        photos: Photo[] = [],
    ) {
        this.title = title;
        this.countryCode = countryCode;
        this.titleText = titleText;
        this.subText = subText;
        this.textStyles = textStyles;
        this.slug = slug || title.toLowerCase();
        this.blog = blog;
        this.photos = photos;
    }

    equals(otherCountry: Country) {
        return this.title == otherCountry.title && this.countryCode == otherCountry.countryCode &&
            this.titleText == otherCountry.titleText && this.subText == otherCountry.subText && this.textStyles == otherCountry.textStyles;
    }
}
