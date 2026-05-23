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

export const data = new Country(Title, CountryCode, TitleText, SubText, textStyles, Slug, Blog, Photos);
