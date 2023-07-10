async function getWeather() {
  try {
    const response = await fetch("https://api.weatherapi.com/v1/current.json?key=eb5dbdb018c94d67812132539230707&q=London&aqi=no");
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch (err) {
    console.log(err);
  }
}

getWeather();