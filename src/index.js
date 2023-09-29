import date from "date-and-time";
import wcc from "world-countries-capitals";

const input = document.querySelector("input");
const button = document.querySelector("i.fa-magnifying-glass");

navigator.geolocation.getCurrentPosition((position) => {
  getWeather(`${position.coords.latitude}, ${position.coords.longitude}`);
});

button.addEventListener("click", () => {
  getWeather(input.value);
});

const shuffleButton = document.querySelector("i.fa-shuffle");

shuffleButton.addEventListener("click", getWeatherForRandomLocation);

async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=eb5dbdb018c94d67812132539230707&q=${location}&aqi=no`
    );
    const json = await response.json();
    console.log(json);
    displayWeather(json);
  } catch (err) {
    console.log(err);
  }
}

function displayWeather(data) {
  const localTime = new Date(data.location.localtime);

  const dayOfTheWeek = date.format(localTime, "dddd");

  const dayNow = document.querySelector("p.day");
  dayNow.textContent = dayOfTheWeek;

  const time = date.format(localTime, "h:mm A");

  const timeNow = document.querySelector("p.time");
  timeNow.textContent = time;

  const locationData = document.querySelector("h1.title");
  locationData.textContent = data.location.name;

  const condition = document.querySelector(".condition");
  condition.innerHTML = `<img src="${data.current.condition.icon}"> ${data.current.condition.text}`;

  const temp = document.querySelector(".temperature");
  temp.textContent = `${data.current.temp_c}°`;

  const body = document.querySelector("body");

  if (data.current.is_day == 1) {
    body.classList.add("day-time-background");
    body.classList.remove("night-time-background");
  } else {
    body.classList.add("night-time-background");
    body.classList.remove("day-time-background");
  }

  // wrapper.innerHTML = "";

  // const locationData = document.createElement("h1");
  // locationData.textContent = data.location.name;
  // wrapper.appendChild(locationData);

  // const conditionData = document.createElement("h2");
  // conditionData.textContent = data.current.condition.text;
  // wrapper.appendChild(conditionData);

  // const iconData = document.createElement("img");
  // iconData.src = data.current.condition.icon;
  // wrapper.appendChild(iconData);

  // const temp = document.createElement("p");
  // temp.textContent = `${data.current.temp_c}°C`;
  // wrapper.appendChild(temp);

  // const wind = document.createElement("p");
  // wind.textContent = `Wind Speed: ${data.current.wind_mph}mph`;
  // wrapper.appendChild(wind);

  // const windDirection = document.createElement("p");
  // windDirection.textContent = `Wind Direction: ${data.current.wind_dir}`;
  // wrapper.appendChild(windDirection);

  // const rain = document.createElement("p");
  // rain.textContent = `Precipitation: ${data.current.precip_mm}mm`;
  // wrapper.appendChild(rain);

  // const humidity = document.createElement("p");
  // humidity.textContent = `Humidity: ${data.current.humidity}%`;
  // wrapper.appendChild(humidity);
}

function getWeatherForRandomLocation() {
  const randomCountry = wcc.getRandomCountry();
  const randomCountryInfo = wcc.getCountryDetailsByName(randomCountry);
  const randomCapital = randomCountryInfo[0].capital;

  getWeather(randomCapital);
}
