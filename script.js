const icon = document.querySelector('img');

async function getWeather() {
  try {
    const response = await fetch("https://api.weatherapi.com/v1/current.json?key=eb5dbdb018c94d67812132539230707&q=London&aqi=no");
    const json = await response.json();
    displayWeather(json);
  } catch (err) {
    console.log(err);
  }
}

function displayWeather(data) {
  icon.src = data.current.condition.icon;
}

getWeather();