import dotenv from "dotenv";

dotenv.config();

if (!process.env.API_KEY) {
  throw new Error("Missing API_KEY");
}

export const config = {
  apiKey: process.env.API_KEY,
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};
