import { Guide } from "./guide";
import { data as seoulLayoverItinerary } from "../../guides/seoul-layover-itinerary";
import { data as icelandSouthCoastRoadTrip } from "../../guides/iceland-south-coast-road-trip";

export const guides: Guide[] = [
    seoulLayoverItinerary,
    icelandSouthCoastRoadTrip,
];

export function guidesForCountry(countrySlug: string): Guide[] {
    return guides.filter((guide) => guide.countrySlug === countrySlug);
}
