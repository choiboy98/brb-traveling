import type { CountryShape } from './countryShapes';

/**
 * Projects a lat/lng to SVG coordinates using the same spherical Mercator math
 * as the d3 projection that generated countryShapes.ts (no rotation/center applied).
 */
export function projectPoint(
    lat: number,
    lng: number,
    projection: CountryShape['projection'],
): [number, number] {
    const lambda = (lng * Math.PI) / 180;
    const phi = (lat * Math.PI) / 180;
    return [
        projection.translateX + projection.scale * lambda,
        projection.translateY - projection.scale * Math.log(Math.tan(Math.PI / 4 + phi / 2)),
    ];
}
