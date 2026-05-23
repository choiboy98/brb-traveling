import { Country } from "../app/components/country";

const Title = "CHINA";
const CountryCode = "CN";
const Slug = "china";
const TitleText = "Only talk about the weather and sports!";
const SubText =
    "It is quite remarkabe how everything is under one system (definitely scary). Seeing surveillance cameras everywhere you go is an experience. Regardless, what a great time it was. The food, the people, and the view were something else.";
const textStyles = {
    color: '#A7C7E7'
};

const Blog = [
    "China was the trip that gave me the biggest culture-shift in the shortest amount of time. Everything works through one app — payment, transit, food, calls, all of it. Once I got WeChat Pay set up, the whole country basically opened up.",
    "The food was the headline. Beijing duck in Beijing, hotpot in Chengdu, dim sum in Guangzhou — each region is its own cuisine, and none of them resemble what 'Chinese food' means back home. Bring an appetite and a willingness to point at menus.",
    "The surveillance is real and visible. Cameras at every intersection. Facial recognition at metro gates. It's interesting to experience and worth keeping in mind for what you say and where you say it. The general advice I got from a local friend: 'only talk about the weather and sports.'",
    "Logistics tip: download a working VPN before you land — most western apps are blocked, and you'll want maps that aren't government-curated. Also, save offline translation packs in advance."
];

const Photos = [
    { src: "/assets/photos/china/01.jpg", alt: "Great Wall section" },
    { src: "/assets/photos/china/02.jpg", alt: "Hotpot in Chengdu" },
    { src: "/assets/photos/china/03.jpg", alt: "Shanghai skyline at night" },
    { src: "/assets/photos/china/04.jpg", alt: "Forbidden City rooftops" },
    { src: "/assets/photos/china/05.jpg", alt: "Street food alley" },
    { src: "/assets/photos/china/06.jpg", alt: "Bund waterfront" },
];

const Details = {
    date: "2025-05-10", // PLACEHOLDER — replace with the real trip date
    excerpt:
        "Beijing duck, Chengdu hotpot, the Great Wall, and a country that runs on one app — the biggest culture shift in the shortest amount of time.",
    quickTips: [
        { label: "Best time to go", tip: "April–May or September–October for mild weather; avoid Golden Week holidays when everything is packed." },
        { label: "Getting around", tip: "Set up WeChat Pay or Alipay before you land — it unlocks everything. High-speed rail beats flying between most cities." },
        { label: "Before you land", tip: "Download a working VPN and offline translation packs; most western apps and maps are blocked once you're there." },
    ],
};

export const data = new Country(Title, CountryCode, TitleText, SubText, textStyles, Slug, Blog, Photos, Details);
