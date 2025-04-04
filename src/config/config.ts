import dotenv from "dotenv";
import postgres from "postgres";

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
  sql: postgres(process.env.DATABASE_URL),
};
