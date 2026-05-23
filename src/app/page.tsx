'use client';

import './landing.css'
import { useState } from 'react';
import Link from 'next/link';

import CountryButton from './components/countryButton';
import CountryRenderer from './components/countryRenderer';
import BackgroundVideo from './components/backgroundVideo';
import { countries } from "./components/countryExport";
import { Country } from '@/app/components/country';

export default function Home() {
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
        <p className={isFocused ? "vanish-landing-text" : "landing-text"}>
            BRB TRAVELING
        </p>

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
    </div>
  )
}
