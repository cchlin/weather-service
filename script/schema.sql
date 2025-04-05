CREATE TABLE IF NOT EXISTS current_weather (
  city TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  temperature FLOAT NOT NULL,
  feels_like FLOAT NOT NULL,
  temp_min FLOAT NOT NULL,
  temp_max FLOAT NOT NULL,
  weather TEXT NOT NULL,
  precipitation FLOAT,
  PRIMARY KEY (city, timestamp)
);

CREATE TABLE IF NOT EXISTS forecast (
  city TEXT NOT NULL,
  forecast_time TIMESTAMPTZ NOT NULL,
  fetched_time TIMESTAMPTZ NOT NULL,
  temperature FLOAT NOT NULL,
  feels_like FLOAT NOT NULL,
  temp_min FLOAT NOT NULL,
  temp_max FLOAT NOT NULL,
  weather TEXT NOT NULL,
  precipitation FLOAT,
  PRIMARY KEY (city, forecast_time)
);