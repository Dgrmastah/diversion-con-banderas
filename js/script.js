// URL de la API de REST Countries
const apiUrl = 'https://restcountries.com/v3.1/all';

// Función para obtener la información de los países
async function fetchCountries() {
  try {
    // Hacemos la solicitud a la API y obtenemos los datos en formato JSON
    const response = await fetch(apiUrl);
    const countries = await response.json();

    // Asegurarnos de que la respuesta contiene los países correctamente
    console.log(countries);

    // Ordenamos los países alfabéticamente por el nombre común
    countries.sort((a, b) => a.name.common.toUpperCase().localeCompare(b.name.common.toUpperCase()));

    // Llamamos a la función para mostrar los países
    displayCountries(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

// Función para mostrar los países en la página
function displayCountries(countries) {
  const countriesList = document.getElementById('countries-list');
  countriesList.innerHTML = ''; // Limpiamos la lista antes de agregar los países

  countries.forEach(country => {
    const countryElement = document.createElement('div');
    countryElement.classList.add('country');

    // Verificamos que la URL de la bandera exista y sea válida
    const flagImg = country.flags?.svg || country.flags?.png;
    if (flagImg) {
      const img = document.createElement('img');
      img.src = flagImg;
      img.alt = `Flag of ${country.name.common}`;
      img.addEventListener('click', () => showCountryInfo(country));

      countryElement.appendChild(img);
      countriesList.appendChild(countryElement);
    } else {
      console.warn(`No flag for ${country.name.common}`);
    }
  });
}

// Función para mostrar la ventana flotante con la información del país
function showCountryInfo(country) {
  const countryInfo = document.getElementById('country-info');
  countryInfo.classList.remove('hidden');

  // Llenamos la ventana con la información del país
  countryInfo.innerHTML = `
    <h2>${country.name.common}</h2>
    <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" style="width: 100%; max-width: 200px;">
    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
    <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Lado de la carretera:</strong> ${country.car ? country.car : 'N/A'}</p>
    <button id="close-btn">Cerrar</button>
  `;

  // Añadir el evento para cerrar la ventana flotante
  document.getElementById('close-btn').addEventListener('click', closeCountryInfo);
}

// Función para cerrar la ventana flotante
function closeCountryInfo() {
  const countryInfo = document.getElementById('country-info');
  countryInfo.classList.add('hidden');
}

// Llamamos a la función para obtener los países cuando se carga la página
window.onload = fetchCountries;
