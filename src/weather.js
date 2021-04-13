const apiKey = '0dc5e3fb3361ed15f243a8433ec2d397';
const getWeather = async location=>{
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`,{mode:"cors"}).catch(()=>null)
  if(response==null)return null;
  const weather = await response.json();
  if(weather.cod=='404')return null;
  return {
    'description':weather.weather['0'].description,
    'lon':weather.coord.lon,
    'lat':weather.coord.lat,
    'temp':weather.main.temp,
    'tempMax':weather.main['temp_max'],
    'tempMin':weather.main['temp_min'],
    'humidity':weather.main.humidity
    ,icon:weather.weather['0'].icon,
    name:weather.name,
    windSpeed : weather.wind.speed,
    feelsLike: weather.main.feels_like
  }
}
export {getWeather}; 