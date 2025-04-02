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
    weather: source.weather[0].description,
    precipitatin:
      source.rain?.["1h"] ||
      source.rain?.["3h"] ||
      source.snow?.["1h"] ||
      source.snow?.["3h"],
  };
};
