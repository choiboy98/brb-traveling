import { Guide } from "../app/components/guide";

export const data: Guide = {
    slug: "iceland-south-coast-road-trip",
    title: "Iceland's south coast: a 3-day road trip guide",
    countrySlug: "iceland",
    date: "2026-05-01", // PLACEHOLDER — set the real publish date
    excerpt:
        "A practical 3-day route from Reykjavík to the glacier lagoon — the waterfalls and black sand beaches worth stopping for, what driving in Iceland is actually like, and what to pack.",
    sections: [
        {
            paragraphs: [
                "If you only have a few days in Iceland, drive the south coast. It's the stretch where the scenery resets every twenty minutes — waterfalls, black sand, moss fields, glaciers — and it's all on one well-paved road out of Reykjavík.",
                "This is the route I drove in a small 2WD rental, with the stops that earned their place and the practical stuff I wish I'd known before the first wind warning.",
            ],
        },
        {
            heading: "The route",
            paragraphs: [
                "Reykjavík → Seljalandsfoss (the waterfall you can walk behind) → Skógafoss → Reynisfjara black sand beach and Vík → Fjaðrárgljúfur canyon → Jökulsárlón glacier lagoon and Diamond Beach. It's roughly five hours of pure driving end to end, which is exactly why you split it over three days instead of one heroic push.",
            ],
        },
        {
            heading: "Day by day",
            paragraphs: [
                "Day 1: leave Reykjavík early, hit Seljalandsfoss and Skógafoss, and sleep around Vík. Walk Reynisfjara in the evening light but respect the sneaker waves — stay well back from the waterline.",
                "Day 2: Vík to the Jökulsárlón glacier lagoon, with a stop at Fjaðrárgljúfur canyon. Watch icebergs calve into the lagoon, cross the road to Diamond Beach, and if the budget allows, take a zodiac boat tour between the ice. Sleep near Höfn and eat langoustine.",
                "Day 3: drive back west. It sounds like a wasted day — it isn't. The light is different in the other direction, and you'll stop at half the things you skipped on the way out. Finish with a hot dog and a soak in a pool or lagoon back near Reykjavík.",
            ],
        },
        {
            heading: "Renting a car and driving",
            paragraphs: [
                "A 2WD is fine for the south coast in summer; you only need 4x4 for the highlands. Take the gravel and door-protection insurance seriously — wind rips car doors out of hands here, and that damage isn't covered by default. Check road.is and the wind forecast every morning, fuel up whenever you see a station, and eat at the N1 stops without shame: the food is genuinely good.",
            ],
        },
        {
            heading: "What to pack and when to go",
            paragraphs: [
                "Layers, a real windbreaker, waterproof shoes, and a swimsuit for the pools — even in July. June to August gives you endless daylight and open roads; September trades some weather for northern lights and fewer people.",
                "Soundtrack recommendation stands: Ólafur Arnalds, the whole drive.",
            ],
        },
    ],
    quickTips: [
        {
            label: "Rental car",
            tip: "2WD is enough in summer; add gravel and door insurance, and check road.is plus the wind forecast every morning.",
            links: [
                // PLACEHOLDER affiliate URLs — swap for your tracking links once enrolled
                { text: "Compare rental cars", href: "https://www.rentalcars.com/en/country/is/", sponsored: true },
            ],
        },
        {
            label: "Where to stay",
            tip: "Split the nights between Vík and the Höfn/Jökulsárlón area so no driving day is longer than three hours.",
            links: [
                // PLACEHOLDER affiliate URL — swap for your tracking link once enrolled
                { text: "Stays along the south coast", href: "https://www.booking.com/region/is/south-iceland.html", sponsored: true },
            ],
        },
        {
            label: "Worth booking ahead",
            tip: "The Jökulsárlón zodiac boat tour sells out in summer; glacier hikes and ice caves need a guide regardless of season.",
            links: [
                // PLACEHOLDER affiliate URL — swap for your tracking link once enrolled
                { text: "Glacier lagoon tours", href: "https://www.getyourguide.com/jokulsarlon-l32954/", sponsored: true },
            ],
        },
    ],
};
