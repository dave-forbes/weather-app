const iconData = document.querySelector('img');
const locationData = document.querySelector('#location');
const conditionData = document.querySelector('#condition');
const body = document.querySelector('body');
const wrapper = document.querySelector('#content-wrapper');


navigator.geolocation.getCurrentPosition((position) => {
  getWeather(position.coords.latitude, position.coords.longitude);
});

async function getWeather(latitude, longitude) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=eb5dbdb018c94d67812132539230707&q=${latitude},${longitude}&aqi=no`);
    const json = await response.json();
    const tzID = json.location.tz_id;
    const cityArray = tzID.split('/');
    const city = cityArray[1];
    await getBackgroundImage(city);
    displayWeather(json);
  } catch (err) {
    console.log(err);
  }
}

function displayWeather(data) {
  iconData.src = data.current.condition.icon;
  locationData.textContent = data.location.name;
  conditionData.textContent = data.current.condition.text;
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
      console.log(jsonData);
      const num = Math.floor(Math.random() * 10) + 1;
      body.style.cssText = `background: URL('${jsonData.results[num].urls.regular}'); background-size: cover;
    background - repeat: no - repeat; background-postion:center;`;
    })
}
