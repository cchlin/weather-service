import { buildUrl, retry } from "../util/util";
import { Logger } from "../util/Logger";

const UNIT = "imperial";

export class WeatherApi {
  async getCurrentWeather(city: string): Promise<any | undefined> {
    return await this.fetchData("weather", city);
  }

  async getForecast(city: string): Promise<any | undefined> {
    return await this.fetchData("forecast", city);
  }

  private async fetchData(endpoint: string, city: string): Promise<any> {
    const url = buildUrl(endpoint, city, UNIT);
    const label = `${endpoint} for ${city}`;

    return await retry(async () => {
      Logger.info(`Fetching ${label}...`);
      const res = await fetch(url);

      if (!res.ok) {
        Logger.error(
          `Fetch failed: ${label} returned ${res.status} ${res.statusText}`
        );
        throw new Error(`HTTP error: ${res.status}`);
      }

      Logger.info(`Fetched ${endpoint} for ${city}`);
      return res.json();
    }, label);
  }
}
