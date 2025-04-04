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
          city: current.name,
          timestamp: new Date(current.dt * 1000), // response is in second but js/ts Date needs milliseconds so * 1000
          ...mapToFields(current),
        };

        const saved = await this.repo.saveCurrentWeather(transformed);
        console.log(`Done saving current weather for ${saved.city}`);
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

      const tasks = forecastList.list.map((item: any) => {
        const transformed: Forecast = {
          city,
          forecast_time: new Date(item.dt * 1000),
          fetched_time: new Date(),
          ...mapToFields(item),
        };
        return this.repo.saveForecast(transformed).then((saved) => {
          console.log(
            `Saved forecast for ${saved.city} at ${saved.forecast_time}`
          );
        });
      });

      await Promise.all(tasks);
      console.log(`Done saving forecast for ${city}`);
      return true;
    } catch (err) {
      console.error(`Failed to fetch/save forecast for ${city}`, err);
      return false;
    }
  }
}
