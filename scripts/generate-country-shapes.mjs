// One-off script: generates SVG outline paths + Mercator projection params for the
// countries shown on the landing hero, written to src/app/lib/countryShapes.ts.
// Re-run after adding a new country to src/app/components/countryExport.tsx.
//
// Usage: npm run shapes:generate

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { geoMercator, geoPath, geoArea, geoCentroid } from "d3-geo";
import { feature } from "topojson-client";
import { presimplify, quantile, simplify } from "topojson-simplify";

const require = createRequire(import.meta.url);
const worldAtlasPath = require.resolve("world-atlas/countries-50m.json");
const world = JSON.parse(readFileSync(worldAtlasPath, "utf8"));

const VIEW_SIZE = 520;
const PADDING = 40;
// Polygons smaller than this fraction of the country's largest polygon are dropped
// (far-flung islets) — kept low enough that Hainan, Jeju, and Åland survive.
const MIN_RELATIVE_AREA = 0.003;
// Drop the least significant points so the inlined path data stays small;
// at ~520px display size the difference is invisible.
const SIMPLIFY_QUANTILE = 0.7;

const countries = [
    { code: "IS", id: 352 },
    { code: "FI", id: 246 },
    // maxLat drops Svalbard so the mainland fills the frame.
    { code: "NO", id: 578, maxLat: 72 },
    { code: "TW", id: 158 },
    { code: "CN", id: 156 },
    { code: "KR", id: 410 },
];

const presimplified = presimplify(world);
const simplified = simplify(presimplified, quantile(presimplified, SIMPLIFY_QUANTILE));
const features = feature(simplified, simplified.objects.countries).features;

function polygonArea(coordinates) {
    const area = geoArea({ type: "Polygon", coordinates });
    // Guard against inverted winding returning the sphere's complement.
    return area > 2 * Math.PI ? 4 * Math.PI - area : area;
}

function clipFeature(f, maxLat) {
    const polygons =
        f.geometry.type === "MultiPolygon" ? f.geometry.coordinates : [f.geometry.coordinates];

    const largest = Math.max(...polygons.map(polygonArea));
    const kept = polygons.filter((coordinates) => {
        if (polygonArea(coordinates) / largest < MIN_RELATIVE_AREA) return false;
        if (maxLat !== undefined) {
            const [, lat] = geoCentroid({ type: "Polygon", coordinates });
            if (lat > maxLat) return false;
        }
        return true;
    });

    return {
        type: "Feature",
        properties: f.properties,
        geometry: { type: "MultiPolygon", coordinates: kept },
    };
}

function projectionMatchesFormula(projection, feature) {
    const [lng, lat] = geoCentroid(feature);
    const [x, y] = projection([lng, lat]);
    const k = projection.scale();
    const [tx, ty] = projection.translate();
    const lambda = (lng * Math.PI) / 180;
    const phi = (lat * Math.PI) / 180;
    const fx = tx + k * lambda;
    const fy = ty - k * Math.log(Math.tan(Math.PI / 4 + phi / 2));
    return Math.abs(fx - x) < 1e-6 && Math.abs(fy - y) < 1e-6;
}

const shapes = {};

for (const { code, id, maxLat } of countries) {
    const f = features.find((candidate) => Number(candidate.id) === id);
    if (!f) {
        throw new Error(`Country id ${id} (${code}) not found in world-atlas countries-50m`);
    }

    const clipped = clipFeature(f, maxLat);
    const projection = geoMercator().fitExtent(
        [
            [PADDING, PADDING],
            [VIEW_SIZE - PADDING, VIEW_SIZE - PADDING],
        ],
        clipped,
    );

    if (!projectionMatchesFormula(projection, clipped)) {
        throw new Error(`Projection for ${code} no longer matches the runtime mercator formula`);
    }

    // Round path coordinates to one decimal — sub-pixel precision is wasted bytes.
    const d = geoPath(projection)(clipped).replace(/-?\d+\.\d+/g, (n) => Number(n).toFixed(1));
    const [tx, ty] = projection.translate();

    shapes[code] = {
        viewBox: `0 0 ${VIEW_SIZE} ${VIEW_SIZE}`,
        path: d,
        projection: {
            scale: round(projection.scale()),
            translateX: round(tx),
            translateY: round(ty),
        },
    };

    console.log(`${code}: ${clipped.geometry.coordinates.length} polygon(s), path ${d.length} chars`);
}

function round(value) {
    return Math.round(value * 1000) / 1000;
}

const header = `// GENERATED FILE — do not edit by hand.
// Country outlines + fitted Mercator projection params for the landing hero map.
// Regenerate with: npm run shapes:generate

export type CountryShape = {
    viewBox: string;
    path: string;
    projection: {
        scale: number;
        translateX: number;
        translateY: number;
    };
};

export const countryShapes: Record<string, CountryShape> = `;

const outPath = path.join(process.cwd(), "src", "app", "lib", "countryShapes.ts");
writeFileSync(outPath, header + JSON.stringify(shapes, null, 4) + ";\n");
console.log(`Wrote ${outPath}`);
