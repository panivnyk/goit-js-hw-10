import Notiflix from 'notiflix';
const baseURL = 'https://restcountries.com/v3.1/name/';
const fields = 'name,capital,population,flags,languages';

// export const fetchCountries = name => {
//   return fetch(`${baseURL}${name}?fields=${fields}`)
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       throw new Error(res.statusText);
//     })
//     .catch(error => {
//       Notiflix.Notify.warning(error, {
//         position: 'center-top',
//       });
//     });
// };

export function fetchCountries(name) {
  return fetch(`${baseURL}${name}?fields=${fields}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
