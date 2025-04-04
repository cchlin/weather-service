import { CurrentWeather, Forecast } from "../model/weatherModels";
import postgres from "postgres";

export class WeatherRepo {
  constructor(private sql: postgres.Sql) {}
  async saveCurrentWeather(data: CurrentWeather): Promise<CurrentWeather> {
    const weather = await this.sql<
      CurrentWeather[]
    >`INSERT INTO current_weather(
      city,
      timestamp,
      temperature,
      feels_like,
      temp_min,
      temp_max,
      weather,
      precipitation) VALUES (
       ${data.city},
       ${data.timestamp},
       ${data.temperature},
       ${data.feels_like},
       ${data.temp_min},
       ${data.temp_max},
       ${data.weather},
       ${data.precipitation ?? null});`;

    return weather[0];
  }

  async saveForecast(data: Forecast): Promise<void> {
    // dummyForecast.push(data);
    // console.log(`Saved forecast for ${data.city} at ${data.forecast_time}`);
  }

  // async getMostRecentWeather(
  // city: string
  // ): Promise<CurrentWeather | undefined> {
  // return dummyCurrent[0];
  // }
  //
  // async getForecast(city: string): Promise<Forecast[]> {
  // return dummyForecast.filter((entry) => entry.city === city);
  // }
}
