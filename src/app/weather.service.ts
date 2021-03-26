import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ForecastDay } from './forecast-day'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  /* Key of openweathermap API*/
  myKey = '8a7c959b5c07c0987335d7f9b976619c';

  constructor(private _http: HttpClient){ }

  /* Get the day weather by the name of the city*/
  getWeatherOfDayByName(cityName){
    const urlToday = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + this.myKey + '&units=metric';
    return this._http.get(urlToday);;
  }

  /* Get the day weather by the coordinates of the city*/
  getWeatherOfDayByCoord(lat, long){
    const urlToday = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + this.myKey + '&units=metric';
    return this._http.get(urlToday);
  }

  /* Get the weather forecast for the next 4 days by the name of the city*/
  getWeatherLocationByName(cityName){
    const urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + this.myKey + '&units=metric';
    return this._http.get(urlForecast);
  }

  /* Get the weather forecast for the next 4 days by the coordinates of the city*/
  getWeatherLocationByCoord(lat, long){
    const urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=' + this.myKey + '&units=metric';
    return this._http.get(urlForecast);
  }

}
