import { config } from "../config/config";
import { CurrentWeather, Forecast } from "../model/weatherModels";
import { mapToFields } from "../util/transformers";

const UNIT = "imperial";

export class WeatherApi {
  async getCurrentWeather(city: string): Promise<any | undefined> {
    return await this.fetchData("weather", city);
  }

  async getForecast(city: string): Promise<any | undefined> {
    return await this.fetchData("forecast", city);
  }

  private async fetchData(endpoint: string, city: string): Promise<any> {
    const url = this.buildUrl(endpoint, city);

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      return res.json();
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Error fetching ${endpoint} for ${city}`, err.message);
      } else {
        console.error(
          `unknown error occurred while fetching ${endpoint} for ${city}`,
          err
        );
      }
    } finally {
      console.log(`Done fetching ${endpoint} for ${city}`);
    }
  }

  private buildUrl(endpoint: string, city: string): string {
    const url = new URL(endpoint, config.baseUrl);
    url.searchParams.append("q", city);
    url.searchParams.append("appid", config.apiKey);
    url.searchParams.append("units", UNIT);

    return url.href;
  }
}
