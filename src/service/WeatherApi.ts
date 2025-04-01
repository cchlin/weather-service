import { config } from "../config/config";

const CITY = "Seattle";
export class WeatherApi {
  async getCurrentWeather() {
    const data = await this.fetchData("weather", CITY);
    console.log(`Current weather in ${CITY}: `, data);
  }

  async getForecast() {
    const data = await this.fetchData("forecast", CITY);
    console.log(`Forecast for ${CITY}: `, data);
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

    return url.href;
  }
}
