import {getWeather} from './weather';
import {start} from './ui'
start();
(async ()=>{
  const weather = await getWeather('Indore');
  
})()
