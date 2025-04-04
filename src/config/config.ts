import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}

if (!process.env.API_KEY) {
  throw new Error("Missing API_KEY");
}

export const config = {
  apiKey: process.env.API_KEY,
  baseUrl: "https://api.openweathermap.org/data/2.5/",
  dbUrl: process.env.DATABASE_URL,
};
