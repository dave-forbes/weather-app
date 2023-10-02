import date from "date-and-time";
import wcc from "world-countries-capitals";

async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=eb5dbdb018c94d67812132539230707&q=${location}&aqi=no`
    );
    const json = await response.json();
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

  const mainContent = document.querySelector(".main-content");

  if (data.current.is_day == 1) {
    mainContent.classList.add("day-time-background");
    mainContent.classList.remove("night-time-background");
  } else {
    mainContent.classList.add("night-time-background");
    mainContent.classList.remove("day-time-background");
  }

  const country = document.querySelector(".country");

  let icon;
  if (data.location.tz_id.includes("Europe")) {
    icon = '<i class="fa-solid fa-earth-europe"></i>';
  } else if (data.location.tz_id.includes("Asia")) {
    icon = '<i class="fa-solid fa-earth-asia"></i>';
  } else if (data.location.tz_id.includes("Africa")) {
    icon = '<i class="fa-solid fa-earth-africa"></i>';
  } else if (data.location.tz_id.includes("America")) {
    icon = '<i class="fa-solid fa-earth-americas"></i>';
  } else if (data.location.tz_id.includes("Pacific")) {
    icon = '<i class="fa-solid fa-earth-oceania"></i>';
  } else {
    icon = '<i class="fa-solid fa-earth-americas"></i>';
  }
  country.innerHTML = `
    ${icon}
    <p class="translucent">Country</p>
    <p>${data.location.country}</p>
  `;

  const tempData = document.querySelector(".temp");
  tempData.innerHTML = `
    <i class="fa-solid fa-temperature-quarter"></i> 
    <p class="translucent">Temperature</p>
    <p>${data.current.temp_c}°</p>
  `;

  const wind = document.querySelector(".wind");
  wind.innerHTML = `
    <i class="fa-solid fa-wind"></i>
    <p class="translucent">Wind</p>
    <p>${data.current.wind_mph}mph ${data.current.wind_dir}</p>
  `;

  const humidity = document.querySelector(".humidity");
  humidity.innerHTML = `
    <i class="fa-solid fa-droplet"></i>
    <p class="translucent">Humidity</p>
    <p>${data.current.humidity}%</p>
  `;

  const precipitation = document.querySelector(".precipitation");
  precipitation.innerHTML = `
    <i class="fa-solid fa-cloud-rain"></i>
    <p class="translucent">Precipitation</p>
    <p>${data.current.precip_mm}mm</p>
  `;

  const uv = document.querySelector(".uv");
  uv.innerHTML = `
    <i class="fa-regular fa-sun"></i>
    <p class="translucent">UV Index</p>
    <p>${data.current.uv}</p>
  `;
}

function showMoreData() {
  const dataWrapper = document.querySelector(".data-wrapper");
  const moreInfo = document.querySelector(".more-info");
  dataWrapper.classList.toggle("hide");
  moreInfo.classList.toggle("hide");
}

function getWeatherForRandomLocation() {
  const randomCountry = wcc.getRandomCountry();
  const randomCountryInfo = wcc.getCountryDetailsByName(randomCountry);
  const randomCapital = randomCountryInfo[0].capital;
  getWeather(randomCapital);
}

async function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error)
    );
  });
}

async function getWeatherBasedOnLocation() {
  try {
    const position = await getPosition();
    const coordinates = `${position.coords.latitude}, ${position.coords.longitude}`;
    getWeather(coordinates);
  } catch (error) {
    console.error("Error getting location:", error.message);
  }
}

function getWeatherFromSearch() {
  const input = document.querySelector("input");
  getWeather(input.value);
}

(function eventListeners() {
  const menuButton = document.querySelector(".fa-circle-info");
  const button = document.querySelector("i.fa-magnifying-glass");
  const shuffleButton = document.querySelector("i.fa-shuffle");
  menuButton.addEventListener("click", showMoreData);
  button.addEventListener("click", getWeatherFromSearch);
  shuffleButton.addEventListener("click", getWeatherForRandomLocation);
})();

getWeatherBasedOnLocation();
