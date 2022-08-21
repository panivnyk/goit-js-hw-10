import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const searchCountry = event => {
  const findCountries = event.target.value.trim();
  clearResult();

  if (findCountries !== '') {
    fetchCountries(findCountries)
      .then(country => {
        if (country.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.',
            {
              position: 'center-top',
            }
          );
          clearResult();
          return;
        } else if (country.length === 1) {
          clearResult();
          renderCountryInfo(country);
        } else if (country.length > 1 && country.length <= 10) {
          clearResult();
          renderCountries(country);
        }
      })
      .catch(error => {
        clearResult();
        Notiflix.Notify.failure('Oops, there is no country with that name', {
          position: 'center-top',
        });

        return error;
      });
  }
};

// --- 2...10 countries --- //
const renderCountries = country => {
  const result = country
    .map(({ name, flags }) => {
      return `<li><img src="${flags.svg}" alt="${name.official}" width="30"> &nbsp ${name.official}</li>`;
    })
    .join('');
  countryList.insertAdjacentHTML('beforeend', result);
};

// --- 1 country --- //
const renderCountryInfo = country => {
  const result = country
    .map(({ name, capital, population, flags, languages }) => {
      return `<h1><div><img src="${flags.svg}" alt="${
        name.official
      }" width="30"> ${name.official}</h1>
      <p><b>Capital:</b>  ${capital}</p>
      <p><b>Population:</b> ${population}</p>
      <p><b>Languages:</b> ${Object.values(languages)}</p></div>`;
    })
    .join('');
  countryInfo.insertAdjacentHTML('beforeend', result);
};

function clearResult() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}

searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
