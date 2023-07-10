const iconData = document.querySelector('img');
const locationData = document.querySelector('#location');
const conditionData = document.querySelector('#condition');
const body = document.querySelector('body');

async function getWeather() {
  try {
    const response = await fetch("https://api.weatherapi.com/v1/current.json?key=eb5dbdb018c94d67812132539230707&q=London&aqi=no");
    const json = await response.json();
    displayWeather(json);
    console.log(json);
  } catch (err) {
    console.log(err);
  }
}

function displayWeather(data) {
  iconData.src = data.current.condition.icon;
  locationData.textContent = data.location.name;
  conditionData.textContent = data.current.condition.text;
  let array = Object.entries(data.current);
  array.forEach(item => {
    const p = document.createElement('p');
    p.textContent = `${item[0]}: ${item[1]}`;
    body.appendChild(p);
  })
}

getWeather();