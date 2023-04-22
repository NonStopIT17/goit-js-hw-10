import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import {
  countryList,
  countryInfo,
  fetchCountries,
} from './js/fetch';
import { vizualOneCountry, vizualCountriesList } from './js/vizual';
const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');
const input = document.querySelector('#search-box');
input.addEventListener('input', debounce(inputHandling, DEBOUNCE_DELAY));
function inputHandling(event) {
  const name = event.target.value.trim().toLowerCase();
  if (!name) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(name)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length >= 2 && data.length <= 10) {
        vizualCountriesList(data);
      } else if (data.length === 1) {
        vizualOneCountry(data[0]);
      }
    })
    .catch(() => {
      Notify.failure('Oops, there is no country with that name');
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    });
}
