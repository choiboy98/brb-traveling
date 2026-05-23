import { QuickTip, hasSponsoredLinks } from "./country";
import AffiliateDisclosure from "./affiliateDisclosure";

export default function QuickTips({ tips, countryName }: { tips: QuickTip[]; countryName: string }) {
    if (tips.length === 0) {
        return null;
    }

    return (
        <aside className="quick-tips" aria-label={`Quick tips for ${countryName}`}>
            <p className="quick-tips-heading">Quick tips · {countryName}</p>
            {hasSponsoredLinks(tips) && <AffiliateDisclosure />}
            <dl className="quick-tips-list">
                {tips.map((tip) => (
                    <div key={tip.label} className="quick-tips-row">
                        <dt>{tip.label}</dt>
                        <dd>
                            {tip.tip}
                            {tip.links && tip.links.length > 0 && (
                                <span className="quick-tip-links">
                                    {tip.links.map((link) => (
                                        <a
                                            key={link.href}
                                            className="quick-tip-link"
                                            href={link.href}
                                            target="_blank"
                                            rel={link.sponsored ? "sponsored nofollow noopener" : "noopener"}
                                        >
                                            {link.text} ↗
                                        </a>
                                    ))}
                                </span>
                            )}
                        </dd>
                    </div>
                ))}
            </dl>
        </aside>
    );
}
