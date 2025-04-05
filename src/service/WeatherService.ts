import { WeatherApi } from "./WeatherApi";
import { WeatherRepo } from "../repository/WeatherRepo";
import { mapToFields } from "../util/util";
import { CurrentWeather, Forecast } from "../model/weatherModels";
import { Logger } from "../util/Logger";

export class WeatherService {
  constructor(private api: WeatherApi, private repo: WeatherRepo) {}

  async getMostRecentWeather(
    city: string
  ): Promise<CurrentWeather | undefined> {
    return this.repo.getMostRecentWeather(city);
  }

  async getForecast(city: string): Promise<Forecast[] | undefined> {
    return this.repo.getForecast(city);
  }

  async fetchSaveCurrent(cities: string[]): Promise<boolean> {
    return this.runForFetchSave(cities, (city) =>
      this.fetchSaveCurrentCity(city)
    );
  }

  async fetchSaveForecast(cities: string[]): Promise<boolean> {
    return this.runForFetchSave(cities, (city) =>
      this.fetchSaveForecastCity(city)
    );
  }

  private async runForFetchSave(
    cities: string[],
    action: (city: string) => Promise<boolean>
  ): Promise<boolean> {
    let allSucceeded = true;

    for (const city of cities) {
      const success = await action(city);
      if (!success) {
        allSucceeded = false;
      }
    }

    return allSucceeded;
  }

  private async fetchSaveCurrentCity(city: string): Promise<boolean> {
    try {
      Logger.info(`Start fetch & save current weather for ${city}`);

      const current = await this.api.getCurrentWeather(city);

      if (!current) {
        Logger.warn(`No current weather data returned for ${city}`);
        return false;
      } else {
        const transformed: CurrentWeather = {
          city: current.name,
          timestamp: new Date(current.dt * 1000), // response is in second but js/ts Date needs milliseconds so * 1000
          ...mapToFields(current),
        };

        const saved = await this.repo.saveCurrentWeather(transformed);
        Logger.info(`Done saving current weather for ${saved.city}`);
        return true;
      }
    } catch (err) {
      Logger.error(`Failed to save current weather for ${city}`, err);
      return false;
    }
  }

  private async fetchSaveForecastCity(city: string): Promise<boolean> {
    try {
      Logger.info(`Start fetch & save forecast for ${city}`);

      const forecastList = await this.api.getForecast(city);
      if (!forecastList || !forecastList.list) {
        Logger.warn(`No forecast data returned for ${city}`);
        return false;
      }

      const tasks = forecastList.list.map((item: any) => {
        const transformed: Forecast = {
          city,
          forecast_time: new Date(item.dt * 1000),
          fetched_time: new Date(),
          ...mapToFields(item),
        };
        return this.repo.saveForecast(transformed).then((saved) => {
          Logger.info(
            `Saved forecast ${tasks.length} for ${saved.city} at ${saved.forecast_time}`
          );
        });
      });

      await Promise.all(tasks);
      Logger.info(`Done saving forecast for ${city}`);
      return true;
    } catch (err) {
      Logger.error(`Failed to save forecast for ${city}`, err);
      return false;
    }
  }
}
