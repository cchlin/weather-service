import { config } from "../config/config";
import { CurrentWeather, Forecast } from "../model/weatherModels";
import { mapToFields } from "../util/transformers";

export class WeatherApi {
  async getCurrentWeather(city: string): Promise<CurrentWeather | undefined> {
    const data = await this.fetchData("weather", city);

    if (!data) return;

    // console.log(`Current weather in ${city}: `, data);

    const weatherData = mapToFields(data);
    return {
      city: data.name,
      timestamp: new Date(data.dt * 1000), // response is in second but js/ts Date needs milliseconds so * 1000
      ...weatherData,
    };
  }

  async getForecast(city: string): Promise<Forecast[] | undefined> {
    const data = await this.fetchData("forecast", city);

    if (!data) return;

    // console.log(`Forecast for ${city}: `, data);

    const fetchedTime = new Date();

    return data.list.map((entry: any) => {
      const weatherData = mapToFields(entry);

      return {
        city: data.city.name,
        forecast_time: new Date(entry.dt * 1000),
        fetched_time: fetchedTime,
        ...weatherData,
      };
    });
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
