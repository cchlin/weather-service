import dotenv from "dotenv";

dotenv.config();

export const config = {
  apiKey: process.env.API_KEY,
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};
