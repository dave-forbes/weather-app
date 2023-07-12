const body = document.querySelector('body');
const wrapper = document.querySelector('#content-wrapper');
const input = document.querySelector('input');
const button = document.querySelector('button');
const inputWrapper = document.querySelector('#input-wrapper');
inputWrapper.style.display = 'none';

loadGif();

navigator.geolocation.getCurrentPosition((position) => {
  getWeather(`${position.coords.latitude}, ${position.coords.longitude}`);
});

button.addEventListener('click', () => {
  getWeather(input.value);
})

function loadGif() {
  const gif = document.createElement('img');
  gif.src = 'images/loading.png';
  gif.classList.add('spin');
  wrapper.appendChild(gif);
}

function removeGif() {
  const gif = document.querySelector('.spin');
  gif.style.display = 'none';
}


async function getWeather(location) {
  wrapper.innerHTML = '';
  loadGif();
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=eb5dbdb018c94d67812132539230707&q=${location}&aqi=no`);
    const json = await response.json();
    console.log(json);
    const locationValue = `${json.location.name}, ${json.location.country}`;
    await getBackgroundImage(locationValue);
    displayWeather(json);
    removeGif();
  } catch (err) {
    console.log(err);
  }
}

function displayWeather(data) {
  wrapper.innerHTML = '';

  const locationData = document.createElement('h1');
  locationData.textContent = `${data.location.name}, ${data.location.country}`;
  wrapper.appendChild(locationData);

  const conditionData = document.createElement('h2');
  conditionData.textContent = data.current.condition.text;
  wrapper.appendChild(conditionData);

  const iconData = document.createElement('img');
  iconData.src = data.current.condition.icon;
  wrapper.appendChild(iconData);

  const temp = document.createElement('p');
  temp.textContent = `Temperature: ${data.current.temp_c}°C`;
  wrapper.appendChild(temp);

  const wind = document.createElement('p');
  wind.textContent = `Wind Speed: ${data.current.wind_mph}mph`;
  wrapper.appendChild(wind);

  const windDirection = document.createElement('p');
  windDirection.textContent = `Wind Direction: ${data.current.wind_dir}`;
  wrapper.appendChild(windDirection);

  const rain = document.createElement('p');
  rain.textContent = `Precipitation: ${data.current.precip_mm}mm`;
  wrapper.appendChild(rain);

  const humidity = document.createElement('p');
  humidity.textContent = `Humidity: ${data.current.humidity}%`;
  wrapper.appendChild(humidity);

}

async function getBackgroundImage(locationValue) {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${locationValue}&client_id=WdKmaCWM493X2x7wxCB_uTQC6B_rWj7tkWlewDTIUQ4`)
    const jsonData = await response.json()
    const num = Math.floor(Math.random() * 10) + 1;
    console.log(jsonData);
    body.style.cssText = `background: URL('${jsonData.results[num].urls.regular}'); background-size: cover;
    background - repeat: no - repeat;`;
    inputWrapper.style.display = 'flex';
  }
  catch (err) {
    console.log(err);
  }
};
