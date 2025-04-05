import { CurrentWeather, Forecast } from "../model/weatherModels";
import postgres from "postgres";

export class WeatherRepo {
  constructor(private sql: postgres.Sql) {}

  // Inserts current weather data into DB and returns the inserted row
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

  // Inserts or updates forecast data (upsert on city + forecast_time)
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
        precipitation
      ) VALUES (
        ${data.city},
        ${data.forecast_time},
        ${data.fetched_time},
        ${data.temperature},
        ${data.feels_like},
        ${data.temp_min},
        ${data.temp_max},
        ${data.weather},
        ${data.precipitation ?? null}
      )
      ON CONFLICT (city, forecast_time) DO UPDATE SET
        fetched_time = EXCLUDED.fetched_time,
        temperature = EXCLUDED.temperature,
        feels_like = EXCLUDED.feels_like,
        temp_min = EXCLUDED.temp_min,
        temp_max = EXCLUDED.temp_max,
        weather = EXCLUDED.weather,
        precipitation = EXCLUDED.precipitation
      RETURNING *;
    `;

    return forecast[0];
  }

  // Retrieves the most recent current weather record for a city
  async getMostRecentWeather(
    city: string
  ): Promise<CurrentWeather | undefined> {
    const weather = await this.sql<CurrentWeather[]>`
      SELECT * FROM current_weather
      WHERE city = ${city}
      ORDER BY timestamp DESC
      LIMIT 1;`;

    return weather[0];
  }

  // Retrieves up to 40 forecast records for a city ordered by forecast time
  async getForecast(city: string): Promise<Forecast[] | undefined> {
    const forecast = await this.sql<Forecast[]>`
      SELECT * FROM forecast
      WHERE city = ${city}
      ORDER BY forecast_time ASC
      LIMIT 40;`;

    return forecast;
  }
}
