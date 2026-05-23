import Link from "next/link";
import { countries } from "./countryExport";
import { guides } from "./guideExport";
import { displayName } from "@/app/lib/seo";
import { SITE_NAME } from "@/app/lib/site";
import "./siteFooter.css";

export default function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="site-footer-inner">
                <div className="site-footer-brand">
                    <Link href="/" className="site-footer-wordmark">
                        {SITE_NAME}
                    </Link>
                    <p className="site-footer-tagline">
                        Travel with me through my POV — field notes, tips, and photos from the road.
                    </p>
                </div>

                <nav className="site-footer-nav" aria-label="Footer">
                    <div className="site-footer-col">
                        <p className="site-footer-heading">Explore</p>
                        <Link href="/">Home</Link>
                        <Link href="/blog">Travel journal</Link>
                        {guides.map((guide) => (
                            <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                                {guide.title}
                            </Link>
                        ))}
                        <a href="/rss.xml">RSS feed</a>
                    </div>
                    <div className="site-footer-col">
                        <p className="site-footer-heading">Destinations</p>
                        {countries.map((country) => (
                            <Link key={country.slug} href={`/blog/${country.slug}`}>
                                {displayName(country)}
                            </Link>
                        ))}
                    </div>
                    <div className="site-footer-col">
                        <p className="site-footer-heading">Photos</p>
                        {countries.map((country) => (
                            <Link key={country.slug} href={`/photos/${country.slug}`}>
                                {displayName(country)}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>

            <p className="site-footer-copy">
                © {new Date().getFullYear()} {SITE_NAME}
            </p>
        </footer>
    );
}
