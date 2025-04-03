// import { createServer } from "node:http";
//
// const port = process.env.PORT || 3000;
//
// const server = createServer((req, res) => {
// res.writeHead(200, { "Content-Type": "application/json" });
// res.end(JSON.stringify({ status: "Hello from backend" }));
// });
//
// server.listen(port, () => {
// console.log(`Server start running...`);
// });
//

// import { config } from "./config/config";
import { WeatherApi } from "./service/WeatherApi";
import { WeatherRepo } from "./repository/WeatherRepo";

const api = new WeatherApi();
const repo = new WeatherRepo();

const cities: string[] = ["Seattle", "New York", "Paris", "Taipei", "Tokyo"];

const run = async () => {
  // for (const city of cities) {
  // console.log(await api.getCurrentWeather("Seattle"));
  const current = await api.getCurrentWeather("Seattle");
  if (current) {
    repo.saveCurrentWeather(current);
  }
  // }
  // console.log(await api.getForecast("Seattle"));
  const forecastList = await api.getForecast("Seattle");
  if (forecastList) {
    for (const forecast of forecastList) {
      await repo.saveForecast(forecast);
    }
  }

  const list = await repo.getForecast("Seattle");
  for (const item of list) {
    console.log(item);
  }
  console.log("Forecast mock db retrieval done");
  console.log(repo.getMostRecentWeather("Seattle"));
  console.log("Weather mock db retrieval done");
};

run();
