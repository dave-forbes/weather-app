const body = document.querySelector('body');
const wrapper = document.querySelector('#content-wrapper');
const input = document.querySelector('input');
const button = document.querySelector('button');

navigator.geolocation.getCurrentPosition((position) => {
  getWeather(`${position.coords.latitude}, ${position.coords.longitude}`);
});

button.addEventListener('click', () => {
  getWeather(input.value);
})

async function getWeather(location) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=eb5dbdb018c94d67812132539230707&q=${location}&aqi=no`);
    const json = await response.json();
    console.log(json);
    const city = `${json.location.name}, ${json.location.country}`;
    getBackgroundImage(city);
    displayWeather(json);
  } catch (err) {
    console.log(err);
  }
}

function displayWeather(data) {
  wrapper.innerHTML = '';
  const locationData = document.createElement('h1');
  const conditionData = document.createElement('h2');
  const iconData = document.createElement('img');
  locationData.textContent = `${data.location.name}, ${data.location.country}`;
  conditionData.textContent = data.current.condition.text;
  iconData.src = data.current.condition.icon;
  wrapper.appendChild(locationData);
  wrapper.appendChild(conditionData);
  wrapper.appendChild(iconData);
  let array = Object.entries(data.current);
  let filteredArray = [array[2], array[6], array[8], array[9], array[10], array[12], array[14], array[15], array[16], array[19], array[20], array[21]];
  filteredArray.forEach(item => {
    const p = document.createElement('p');
    p.textContent = `${item[0]}: ${item[1]}`;
    wrapper.appendChild(p);
  })
}

function getBackgroundImage(cityValue) {
  fetch(`https://api.unsplash.com/search/photos?query=${cityValue}&client_id=WdKmaCWM493X2x7wxCB_uTQC6B_rWj7tkWlewDTIUQ4`)
    .then(response => response.json())
    .then(jsonData => {
      const num = Math.floor(Math.random() * 10) + 1;
      body.style.cssText = `background: URL('${jsonData.results[num].urls.full}'); background-size: cover;
    background - repeat: no - repeat;`;
    });
}
