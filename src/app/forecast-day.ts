/* Class in which meteorological information is stored*/
export class ForecastDay {
  constructor(public city:string,
              public country:string,
              public temperature:string,
              public day:string,
              public icon:string,
              public tempMax:string,
              public tempMin: string,
              public feelslike: string,
              public humidity: string,
              public pressure:string){}
}
