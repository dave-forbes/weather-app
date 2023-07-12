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
  gif.src = '/images/loading.png';
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
  const conditionData = document.createElement('h2');
  const iconData = document.createElement('img');
  locationData.textContent = `${data.location.name}, ${data.location.country}`;
  conditionData.textContent = data.current.condition.text;
  iconData.src = data.current.condition.icon;
  wrapper.appendChild(locationData);
  wrapper.appendChild(conditionData);
  wrapper.appendChild(iconData);
  let array = Object.entries(data.current);
  let filteredArray = [array[2], array[16], array[6], array[21], array[9], array[12], array[14], array[19], array[20]];
  filteredArray.forEach(item => {
    const p = document.createElement('p');
    const itemZero = item[0].split('_');
    console.log(itemZero);
    if (itemZero[1] == 'dir') {
      p.textContent = `${itemZero[0]} - ${item[1]}`;
    } else if (itemZero[1]) {
      p.textContent = `${itemZero[0]} - ${item[1]}${itemZero[1]}`;
    } else {
      p.textContent = `${itemZero[0]} - ${item[1]}`;
    }
    wrapper.appendChild(p);
  })
}

async function getBackgroundImage(locationValue) {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${locationValue}&client_id=WdKmaCWM493X2x7wxCB_uTQC6B_rWj7tkWlewDTIUQ4`)
    const jsonData = await response.json()
    const num = Math.floor(Math.random() * 10) + 1;
    body.style.cssText = `background: URL('${jsonData.results[num].urls.full}'); background-size: cover;
    background - repeat: no - repeat;`;
    inputWrapper.style.display = 'flex';
  }
  catch (err) {
    console.log(err);
  }
};
