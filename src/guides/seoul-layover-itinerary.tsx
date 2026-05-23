import { Guide } from "../app/components/guide";

export const data: Guide = {
    slug: "seoul-layover-itinerary",
    title: "22 hours in Seoul: a layover itinerary",
    countrySlug: "korea",
    date: "2026-05-01", // PLACEHOLDER — set the real publish date
    excerpt:
        "How to turn a long Incheon layover into a real night in Seoul — KBBQ, a jjimjilbang instead of a hotel, the Han River at night, and breakfast at Gwangjang Market.",
    sections: [
        {
            paragraphs: [
                "A 22-hour layover at Incheon sounds like an airport problem. It's actually one of the best free city breaks in the world — Seoul is an hour away, transit is cheap and constant, and the city genuinely does not stop overnight. This is the exact plan I ran with two friends, sketched out before the plane even landed.",
                "The golden rule for a layover this short: do one neighborhood properly instead of sprinting between landmarks. You will see more of Seoul in one well-chosen district than in five subway transfers.",
            ],
        },
        {
            heading: "Getting in from Incheon",
            paragraphs: [
                "Take the AREX all-stop or express train from the airport to Seoul Station — roughly an hour, trains every few minutes. Buy a T-money card at the airport convenience store and load it with cash; it covers the train, subway, buses, and even convenience-store snacks.",
                "If you have checked luggage you don't want to drag around, the storage lockers at Seoul Station (and most major subway stations) are cheap and take cards. Travel light from there.",
            ],
        },
        {
            heading: "The hour-by-hour plan",
            paragraphs: [
                "Afternoon: pick your one neighborhood. Hongdae or Seongsu if you want energy, street fashion, and cafés; Bukchon and Insadong if you want hanok lanes and tea houses at a slower pace.",
                "Evening: KBBQ for dinner — don't overthink the restaurant, the busy place with locals queuing is the right one. Follow it with the N Seoul Tower viewpoint or, better on a tight clock, the Han River banks at Banpo or Yeouido for the night skyline.",
                "Late night: this is where the jjimjilbang trick comes in. A Korean bathhouse doubles as your shower, sauna, and a few hours of sleep on a heated floor for the price of a cocktail — far better value than a hotel you'd only see for six hours.",
                "Early morning: pojangmacha tents or a 24-hour gukbap place if you're still up; otherwise head to Gwangjang Market when it opens for bindaetteok and mayak gimbap, then take the AREX back with time to spare.",
            ],
        },
        {
            heading: "What to skip",
            paragraphs: [
                "Gyeongbokgung and the big palaces deserve a full unhurried morning — save them for a real trip. Same for day trips like the DMZ. A layover is for the food, the river, and the feeling of the city at night.",
            ],
        },
        {
            heading: "Practical notes",
            paragraphs: [
                "Download Naver Map or Kakao Map before you land — Google Maps barely works for walking and transit directions in Korea. Cards are accepted nearly everywhere, but keep some cash for market stalls and street tents. And double-check your re-entry time math: be back at Incheon three hours before an international departure.",
            ],
        },
    ],
    quickTips: [
        {
            label: "Getting into the city",
            tip: "AREX train from Incheon to Seoul Station (~1 hour), pay with a T-money card, stash big bags in a station locker.",
        },
        {
            label: "Where to sleep",
            tip: "Skip the hotel — a jjimjilbang (Korean bathhouse) covers a shower, sauna, and a few hours of sleep for a fraction of the price.",
            links: [
                // PLACEHOLDER affiliate URL — swap for your tracking link once enrolled
                { text: "Hotels near Seoul Station", href: "https://www.booking.com/city/kr/seoul.html", sponsored: true },
            ],
        },
        {
            label: "Don't land without",
            tip: "Naver Map or Kakao Map installed, a T-money card, and a rough plan for one neighborhood — not five.",
            links: [
                // PLACEHOLDER affiliate URL — swap for your tracking link once enrolled
                { text: "Seoul tours & tickets", href: "https://www.getyourguide.com/seoul-l235/", sponsored: true },
            ],
        },
    ],
};
