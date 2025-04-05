import { buildUrl, retry } from "../util/util";
import { Logger } from "../util/Logger";

const UNIT = "imperial"; // Temperature unit to use for API requests

export class WeatherApi {
  // Fetches current weather data for a city from OpenWeatherMap
  async getCurrentWeather(city: string): Promise<any | undefined> {
    return await this.fetchData("weather", city);
  }

  // Fetches 5-day / 3-hour forecast data for a city
  async getForecast(city: string): Promise<any | undefined> {
    return await this.fetchData("forecast", city);
  }

  // Helper heneric method to fetch data from a specific API endpoint with retry logic
  private async fetchData(endpoint: string, city: string): Promise<any> {
    const url = buildUrl(endpoint, city, UNIT); // construct full API URL
    const label = `${endpoint} for ${city}`; // used for logging and retries

    return await retry(async () => {
      Logger.info(`Fetching ${label}...`);

      const res = await fetch(url); // perform HTTP request

      if (!res.ok) {
        Logger.error(
          `Fetch failed: ${label} returned ${res.status} ${res.statusText}`
        );
        throw new Error(`HTTP error: ${res.status}`); // triggers retry
      }

      Logger.info(`Fetched ${endpoint} for ${city}`);
      return res.json(); // parse and return response data
    }, label);
  }
}
