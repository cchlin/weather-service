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

## Design Decisions

- **Modular Architecture**: I separate the module this way so they can each focus on their own things and easier to test
- **Data Transformation**: The `mapToFields()` function cleanly decouples API structure from internal models, so changes in API format only need to be handled in one place.
- **Database**: PostgreSQL is used with Supabase because I don't have it installed on my machine, and I thought when you check my code you don't need to do too much setup.
- **No Framework Overhead**: The app is built as a plain Node.js console app without Express or web server components, since the challenge doesn't require an API.
- **Test Focus**: Unit tests focus on the `WeatherService` layer, which contains the core logic of data fetching and saving.
- **Short Interval Execution**: The fetch interval is set to 1 minute for easier demo/testing purposes.

## Architecture Flow

```
        OpenWeatherMap API
                |
            Fetch data
                v
     +----------------------+     
     |      WeatherApi      | 
     +----------------------+
                |
             raw JSON                    
                v
     +----------------------+
     |    WeatherService    | <----- cities/trigger -----> Etnry point
     +----------------------+ 
                |
        TypeScript ojbect
                v  
     +----------------------+   
     |      WeatherRepo     |  
     +----------------------+  
                |
                |   
                v          
+--------------------------------+ 
| PostgreSQL Database (Supabase) |
+--------------------------------+
```
