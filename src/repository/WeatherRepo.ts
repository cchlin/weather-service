import { CurrentWeather, Forecast } from "../model/weatherModels";

const dummyCurrent: CurrentWeather[] = [];
const dummyForecast: Forecast[] = [];

export class WeatherRepo {
  async saveCurrentWeather(data: CurrentWeather): Promise<void> {
    dummyCurrent.push(data);
    console.log(`Saved current weather for ${data.city}`);
  }

  async saveForecast(data: Forecast): Promise<void> {
    dummyForecast.push(data);
    console.log(`Saved forecast for ${data.city} at ${data.forecast_time}`);
  }

  async getMostRecentWeather(
    city: string
  ): Promise<CurrentWeather | undefined> {
    return dummyCurrent[0];
  }

  async getForecast(city: string): Promise<Forecast[]> {
    return dummyForecast.filter((entry) => entry.city === city);
  }
}
