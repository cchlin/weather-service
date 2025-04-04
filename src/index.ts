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
import { WeatherService } from "./service/WeatherService";
import { config } from "./config/config";
import postgres from "postgres";

const api = new WeatherApi();
const cities: string[] = ["Seattle", "New York", "Paris", "Taipei", "Tokyo"];

const run = async () => {
  const sql = postgres(config.dbUrl);
  const repo = new WeatherRepo(sql);
  const service = new WeatherService(api, repo);
  await service.fetchSaveCurrent("Seattle");
  await service.fetchSaveForecast("Seattle");
  await sql.end();

  // const list = await repo.getForecast("Seattle");
  // for (const item of list) {
  // console.log(item);
  // }
  // console.log(await repo.getMostRecentWeather("Seattle"));
};

run();
