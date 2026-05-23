import { Country } from "../app/components/country";

const Title = "NORWAY";
const CountryCode = "NO";
const Slug = "norway";
const TitleText = "Enlist me in the Viking army because I am in love with this place!";
const SubText =
    "Norway was another beautiful place that I will long to visit again. The city, fjords, history, and the people were far too great. I also had a funny interaction with a Norwegian person at the gym because we didn't speak and just gestured to spot each other.";
const textStyles = {
    color: '#A7C7E7'
};

const Blog = [
    "Norway is the kind of country where the postcard photos are real and somehow still undersell it. The fjords look fake in person. The light in summer is unreal. The history museum in Oslo had me down a Viking rabbit hole for hours.",
    "I split my time between Oslo, Bergen, and a day trip out to Nærøyfjord. Bergen is the kind of small city you keep finding excuses to stay in — the harbor, the wooden houses, the funicular up Fløyen. Oslo felt bigger and more modern; great food scene, very walkable.",
    "Quick story: I went to the gym one day in Bergen and a guy gestured at the bench press to spot me. We didn't share a single word of language. We did three sets, nodded, and that was that. Universal human language: the deadlift.",
    "If you go, don't sleep on the fjord cruise even though it sounds touristy. It is the trip. Bring motion sickness pills if you're sensitive — the water gets choppy on the open sections."
];

const Photos = [
    { src: "/assets/photos/norway/01.jpg", alt: "Nærøyfjord cruise" },
    { src: "/assets/photos/norway/02.jpg", alt: "Bergen harbor wooden houses" },
    { src: "/assets/photos/norway/03.jpg", alt: "View from Fløyen" },
    { src: "/assets/photos/norway/04.jpg", alt: "Oslo opera house" },
    { src: "/assets/photos/norway/05.jpg", alt: "Viking ship museum" },
    { src: "/assets/photos/norway/06.jpg", alt: "Fjord at golden hour" },
];

const Details = {
    date: "2024-07-20", // PLACEHOLDER — replace with the real trip date
    excerpt:
        "Oslo, Bergen, and a fjord cruise that looks fake in person — plus a wordless gym session that proved the deadlift is a universal language.",
    quickTips: [
        { label: "Best time to go", tip: "May–September for long days and calm fjord cruises; winter works if you're chasing snow and northern lights instead." },
        { label: "Getting around", tip: "The Oslo–Bergen railway is one of the world's great train rides. Bergen itself is walkable; book fjord cruises ahead in summer." },
        { label: "Must-dos", tip: "The Nærøyfjord cruise (yes, it's touristy — it's still the trip), the Fløyen funicular, and the Viking ship museum in Oslo." },
    ],
};

export const data = new Country(Title, CountryCode, TitleText, SubText, textStyles, Slug, Blog, Photos, Details);
