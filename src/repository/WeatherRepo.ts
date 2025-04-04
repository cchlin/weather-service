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
       ${data.precipitation ?? null})
      RETURNING *;`;

    return weather[0];
  }

  async saveForecast(data: Forecast): Promise<Forecast> {
    const forecast = await this.sql<Forecast[]>`
    INSERT INTO forecast (
    city,
    forecast_time,
    fetched_time,
    temperature,
    feels_like,
    temp_min,
    temp_max,
    weather,
    precipitation) VALUES (
      ${data.city},
      ${data.forecast_time},
      ${data.fetched_time},
      ${data.temperature},
      ${data.feels_like},
      ${data.temp_min},
      ${data.temp_max},
      ${data.weather},
      ${data.precipitation ?? null})
    RETURNING *;`;

    return forecast[0];
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
