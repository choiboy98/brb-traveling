// One-off script: generates placeholder JPEGs at the photo paths referenced in
// src/countries/*.tsx so nothing renders broken until real photos replace them.
// Existing files are never overwritten — drop real photos in and re-running is a no-op.
//
// Usage: npm run photos:placeholders

import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const countries = [
    { slug: "iceland", name: "ICELAND", tint: "#1d3a4a" },
    { slug: "finland", name: "FINLAND", tint: "#27344d" },
    { slug: "norway", name: "NORWAY", tint: "#2e2a4a" },
    { slug: "taiwan", name: "TAIWAN", tint: "#16413a" },
    { slug: "china", name: "CHINA", tint: "#4a2a2a" },
    { slug: "korea", name: "KOREA", tint: "#3d3050" },
];

const PHOTOS_PER_COUNTRY = 6;
const outRoot = path.join(process.cwd(), "public", "assets", "photos");

function svg({ width, height, name, index, tint }) {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${tint}"/>
      <stop offset="100%" stop-color="#0d0d0d"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="50%" y="47%" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="${Math.round(width / 12)}" font-weight="bold" letter-spacing="8" fill="#e6e6e6">${name}</text>
  <text x="50%" y="58%" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="${Math.round(width / 32)}" letter-spacing="4" fill="#A7C7E7">PLACEHOLDER · PHOTO ${index}</text>
</svg>`;
}

let created = 0;
let skipped = 0;

for (const country of countries) {
    const dir = path.join(outRoot, country.slug);
    await mkdir(dir, { recursive: true });

    for (let i = 1; i <= PHOTOS_PER_COUNTRY; i++) {
        const index = String(i).padStart(2, "0");
        const file = path.join(dir, `${index}.jpg`);

        if (existsSync(file)) {
            skipped++;
            continue;
        }

        // Mix in a couple of portrait frames per country for masonry variety.
        const portrait = i % 3 === 0;
        const width = portrait ? 1200 : 1600;
        const height = portrait ? 1600 : 1200;

        await sharp(Buffer.from(svg({ width, height, name: country.name, index, tint: country.tint })))
            .jpeg({ quality: 70 })
            .toFile(file);
        created++;
    }
}

console.log(`Placeholder photos: ${created} created, ${skipped} skipped (already exist).`);
