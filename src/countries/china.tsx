import { Country } from "../app/country";

const Title = "CHINA";
const CountryCode = "CN";
const TitleText = "Only talk about the weather and sports!";
const SubText =
    "To be fair, I haven't traveled a lot. Though, I can confidently say this country has one of the best nature and wonders in the whole world. Every corner around the block surprises you with new discoveries. So many sheeps, hot springs, mountains, and great hot dogs. What more can you ask for?";
const textStyles = {
    color: '#A7C7E7'
};

export const data = new Country(Title, CountryCode, TitleText, SubText, textStyles);