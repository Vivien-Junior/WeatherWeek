import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ForecastDay } from '../forecast-day';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  forecastDays:ForecastDay[] = [];
  today:ForecastDay;
  searchForm: FormGroup;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(){
    this.searchForm = new FormGroup({
      searchCity: new FormControl('')
    });
    this.getLocation();
  }

  /* Fuction that generates the weather forecast for the location */
  onSubmit(){
    const cityName = this.searchForm.value.searchCity;
    this.weatherService.getWeatherOfDayByName(cityName).subscribe(dataDayWeather=>{
      this.getTodayWeather(dataDayWeather);
    });
    this.weatherService.getWeatherLocationByName(cityName).subscribe(dataForecastWeather=>{
      this.getForecastWeather(dataForecastWeather);
    });
  }

  /* Default application display */
  getLocation(){
    /* Take the user's location */
    if("geolocation" in navigator){
        navigator.geolocation.watchPosition(
          (success)=>{
            const latitude = success.coords.latitude;
            const longitude = success.coords.longitude;

            this.weatherService.getWeatherOfDayByCoord(latitude, longitude).subscribe(data=>{
              this.getTodayWeather(data);
            });

            this.weatherService.getWeatherLocationByCoord(latitude, longitude).subscribe(data2=>{
              this.getForecastWeather(data2);
            });
          },
          /* if geolocation is desactivate */
          (error)=>{this.setDefaultLocation()}
        );
    }
    /* Paris default location if the navigator haven't geolocation */
    else{this.setDefaultLocation()}
  }

  /* Paris default location if the navigator haven't geolocation or if geolocation is desactivate */
  setDefaultLocation(){
    const name = "Paris";
    this.weatherService.getWeatherOfDayByName(name).subscribe(data=>{
      this.getTodayWeather(data);
    });

    this.weatherService.getWeatherLocationByName(name).subscribe(data2=>{
      this.getForecastWeather(data2);
    });
  }

  /* Retrieve the day's weather */
  getTodayWeather(data:any){
    this.today = new ForecastDay(data.name,
                                data.sys.country,
                                Math.floor(data.main.temp).toString(),
                                null,
                                data.weather[0].icon,
                                null,null,
                                Math.floor(data.main.feels_like).toString(),
                                data.main.humidity,
                                data.main.pressure);
  }

  /* Retrieve the forecast weather */
  getForecastWeather(data:any){
    this.forecastDays = [];
    for(let i = 8; i < data.list.length; i+=8){
      const temp = new ForecastDay(null, null, null,
                                    data.list[i].dt_txt.split(' ')[0],
                                    data.list[i].weather[0].icon.substr(0, 2)+'d',
                                    Math.floor(this.findMaxTemp(data, i)).toString(),
                                    Math.floor(this.findMinTemp(data, i)).toString(),
                                    null, null, null);
      this.forecastDays.push(temp);
    }
  }

  /* Compare the maximum weather of the day and return the highest temperature */
  findMaxTemp(data:any, index){
    var max = 0.0;
    for(let i = index; i < index+8 && i < data.list.length; i++){
      if(data.list[i].main.temp_max > max)
        max = data.list[i].main.temp_max;
    }
    return max;
  }

  /* Compare the minimum weather of the day and return the smallest temperature */
  findMinTemp(data:any, index){
    var min = 100.0;
    for(let i = index; i < index+8 && i < data.list.length; i++){
      if(data.list[i].main.temp_min < min)
        min = data.list[i].main.temp_min;
    }
    return min;
  }
}
