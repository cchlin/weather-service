import { WeatherApi } from "./WeatherApi";
import { WeatherRepo } from "../repository/WeatherRepo";
import { mapToFields } from "../util/transformers";
import { CurrentWeather, Forecast } from "../model/weatherModels";

export class WeatherService {
  constructor(private api: WeatherApi, private repo: WeatherRepo) {}

  async fetchSaveCurrent(city: string): Promise<boolean> {
    try {
      const current = await this.api.getCurrentWeather(city);

      if (!current) {
        return false;
      } else {
        const transformed: CurrentWeather = {
          city: current.city,
          timestamp: new Date(current.dt * 1000), // response is in second but js/ts Date needs milliseconds so * 1000
          ...mapToFields(current),
        };

        await this.repo.saveCurrentWeather(transformed);
        return true;
      }
    } catch (err) {
      console.error(`Failed to fetch/save current weather for ${city}`, err);
      return false;
    }
  }

  async fetchSaveForecast(city: string): Promise<boolean> {
    try {
      const forecastList = await this.api.getForecast(city);
      if (!forecastList || !forecastList.list) return false;

      for (const item of forecastList.list) {
        const transformed: Forecast = {
          city,
          forecast_time: new Date(item.dt * 1000),
          fetched_time: new Date(),
          ...mapToFields(item),
        };
        await this.repo.saveForecast(transformed);
      }

      return true;
    } catch (err) {
      console.error(`Failed to fetch/save forecast for ${city}`, err);
      return false;
    }
  }
}
