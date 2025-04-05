import { buildUrl, retry } from "../util/util";

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

    return await retry(
      async () => {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        console.log(
          `[${new Date().toLocaleString()}] Fetched ${endpoint} for ${city}`
        );
        return res.json();
      },
      3,
      1000
    );
  }
}
