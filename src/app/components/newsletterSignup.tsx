import { BUTTONDOWN_USERNAME } from "@/app/lib/site";

/**
 * Newsletter signup via Buttondown. Hidden until BUTTONDOWN_USERNAME is set
 * in src/app/lib/site.ts — see the setup steps there.
 */
export default function NewsletterSignup() {
    if (!BUTTONDOWN_USERNAME) {
        return null;
    }

    return (
        <section className="newsletter" aria-label="Newsletter signup">
            <h2 className="post-section-heading">Follow along</h2>
            <p className="newsletter-blurb">
                Get an email when a new trip goes up — no spam, just stories and photos.
            </p>
            <form
                className="newsletter-form"
                action={`https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`}
                method="post"
                target="_blank"
            >
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                    id="newsletter-email"
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="newsletter-input"
                />
                <button type="submit" className="newsletter-submit">Subscribe</button>
            </form>
        </section>
    );
}
