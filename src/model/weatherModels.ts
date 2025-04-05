export interface CurrentWeather {
  city: string;
  timestamp: Date;
  temperature: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  weather: string;
  precipitation?: number; // when it is not rain or snow this field won't be there
}

export interface Forecast {
  city: string;
  forecast_time: Date; // when the forecast applies to
  fetched_time: Date; // when we fetched this forecast from API
  temperature: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  weather: string;
  precipitation?: number;
}
