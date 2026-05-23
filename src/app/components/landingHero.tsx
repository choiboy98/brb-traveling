'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import CountryButton from './countryButton';
import { countries } from './countryExport';
import { countryShapes } from '../lib/countryShapes';
import { projectPoint } from '../lib/projectPoint';
import { displayName } from '../lib/seo';

const COUNTRY_INTERVAL_MS = 7000;
const SPOTLIGHT_INTERVAL_MS = 1400;
const FLAG_PAUSE_MS = 20000;

export default function LandingHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [spotIndex, setSpotIndex] = useState(0);
  const [hoveredPlace, setHoveredPlace] = useState<number | null>(null);
  const [isPaused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pausedUntilRef = useRef(0);
  // Remembered so the zoom-out animates around the same place the zoom-in did.
  const lastHoveredRef = useRef<number | null>(null);

  useEffect(() => {
    setHoveredPlace(null);
    lastHoveredRef.current = null;
  }, [activeIndex]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => {
      if (isPaused || Date.now() < pausedUntilRef.current) return;
      setActiveIndex((index) => (index + 1) % countries.length);
      setSpotIndex(0);
    }, COUNTRY_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isPaused, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const placeCount = countries[activeIndex].places.length;
    if (placeCount < 2) return;
    const timer = setInterval(() => {
      setSpotIndex((index) => (index + 1) % placeCount);
    }, SPOTLIGHT_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [activeIndex, reducedMotion]);

  function jumpTo(index: number) {
    pausedUntilRef.current = Date.now() + FLAG_PAUSE_MS;
    setActiveIndex(index);
    setSpotIndex(0);
  }

  const pauseProps = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
  };

  return (
    <section
      className="hero"
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="hero-left">
        <h1 className="landing-text">BRB TRAVELING</h1>

        <div className="hero-panels" {...pauseProps}>
          {countries.map((country, index) => {
            const isActive = index === activeIndex;
            return (
              <article
                key={country.slug}
                className={isActive ? 'hero-panel is-active' : 'hero-panel'}
                aria-hidden={!isActive}
              >
                <h2 className="hero-panel-title">{displayName(country)}</h2>
                <p className="hero-panel-tagline">{country.titleText}</p>
                <p className="hero-panel-summary">{country.subText}</p>
                <div className="country-actions">
                  <Link
                    href={`/blog/${country.slug}`}
                    className="country-action-btn"
                    tabIndex={isActive ? undefined : -1}
                  >
                    Read the blog →
                  </Link>
                  <Link
                    href={`/photos/${country.slug}`}
                    className="country-action-btn"
                    tabIndex={isActive ? undefined : -1}
                  >
                    View photos →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="flag-container">
          {countries.map((country, index) => (
            <CountryButton
              key={country.slug}
              country={country}
              isActive={index === activeIndex}
              onSelect={() => jumpTo(index)}
            />
          ))}
        </div>
      </div>

      <div className="hero-right" {...pauseProps}>
        {countries.map((country, index) => {
          const shape = countryShapes[country.countryCode];
          if (!shape) return null;
          const isActive = index === activeIndex;
          const hovered = isActive && !reducedMotion ? hoveredPlace : null;
          // The zoom expands around the hovered place (it stays put under the cursor);
          // zooming back out reuses the last hovered place as its origin.
          const zoomOriginIndex = hovered ?? (isActive ? lastHoveredRef.current : null);
          const zoomOrigin =
            zoomOriginIndex !== null && country.places[zoomOriginIndex]
              ? projectPoint(
                  country.places[zoomOriginIndex].lat,
                  country.places[zoomOriginIndex].lng,
                  shape.projection,
                )
              : null;
          const zoomScale = hovered !== null ? 2.2 : 1;
          const zoomStyle = {
            transform: zoomOrigin
              ? `translate(${zoomOrigin[0]}px, ${zoomOrigin[1]}px) scale(${zoomScale}) translate(${-zoomOrigin[0]}px, ${-zoomOrigin[1]}px)`
              : 'none',
          };
          const mapClassName = [
            'hero-map',
            isActive ? 'is-active' : '',
            hovered !== null ? 'is-zoomed' : '',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <div key={country.slug} className={mapClassName} aria-hidden={!isActive}>
              <svg
                viewBox={shape.viewBox}
                role="img"
                aria-label={`Map of ${displayName(country)} with the places I visited`}
                onMouseLeave={() => setHoveredPlace(null)}
              >
                <g className="map-zoom" style={zoomStyle}>
                  <path className="map-outline" d={shape.path} vectorEffect="non-scaling-stroke" />
                  {country.places.map((place, placeIndex) => {
                    const [x, y] = projectPoint(place.lat, place.lng, shape.projection);
                    const isSpotlit =
                      isActive &&
                      (hovered !== null
                        ? placeIndex === hovered
                        : reducedMotion || placeIndex === spotIndex);
                    const labelAbove = placeIndex % 2 === 1;
                    return (
                      <g
                        key={place.name}
                        className={isSpotlit ? 'map-marker is-active' : 'map-marker'}
                        onMouseEnter={() => {
                          lastHoveredRef.current = placeIndex;
                          setHoveredPlace(placeIndex);
                        }}
                      >
                        <circle cx={x} cy={y} r={18} fill="transparent" />
                        <circle className="map-marker-dot" cx={x} cy={y} r={5} />
                        <text x={x + 10} y={labelAbove ? y - 8 : y + 16}>
                          {place.name}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
          );
        })}
      </div>

      <a href="#destinations" className="scroll-cue" aria-label="Scroll down to the destinations">
        <span className="scroll-cue-label">Explore the journal</span>
        <span className="scroll-cue-chevron" aria-hidden="true">⌄</span>
      </a>
    </section>
  );
}
