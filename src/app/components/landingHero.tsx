'use client';

import { useState } from 'react';
import Link from 'next/link';

import CountryButton from './countryButton';
import CountryRenderer from './countryRenderer';
import BackgroundVideo from './backgroundVideo';
import { countries } from './countryExport';
import { Country } from './country';

export default function LandingHero() {
  const dummyCountry = new Country("", "", "", "", "");
  const [currCountry, setCountry] = useState(dummyCountry);
  const [isFocused, setFocus] = useState(false);

  function handleClick(country : Country) {
    if (!isFocused) {
      setFocus(!isFocused);
    }

    if (country.equals(currCountry)) {
      setFocus(!isFocused);
      setCountry(dummyCountry);
    }
  }

  return (
    <div className='background-page'>
      <div className={isFocused ? "focused-vid" : "landing-vid"}>
        <BackgroundVideo
          className="vid"
          src="/assets/videos/hls/master.m3u8"
          poster="/assets/videos/taiwan-poster.jpg"
        />
      </div>

      <div className="landing-container">
        <h1 className={isFocused ? "vanish-landing-text" : "landing-text"}>
            BRB TRAVELING
        </h1>

        {CountryRenderer(
          countries.flatMap(country => {
            return (country.title)
          }), isFocused
        )}

        <div className='flag-container'>
          {countries.map(country => {
            return (
              CountryButton(country, setCountry, () => {handleClick(country)})
            )
          })}
        </div>
      </div>

      <div className={isFocused ? "country-text" : "vanish-country-text"}>
          <p className='country-header-text'>
            {currCountry.titleText}
          </p>

          <p className='country-sub-text'>
            {currCountry.subText}
          </p>

          {currCountry.slug && (
            <div className='country-actions'>
              <Link href={`/blog/${currCountry.slug}`} className='country-action-btn'>
                Read the blog →
              </Link>
              <Link href={`/photos/${currCountry.slug}`} className='country-action-btn'>
                View photos →
              </Link>
            </div>
          )}
        </div>

      <a href="#destinations" className="scroll-cue" aria-label="Scroll down to the destinations">
        <span className="scroll-cue-label">Explore the journal</span>
        <span className="scroll-cue-chevron" aria-hidden="true">⌄</span>
      </a>
    </div>
  )
}
