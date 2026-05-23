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

export const data = new Country(Title, CountryCode, TitleText, SubText, textStyles, Slug, Blog, Photos);
