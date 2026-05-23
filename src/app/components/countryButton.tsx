import './countries.css';
import { Country } from './country';
import { displayName } from '../lib/seo';

type Props = {
    country: Country;
    isActive?: boolean;
    onSelect: () => void;
};

export default function CountryButton({ country, isActive = false, onSelect }: Props) {
    return (
        <button
            type="button"
            className={isActive ? 'flag-button is-active' : 'flag-button'}
            onClick={onSelect}
            aria-label={`Show ${displayName(country)}`}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                className="flag"
                src={'./assets/flags/4x3/' + country.countryCode.toLowerCase() + '.svg'}
                alt=""
            />
        </button>
    );
}
