import { CurrentWeather } from "../model/weatherModels";
import { WeatherRepo } from "../repository/WeatherRepo";
import { WeatherApi } from "../service/WeatherApi";
import { WeatherService } from "../service/WeatherService";

// mock classes
const mockGetCurrentWeather = jest.fn();
const mockSaveCurrentWeather = jest.fn();
const mockGetForecast = jest.fn();
const mockSaveForecast = jest.fn();

jest.mock("../service/WeatherApi", () => {
  return {
    WeatherApi: jest.fn().mockImplementation(() => ({
      getCurrentWeather: mockGetCurrentWeather,
      getForecast: mockGetForecast,
    })),
  };
});

jest.mock("../repository/WeatherRepo", () => {
  return {
    WeatherRepo: jest.fn().mockImplementation(() => ({
      saveCurrentWeather: mockSaveCurrentWeather,
      saveForecast: mockSaveForecast,
    })),
  };
});

describe("WeatherService", () => {
  let service: WeatherService;
  const fakeData = {
    name: "Portland",
    dt: 1712208000,
    main: { temp: 23, feels_like: 22, temp_min: 21, temp_max: 25 },
    weather: [{ main: "Clouds" }],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    const api = new WeatherApi();
    const repo = new WeatherRepo({} as any);
    service = new WeatherService(api, repo);
  });

  it("should fetch and save current weather successfully", async () => {
    mockGetCurrentWeather.mockResolvedValue(fakeData);
    mockSaveCurrentWeather.mockResolvedValue({
      city: "Portland",
      timestamp: new Date(fakeData.dt * 1000),
      temperature: 23,
      feels_like: 22,
      temp_min: 21,
      temp_max: 25,
      weather: "Clouds",
    } as CurrentWeather);

    const result = await service.fetchSaveCurrent(["Portland"]);
    expect(result).toBe(true);
    expect(mockGetCurrentWeather).toHaveBeenCalledWith("Portland");
    expect(mockSaveCurrentWeather).toHaveBeenCalledTimes(1);
  });

  it("should handle failed API call", async () => {
    mockGetCurrentWeather.mockResolvedValue(undefined); // simulate failure
    const result = await service.fetchSaveCurrent(["San Francisco"]);
    expect(result).toBe(false);
    expect(mockSaveCurrentWeather).not.toHaveBeenCalled();
  });

  it("should handle API error gracefully", async () => {
    mockGetCurrentWeather.mockRejectedValue(new Error("API error"));

    const result = await service.fetchSaveCurrent(["Tokyo"]);
    expect(result).toBe(false);
    expect(mockGetCurrentWeather).toHaveBeenCalledWith("Tokyo");
    expect(mockSaveCurrentWeather).not.toHaveBeenCalled();
  });

  it("should fetch and save forecast successfully", async () => {
    const fakeForecastList = {
      list: [
        {
          dt: 1712210000,
          main: {
            temp: 22,
            feels_like: 21,
            temp_min: 20,
            temp_max: 24,
          },
          weather: [{ main: "Rain" }],
        },
        {
          dt: 1712220000,
          main: {
            temp: 19,
            feels_like: 18,
            temp_min: 17,
            temp_max: 21,
          },
          weather: [{ main: "Clear" }],
        },
      ],
    };

    mockGetForecast.mockResolvedValue(fakeForecastList);
    mockSaveForecast.mockResolvedValue({
      city: "Berlin",
      forecast_time: new Date(fakeForecastList.list[0].dt * 1000),
      fetched_time: new Date(),
      temperature: 22,
      feels_like: 21,
      temp_min: 20,
      temp_max: 24,
      weather: "Rain",
    });

    const result = await service.fetchSaveForecast(["Berlin"]);
    expect(result).toBe(true);
    expect(mockGetForecast).toHaveBeenCalledWith("Berlin");
    expect(mockSaveForecast).toHaveBeenCalledTimes(2); // 2 entries
  });

  it("should handle empty forecast list", async () => {
    mockGetForecast.mockResolvedValue({ list: [] });
    const result = await service.fetchSaveForecast(["Oslo"]);
    expect(result).toBe(true); // Nothing to save, but still a success
    expect(mockSaveForecast).toHaveBeenCalledTimes(0);
  });

  it("should handle forecast API failure", async () => {
    mockGetForecast.mockResolvedValue(undefined);
    const result = await service.fetchSaveForecast(["Tokyo"]);
    expect(result).toBe(false);
    expect(mockSaveForecast).not.toHaveBeenCalled();
  });

  it("should handle forecast API error", async () => {
    mockGetForecast.mockRejectedValue(new Error("Forecast API error"));
    const result = await service.fetchSaveForecast(["London"]);
    expect(result).toBe(false);
    expect(mockSaveForecast).not.toHaveBeenCalled();
  });
});
