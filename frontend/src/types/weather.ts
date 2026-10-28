export interface WeatherData {
  id?: number;
  name: string;
  coord?: {
    lon: number;
    lat: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min?: number;
    temp_max?: number;
    humidity: number;
    pressure?: number;
  };
  weather: {
    id?: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind?: {
    speed: number;
    deg?: number;
    gust?: number;
  };
  clouds?: {
    all: number;
  };
  sys?: {
    country: string;
    sunrise?: number;
    sunset?: number;
  };
  visibility?: number;
  dt?: number;
  timezone?: number;
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min?: number;
    temp_max?: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id?: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds?: {
    all: number;
  };
  wind?: {
    speed: number;
    deg?: number;
    gust?: number;
  };
  visibility?: number;
  pop?: number;
  dt_txt: string;
}

export interface ForecastCity {
  id?: number;
  name?: string;
  coord?: {
    lat: number;
    lon: number;
  };
  country?: string;
  sunrise?: number;
  sunset?: number;
  timezone?: number;
}

export interface ForecastData {
  cod?: string;
  message?: number;
  cnt?: number;
  list: ForecastItem[];
  city?: ForecastCity;
}
