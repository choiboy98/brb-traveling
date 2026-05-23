import { Country } from "../app/components/country";

const Title = "ICELAND";
const CountryCode = "IS";
const Slug = "iceland";
const TitleText = "Iceland might be the most beautiful country I've visited.";
const SubText =
    "To be fair, I haven't traveled a lot. Though, I can confidently say this country has one of the best nature and wonders in the whole world. Every corner around the block surprises you with new discoveries. So many sheeps, hot springs, mountains, and great hot dogs. What more can you ask for?";
const textStyles = {
    color: '#A7C7E7'
};

const Blog = [
    "Iceland is the only place I've ever been where the scenery resets every twenty minutes. You'll drive through black sand fields, then green moss hills, then a glacier, then a town of four hundred people with a hot dog stand that has a Michelin nod. It's ridiculous.",
    "I rented a small car and did the south coast — Reynisfjara, Skógafoss, Vík, then up to Jökulsárlón to see the iceberg lagoon. If you have more time, do the full ring road. Even the boring parts aren't boring.",
    "Practical notes: gas is expensive, the wind is no joke, and the weather changes about every fifteen minutes. Bring layers and a windbreaker even in summer. Eat at every gas station — I'm serious, the food at Icelandic N1 stops is better than most sit-down restaurants in big cities.",
    "Soundtrack for the drive: Ólafur Arnalds. Trust me."
];

const Photos = [
    { src: "/assets/photos/iceland/01.jpg", alt: "Skógafoss waterfall" },
    { src: "/assets/photos/iceland/02.jpg", alt: "Reynisfjara black sand beach" },
    { src: "/assets/photos/iceland/03.jpg", alt: "Glacier lagoon icebergs" },
    { src: "/assets/photos/iceland/04.jpg", alt: "Mossy lava field" },
    { src: "/assets/photos/iceland/05.jpg", alt: "Hot dog stand in Reykjavík" },
    { src: "/assets/photos/iceland/06.jpg", alt: "Sheep on a hillside" },
];

const Details = {
    date: "2024-06-08", // PLACEHOLDER — replace with the real trip date
    excerpt:
        "Driving Iceland's south coast, where the scenery resets every twenty minutes — black sand beaches, glaciers, hot springs, and the best gas station food on the planet.",
    quickTips: [
        { label: "Best time to go", tip: "June–August for endless daylight and open roads; September for fewer crowds and a shot at the northern lights." },
        {
            label: "Getting around",
            tip: "Rent a car — the south coast and ring road are the whole point. Watch the wind warnings and fuel up whenever you can.",
            links: [
                // PLACEHOLDER affiliate URLs — swap for your tracking links once enrolled
                { text: "Compare rental cars", href: "https://www.rentalcars.com/en/country/is/", sponsored: true },
                { text: "Stays along the south coast", href: "https://www.booking.com/region/is/south-iceland.html", sponsored: true },
            ],
        },
        { label: "Must-eats", tip: "Reykjavík hot dogs, lamb soup, and anything from an N1 gas station — genuinely better than most sit-down restaurants." },
    ],
};

export const data = new Country(Title, CountryCode, TitleText, SubText, textStyles, Slug, Blog, Photos, Details);
