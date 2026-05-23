import { Country } from "../app/components/country";

const Title = "KOREA";
const CountryCode = "KR";
const Slug = "korea";
const TitleText = "22 hour layover? Let me make the best of it!";
const SubText =
    "It's been a long time since I've last visited Korea. While I was only there for 22 hours and my friends planned to travel around Korea for longer, I made the best out of my time and showed my friends how to enjoy Korea.";
const textStyles = {
    color: '#A7C7E7'
};

const Blog = [
    "Twenty-two hours in Seoul. Not a layover, a sprint. I dropped my bag at the hotel and had a plan written out before the plane even landed — KBBQ, a jjimjilbang, Han River for the night view, late-night pojangmacha, and back to the airport.",
    "I'm Korean by background but it had been years since I'd last visited. Showing two friends around for the first time was the best way to see the city through new eyes. Watching them try live octopus and 24-hour skincare shopping was its own reward.",
    "If you only have a day in Seoul: do one neighborhood properly instead of trying to see everything. Hongdae or Seongsu for energy, Bukchon for the slower lanes and tea houses. And get the Naver Map app — Google Maps is mostly useless here for walking directions.",
    "Next time I'm giving Korea a real two weeks. Busan, Jeju, the whole thing."
];

const Photos = [
    { src: "/assets/photos/korea/01.jpg", alt: "Seoul at night from N Seoul Tower" },
    { src: "/assets/photos/korea/02.jpg", alt: "Korean BBQ table" },
    { src: "/assets/photos/korea/03.jpg", alt: "Han River bridge" },
    { src: "/assets/photos/korea/04.jpg", alt: "Bukchon hanok alley" },
    { src: "/assets/photos/korea/05.jpg", alt: "Street food at Gwangjang Market" },
    { src: "/assets/photos/korea/06.jpg", alt: "Jjimjilbang interior" },
];

const Details = {
    date: "2025-03-08", // PLACEHOLDER — replace with the real trip date
    excerpt:
        "Twenty-two hours in Seoul, treated like a sprint — KBBQ, a jjimjilbang, the Han River at night, and showing two friends the city my family is from.",
    quickTips: [
        { label: "Best time to go", tip: "April for cherry blossoms or October for fall color; summers are humid and late July–August is monsoon season." },
        {
            label: "Getting around",
            tip: "Get a T-money card and use Naver Map or Kakao Map — Google Maps barely works for walking directions in Korea.",
            links: [
                // PLACEHOLDER affiliate URL — swap for your tracking link once enrolled
                { text: "Stays in Seoul", href: "https://www.booking.com/city/kr/seoul.html", sponsored: true },
            ],
        },
        {
            label: "Must-eats",
            tip: "KBBQ, late-night pojangmacha street tents, Gwangjang Market bindaetteok, and a convenience-store haul at least once.",
            links: [
                // PLACEHOLDER affiliate URL — swap for your tracking link once enrolled
                { text: "Seoul food tours", href: "https://www.getyourguide.com/seoul-l235/food-wine-tc54/", sponsored: true },
            ],
        },
    ],
    // Approximate coordinates — refine as needed.
    places: [
        { name: "Seoul", lat: 37.5665, lng: 126.9780 },
        { name: "Hongdae", lat: 37.5563, lng: 126.9220 },
        { name: "Seongsu", lat: 37.5446, lng: 127.0567 },
        { name: "Han River", lat: 37.5219, lng: 126.9918 },
    ],
};

export const data = new Country(Title, CountryCode, TitleText, SubText, textStyles, Slug, Blog, Photos, Details);
