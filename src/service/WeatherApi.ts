import { config } from "../config/config";

export class WeatherApi {
  async getCurrentWeather() {
    const url = this.buildUrl("weather");

    try {
      const res = await fetch(url.href);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      console.log("Current weather:", data);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching current weather: ", err.message);
      } else {
        console.error(
          "Unknown error occurred while fetching current weather: ",
          err
        );
      }
    } finally {
      console.log("Done fetching");
    }
  }

  async getForecase() {
    const url = this.buildUrl("forecase");
  }

  private buildUrl(endpoint: string): URL {
    const url = new URL(endpoint, config.baseUrl);
    url.searchParams.append("q", "Seattle");
    url.searchParams.append("appid", config.apiKey);

    return url;
  }
}
