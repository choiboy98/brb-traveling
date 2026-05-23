import { Country } from "../app/components/country";

const Title = "TAIWAN";
const CountryCode = "TW";
const Slug = "taiwan";
const TitleText = "Taiwan has the best food and people by far!";
const SubText =
    "I am for sure visiting Taiwan again. I didn't get to visit the night market! I was hungover from going out on my friend's birthday (oops me). The food and the people were absolutely unbeatable and fantastic. I do want to learn more chinese to be able to speak with the locals there.";
const textStyles = {
    color: '#A7C7E7'
};

const Blog = [
    "Taiwan was a last-minute add to the trip and ended up being the loudest, warmest, most generous week of the year. I landed in Taipei jetlagged, found a bowl of beef noodle soup at midnight, and basically never stopped eating from then on.",
    "What surprised me most was the people. Every shopkeeper, every cab driver, every random stranger I asked for directions went above and beyond — sometimes literally walking me to the door of where I needed to go. There's a kind of softness to the way people treat each other here that I haven't really felt anywhere else.",
    "Things I did not get to do (and am already plotting a return for): a proper night market crawl in Tainan, the Maokong gondola at sunset, and Taroko Gorge. Things I did do: ate xiao long bao until I couldn't stand, climbed Elephant Mountain, got caught in a monsoon, and learned that bubble tea in Taiwan really is on another level.",
    "If you only have a few days, give Taipei two and then take the high-speed rail down to Kaohsiung or Tainan for the food. And learn at least 'thank you' in Mandarin — you'll use it a hundred times a day."
];

const Photos = [
    { src: "/assets/photos/taiwan/01.jpg", alt: "Taipei at night" },
    { src: "/assets/photos/taiwan/02.jpg", alt: "Beef noodle soup" },
    { src: "/assets/photos/taiwan/03.jpg", alt: "Elephant Mountain view" },
    { src: "/assets/photos/taiwan/04.jpg", alt: "Night market food stall" },
    { src: "/assets/photos/taiwan/05.jpg", alt: "Bubble tea close-up" },
    { src: "/assets/photos/taiwan/06.jpg", alt: "Rainy alleyway in Taipei" },
];

const Details = {
    date: "2025-03-15", // PLACEHOLDER — replace with the real trip date
    excerpt:
        "A last-minute week in Taipei that turned into the warmest stop of the year — midnight beef noodle soup, Elephant Mountain, a monsoon, and the kindest strangers anywhere.",
    quickTips: [
        { label: "Best time to go", tip: "October–April for cooler weather; summer is hot, humid, and monsoon-prone (pack a poncho either way)." },
        { label: "Getting around", tip: "The Taipei MRT is spotless and easy; grab an EasyCard on arrival. The high-speed rail makes Tainan and Kaohsiung easy day-or-two trips." },
        { label: "Must-eats", tip: "Beef noodle soup, xiao long bao at Din Tai Fung (or any local spot), night market everything, and bubble tea from the source." },
    ],
    // Approximate coordinates — refine as needed.
    places: [
        { name: "Taipei", lat: 25.0330, lng: 121.5654 },
        { name: "Elephant Mountain", lat: 25.0235, lng: 121.5763 },
        { name: "Tainan", lat: 22.9999, lng: 120.2270 },
        { name: "Kaohsiung", lat: 22.6273, lng: 120.3014 },
    ],
};

export const data = new Country(Title, CountryCode, TitleText, SubText, textStyles, Slug, Blog, Photos, Details);
