import { Country } from "../app/components/country";

const Title = "FINLAND";
const CountryCode = "FI";
const Slug = "finland";
const TitleText = "Finland? More like SkySauna and Santa Claus Village!";
const SubText =
    "Finland wasn't on my travel list. But when I saw the SkySauna and the Santa Claus Village? Finland was next on my list! Though the cities weren't too impressive, these two attractions won my heart.";
const textStyles = {
    color: '#A7C7E7'
};

const Blog = [
    "Finland snuck up on me. I was originally going to skip it entirely on the Nordic loop, but two things changed my mind: the SkySauna ferris wheel in Helsinki and the actual real Santa Claus Village up in Rovaniemi. I went for the gimmicks and stayed for the quiet.",
    "Helsinki itself is calm in a way I wasn't expecting. People give each other a lot of space. Coffee is taken seriously. The design district is worth a slow afternoon, and the public saunas (Löyly, Allas) are non-negotiable.",
    "Rovaniemi was the real surprise. Crossing the Arctic Circle in winter, getting a passport stamp from Santa himself, riding a husky sled through complete silence — it was campy and magical at the same time. Go with snowpants you don't mind getting wet.",
    "Would I plan a whole trip around Finland? Probably not. Would I always add a few days here on any Nordic itinerary? Absolutely."
];

const Photos = [
    { src: "/assets/photos/finland/01.jpg", alt: "SkySauna ferris wheel at dusk" },
    { src: "/assets/photos/finland/02.jpg", alt: "Santa Claus Village entrance" },
    { src: "/assets/photos/finland/03.jpg", alt: "Husky sled in snow" },
    { src: "/assets/photos/finland/04.jpg", alt: "Helsinki Cathedral" },
    { src: "/assets/photos/finland/05.jpg", alt: "Arctic Circle marker" },
    { src: "/assets/photos/finland/06.jpg", alt: "Public sauna by the water" },
];

const Details = {
    date: "2024-12-14", // PLACEHOLDER — replace with the real trip date
    excerpt:
        "I went to Finland for the SkySauna and Santa Claus Village, and stayed for the quiet — Helsinki saunas, Arctic Circle stamps, and a husky sled through complete silence.",
    quickTips: [
        { label: "Best time to go", tip: "December–February for the full Arctic winter (Santa Claus Village, husky sleds); summer for lake-and-sauna season." },
        { label: "Getting around", tip: "Helsinki is walkable with great trams; take the overnight train or a short flight up to Rovaniemi for Lapland." },
        { label: "Must-dos", tip: "A public sauna (Löyly or Allas), the SkySauna ferris wheel, and crossing the Arctic Circle with snowpants you don't mind getting wet." },
    ],
    // Approximate coordinates — refine as needed.
    places: [
        { name: "Helsinki", lat: 60.1699, lng: 24.9384 },
        { name: "Rovaniemi", lat: 66.5039, lng: 25.7294 },
        { name: "Santa Claus Village", lat: 66.5436, lng: 25.8470 },
    ],
};

export const data = new Country(Title, CountryCode, TitleText, SubText, textStyles, Slug, Blog, Photos, Details);
