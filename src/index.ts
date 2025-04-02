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

const api = new WeatherApi();

const cities: string[] = ["Seattle", "New York", "Paris", "Taipei", "Tokyo"];

const run = () => {
  for (const city of cities) {
    api.getCurrentWeather(city);
  }
  // api.getCurrentWeather();
  // api.getForecast();
};

run();
