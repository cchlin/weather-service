import { config } from "../config/config";
import { Logger } from "./Logger";

export const mapToFields = (
  source: any
): {
  temperature: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  weather: string;
  precipitatin?: number;
} => {
  return {
    temperature: source.main.temp,
    feels_like: source.main.feels_like,
    temp_min: source.main.temp_min,
    temp_max: source.main.temp_max,
    weather: source.weather[0].main,
    precipitatin:
      source.rain?.["1h"] ||
      source.rain?.["3h"] ||
      source.snow?.["1h"] ||
      source.snow?.["3h"],
  };
};

export const buildUrl = (
  endpoint: string,
  city: string,
  unit: string
): string => {
  const url = new URL(endpoint, config.baseUrl);
  url.searchParams.append("q", city);
  url.searchParams.append("appid", config.apiKey);
  url.searchParams.append("units", unit);

  return url.href;
};

export const retry = async <T>(
  fn: () => Promise<T>,
  label: string
): Promise<T> => {
  let delay = 1000;
  let retries = 3;
  let attempt = 0;

  while (attempt <= retries) {
    try {
      return await fn(); // success
    } catch (err) {
      attempt++;
      if (attempt >= retries) {
        throw err;
      }
      Logger.warn(`Retry ${label} (${attempt}/${retries})...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }

  // unreachable but if I don't throw, typescirpt is not happy
  throw new Error("Exceeded retires");
};
