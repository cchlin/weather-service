Using Node.js with TypeScript. Collects and stores current weather data and 5 day / 3 hour forecasts from the OpenWeatherMap API. Data is saved to supabase's free PostgreSQL database.

## Features

- Fetches **current weather** and **5-day / 3-hour forecasts**
- Stores weather data to supabase PostgreSQL
- Baisc data retrieval from DB
- Task set to run every 1 minute so no need to wait too long to check the outcome
- Basic retry logic
- Basic timestamped logger
- Unit-tested service layer using Jest

## Tech Stack

- Node.js + TypeScript
- PostgreSQL
- Jest (unit testing)
- dotenv (for config)

## Project Structure

```
src/
├── config/         # Environment config
├── model/          # TypeScript interfaces
├── repository/     # Database access
├── service/        # API interaction and processing
├── util/           # Logger, retry, helpers
├── index.ts        # Entry point
└── test/           # Jest unit tests
```

## Setup & Running

### 1. Clone & Install

```bash
git clone https://github.com/your-username/weather-service.git
cd weather-service
npm install
```

### 2. Setup Environment

Create a `.env` file in the root:

```env
API_KEY=openweathermap_api_key
DATABASE_URL=postgresql://postgres.ciufzdfrgrctrnnqfxcw:[db-password]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

### 3. Run the App

```bash
npm run build && npm start
```

### 4. Run Tests

```bash
npm test
```

## Database Schema

See `schema.sql` for table creation.

## Architecture Flow

- WeatherService (Core logic layer)
-
- +--------------------+
- | WeatherApi (fetch)|
- +--------------------+
-             |
- fetch + retry logic
-             |
-             ▼
- +---------------------+
- | WeatherService |
- +---------------------+
-     |                 |
- saveCurrent saveForecast
-     |                 |
-     ▼                 ▼
- WeatherRepo -----> PostgreSQL
  \*/
