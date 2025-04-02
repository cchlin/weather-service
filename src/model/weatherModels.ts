export interface CurrentWeather {
  city: string;
  timestamp: Date;
  temperature: number;
  feels_like: number;
  temp_min: number;
  temp_nax: number;
  weather: string;
  precipitation?: number; // when it is not rain or snow this field won't be there
}

export interface Forecast {
  city: string;
  forecast_time: Date;
  fetched_time: Date;
  temperature: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  weather: string;
  precipitation?: number;
}
