import{getWeather} from './weather'
const inputImage = document.getElementById('input-image');
const cityInput = document.getElementById('city-input');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const cityName = document.getElementById('city-name');
const temp = document.querySelector('#temp-div .temp-value');
const minTemp = document.querySelector('#min-temp .temp-value');
const maxTemp = document.querySelector('#max-temp .temp-value');
const feelsLike = document.querySelector('#feels-like-temp .temp-value');
const description = document.getElementById('description')
const humidity = document.getElementById('humidity')
const windSpeed = document.getElementById('wind-speed')
const toggleUnitButton = document.getElementById('toggle-unit-button');
const unitAll = document.querySelectorAll('.temp-div .temp-unit') 
const weatherLogo = document.getElementById('weather-logo')
const loadingTyreDiv = document.getElementById('loading-tyre-div');
const errorDiv = document.getElementById('error-div');
const tryAgainButton = document.getElementById('try-again-button');
const errorMessage = document.querySelector('#error-div p');

let weather;
const start = async()=>{
  await displayWeatherDiv('Indore');  
  inputImage.addEventListener('click',toggleInput);
  toggleUnitButton.addEventListener('click',toggleUnit)
  tryAgainButton.addEventListener('click',searchWeather)
  cityInput.addEventListener('keyup',(event)=>{
    if(event.keyCode==13){
      searchWeather();
    }
  })
}
function toggleInput(){
  cityInput.classList.toggle('show-input');
}

function displayWeather(weather){
  latitude.innerText = weather.lat;
  longitude.innerText = weather.lon;
  cityName.innerText =weather.name;
  description.innerText = weather.description;
  humidity.innerText = 'Humidity : '+weather.humidity+'%';
  windSpeed.innerText = 'Wind : '+weather.windSpeed+' km/h';
  weatherLogo.src=`http://openweathermap.org/img/wn/${weather.icon}@2x.png`
  document.body.style.backgroundImage = `url("./weather-backgrounds/${weather.description.replace(/\s+/g,'')}.jpg") , url("./weather-backgrounds/fewclouds.jpg")`;
  displayValue(weather);
}
function displayValue(weather){
  const temps=[weather.temp,weather.tempMin,weather.tempMax,weather.feelsLike]
  if(toggleUnitButton.innerText.includes('F')){
  [temp,minTemp,maxTemp,feelsLike].forEach((element,i)=>{
    element.innerText = toC(temps[i])
  })
}else{
  [temp,minTemp,maxTemp,feelsLike].forEach((element,i)=>{
    element.innerText = toF(temps[i]);
  })
}

unitAll.forEach((element)=>{
  element.innerText = (toggleUnitButton.innerText.includes('F')?'C':'F');
})
}
function toC(value){
  return (value-273.15).toFixed(2);
}
function toF(value){
  return (toC(value)*(9/5)+32).toFixed(2);
}
function toggleUnit(){
  if(toggleUnitButton.innerText.includes('F')){
    toggleUnitButton.innerHTML = '&#176;C';
  }else{
    toggleUnitButton.innerHTML = '&#176;F';
  }
  displayValue(weather);
}
async function displayWeatherDiv(city){
  errorDiv.classList.remove('show-error')
  loadingTyreDiv.classList.add('show-loading')
  weather = await getWeather(city);
  loadingTyreDiv.classList.remove('show-loading')
  if(weather!=null){
    displayWeather(weather);
  }else{
    errorDiv.classList.add('show-error')
  }
}
function searchWeather(){
  displayWeatherDiv(cityInput.value);
}
export {start};