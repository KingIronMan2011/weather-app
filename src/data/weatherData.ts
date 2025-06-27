export interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
  weatherType: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy';
}

export interface DayForecast {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  weatherType: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy';
  precipitation: number;
}

export interface WeatherDetails {
  realFeel: number;
  uvIndex: number;
  windDirection: string;
  pressure: number;
  dewPoint: number;
  visibility: number;
}

export interface HourlyData {
  time: string;
  temperature: number;
  weatherType: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy';
  precipitation: number;
}

export const weatherDatabase: Record<string, {
  weather: WeatherData;
  forecast: DayForecast[];
  details: WeatherDetails;
  hourly: HourlyData[];
}> = {
  'New York': {
    weather: {
      location: 'New York',
      country: 'United States',
      temperature: 24,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      visibility: 10,
      feelsLike: 27,
      weatherType: 'cloudy',
    },
    forecast: [
      {
        day: 'Today',
        date: 'Dec 15',
        high: 24,
        low: 18,
        condition: 'Partly Cloudy',
        weatherType: 'cloudy',
        precipitation: 20,
      },
      {
        day: 'Tomorrow',
        date: 'Dec 16',
        high: 22,
        low: 16,
        condition: 'Light Rain',
        weatherType: 'rainy',
        precipitation: 70,
      },
      {
        day: 'Wednesday',
        date: 'Dec 17',
        high: 26,
        low: 19,
        condition: 'Sunny',
        weatherType: 'sunny',
        precipitation: 0,
      },
      {
        day: 'Thursday',
        date: 'Dec 18',
        high: 21,
        low: 15,
        condition: 'Thunderstorms',
        weatherType: 'stormy',
        precipitation: 90,
      },
      {
        day: 'Friday',
        date: 'Dec 19',
        high: 20,
        low: 14,
        condition: 'Snow',
        weatherType: 'snowy',
        precipitation: 80,
      },
    ],
    details: {
      realFeel: 27,
      uvIndex: 6,
      windDirection: 'NW',
      pressure: 1013,
      dewPoint: 16,
      visibility: 10,
    },
    hourly: [
      { time: 'Now', temperature: 24, weatherType: 'cloudy', precipitation: 20 },
      { time: '2 PM', temperature: 25, weatherType: 'cloudy', precipitation: 15 },
      { time: '3 PM', temperature: 26, weatherType: 'sunny', precipitation: 5 },
      { time: '4 PM', temperature: 25, weatherType: 'sunny', precipitation: 0 },
      { time: '5 PM', temperature: 24, weatherType: 'cloudy', precipitation: 10 },
      { time: '6 PM', temperature: 22, weatherType: 'rainy', precipitation: 60 },
      { time: '7 PM', temperature: 21, weatherType: 'rainy', precipitation: 75 },
      { time: '8 PM', temperature: 20, weatherType: 'cloudy', precipitation: 30 },
    ],
  },
  'London': {
    weather: {
      location: 'London',
      country: 'United Kingdom',
      temperature: 12,
      condition: 'Light Rain',
      humidity: 78,
      windSpeed: 15,
      visibility: 8,
      feelsLike: 10,
      weatherType: 'rainy',
    },
    forecast: [
      {
        day: 'Today',
        date: 'Dec 15',
        high: 12,
        low: 8,
        condition: 'Light Rain',
        weatherType: 'rainy',
        precipitation: 85,
      },
      {
        day: 'Tomorrow',
        date: 'Dec 16',
        high: 10,
        low: 6,
        condition: 'Heavy Rain',
        weatherType: 'rainy',
        precipitation: 95,
      },
      {
        day: 'Wednesday',
        date: 'Dec 17',
        high: 14,
        low: 9,
        condition: 'Cloudy',
        weatherType: 'cloudy',
        precipitation: 30,
      },
      {
        day: 'Thursday',
        date: 'Dec 18',
        high: 11,
        low: 7,
        condition: 'Partly Cloudy',
        weatherType: 'cloudy',
        precipitation: 20,
      },
      {
        day: 'Friday',
        date: 'Dec 19',
        high: 13,
        low: 8,
        condition: 'Light Rain',
        weatherType: 'rainy',
        precipitation: 60,
      },
    ],
    details: {
      realFeel: 10,
      uvIndex: 2,
      windDirection: 'SW',
      pressure: 1008,
      dewPoint: 8,
      visibility: 8,
    },
    hourly: [
      { time: 'Now', temperature: 12, weatherType: 'rainy', precipitation: 85 },
      { time: '2 PM', temperature: 11, weatherType: 'rainy', precipitation: 90 },
      { time: '3 PM', temperature: 10, weatherType: 'rainy', precipitation: 95 },
      { time: '4 PM', temperature: 10, weatherType: 'cloudy', precipitation: 70 },
      { time: '5 PM', temperature: 9, weatherType: 'cloudy', precipitation: 50 },
      { time: '6 PM', temperature: 8, weatherType: 'rainy', precipitation: 80 },
      { time: '7 PM', temperature: 8, weatherType: 'rainy', precipitation: 85 },
      { time: '8 PM', temperature: 7, weatherType: 'cloudy', precipitation: 40 },
    ],
  },
  'Tokyo': {
    weather: {
      location: 'Tokyo',
      country: 'Japan',
      temperature: 18,
      condition: 'Sunny',
      humidity: 45,
      windSpeed: 8,
      visibility: 15,
      feelsLike: 19,
      weatherType: 'sunny',
    },
    forecast: [
      {
        day: 'Today',
        date: 'Dec 15',
        high: 18,
        low: 12,
        condition: 'Sunny',
        weatherType: 'sunny',
        precipitation: 0,
      },
      {
        day: 'Tomorrow',
        date: 'Dec 16',
        high: 20,
        low: 14,
        condition: 'Partly Cloudy',
        weatherType: 'cloudy',
        precipitation: 10,
      },
      {
        day: 'Wednesday',
        date: 'Dec 17',
        high: 22,
        low: 16,
        condition: 'Sunny',
        weatherType: 'sunny',
        precipitation: 0,
      },
      {
        day: 'Thursday',
        date: 'Dec 18',
        high: 19,
        low: 13,
        condition: 'Cloudy',
        weatherType: 'cloudy',
        precipitation: 25,
      },
      {
        day: 'Friday',
        date: 'Dec 19',
        high: 17,
        low: 11,
        condition: 'Light Rain',
        weatherType: 'rainy',
        precipitation: 65,
      },
    ],
    details: {
      realFeel: 19,
      uvIndex: 4,
      windDirection: 'E',
      pressure: 1020,
      dewPoint: 8,
      visibility: 15,
    },
    hourly: [
      { time: 'Now', temperature: 18, weatherType: 'sunny', precipitation: 0 },
      { time: '2 PM', temperature: 19, weatherType: 'sunny', precipitation: 0 },
      { time: '3 PM', temperature: 20, weatherType: 'sunny', precipitation: 0 },
      { time: '4 PM', temperature: 19, weatherType: 'sunny', precipitation: 0 },
      { time: '5 PM', temperature: 18, weatherType: 'cloudy', precipitation: 5 },
      { time: '6 PM', temperature: 17, weatherType: 'cloudy', precipitation: 10 },
      { time: '7 PM', temperature: 16, weatherType: 'cloudy', precipitation: 15 },
      { time: '8 PM', temperature: 15, weatherType: 'cloudy', precipitation: 20 },
    ],
  },
  'Paris': {
    weather: {
      location: 'Paris',
      country: 'France',
      temperature: 8,
      condition: 'Cloudy',
      humidity: 72,
      windSpeed: 10,
      visibility: 12,
      feelsLike: 6,
      weatherType: 'cloudy',
    },
    forecast: [
      {
        day: 'Today',
        date: 'Dec 15',
        high: 8,
        low: 4,
        condition: 'Cloudy',
        weatherType: 'cloudy',
        precipitation: 35,
      },
      {
        day: 'Tomorrow',
        date: 'Dec 16',
        high: 6,
        low: 2,
        condition: 'Light Snow',
        weatherType: 'snowy',
        precipitation: 70,
      },
      {
        day: 'Wednesday',
        date: 'Dec 17',
        high: 9,
        low: 5,
        condition: 'Partly Cloudy',
        weatherType: 'cloudy',
        precipitation: 20,
      },
      {
        day: 'Thursday',
        date: 'Dec 18',
        high: 11,
        low: 7,
        condition: 'Sunny',
        weatherType: 'sunny',
        precipitation: 0,
      },
      {
        day: 'Friday',
        date: 'Dec 19',
        high: 7,
        low: 3,
        condition: 'Light Rain',
        weatherType: 'rainy',
        precipitation: 55,
      },
    ],
    details: {
      realFeel: 6,
      uvIndex: 2,
      windDirection: 'N',
      pressure: 1015,
      dewPoint: 4,
      visibility: 12,
    },
    hourly: [
      { time: 'Now', temperature: 8, weatherType: 'cloudy', precipitation: 35 },
      { time: '2 PM', temperature: 7, weatherType: 'cloudy', precipitation: 40 },
      { time: '3 PM', temperature: 6, weatherType: 'snowy', precipitation: 60 },
      { time: '4 PM', temperature: 5, weatherType: 'snowy', precipitation: 70 },
      { time: '5 PM', temperature: 4, weatherType: 'snowy', precipitation: 75 },
      { time: '6 PM', temperature: 3, weatherType: 'snowy', precipitation: 80 },
      { time: '7 PM', temperature: 3, weatherType: 'cloudy', precipitation: 50 },
      { time: '8 PM', temperature: 2, weatherType: 'cloudy', precipitation: 30 },
    ],
  },
  'Sydney': {
    weather: {
      location: 'Sydney',
      country: 'Australia',
      temperature: 28,
      condition: 'Sunny',
      humidity: 55,
      windSpeed: 14,
      visibility: 20,
      feelsLike: 31,
      weatherType: 'sunny',
    },
    forecast: [
      {
        day: 'Today',
        date: 'Dec 15',
        high: 28,
        low: 22,
        condition: 'Sunny',
        weatherType: 'sunny',
        precipitation: 0,
      },
      {
        day: 'Tomorrow',
        date: 'Dec 16',
        high: 30,
        low: 24,
        condition: 'Partly Cloudy',
        weatherType: 'cloudy',
        precipitation: 15,
      },
      {
        day: 'Wednesday',
        date: 'Dec 17',
        high: 32,
        low: 26,
        condition: 'Sunny',
        weatherType: 'sunny',
        precipitation: 0,
      },
      {
        day: 'Thursday',
        date: 'Dec 18',
        high: 29,
        low: 23,
        condition: 'Thunderstorms',
        weatherType: 'stormy',
        precipitation: 85,
      },
      {
        day: 'Friday',
        date: 'Dec 19',
        high: 26,
        low: 20,
        condition: 'Light Rain',
        weatherType: 'rainy',
        precipitation: 60,
      },
    ],
    details: {
      realFeel: 31,
      uvIndex: 9,
      windDirection: 'NE',
      pressure: 1018,
      dewPoint: 18,
      visibility: 20,
    },
    hourly: [
      { time: 'Now', temperature: 28, weatherType: 'sunny', precipitation: 0 },
      { time: '2 PM', temperature: 30, weatherType: 'sunny', precipitation: 0 },
      { time: '3 PM', temperature: 31, weatherType: 'sunny', precipitation: 0 },
      { time: '4 PM', temperature: 32, weatherType: 'sunny', precipitation: 0 },
      { time: '5 PM', temperature: 30, weatherType: 'cloudy', precipitation: 10 },
      { time: '6 PM', temperature: 28, weatherType: 'cloudy', precipitation: 20 },
      { time: '7 PM', temperature: 26, weatherType: 'stormy', precipitation: 70 },
      { time: '8 PM', temperature: 24, weatherType: 'stormy', precipitation: 85 },
    ],
  },
  'Dubai': {
    weather: {
      location: 'Dubai',
      country: 'UAE',
      temperature: 32,
      condition: 'Sunny',
      humidity: 35,
      windSpeed: 6,
      visibility: 18,
      feelsLike: 36,
      weatherType: 'sunny',
    },
    forecast: [
      {
        day: 'Today',
        date: 'Dec 15',
        high: 32,
        low: 26,
        condition: 'Sunny',
        weatherType: 'sunny',
        precipitation: 0,
      },
      {
        day: 'Tomorrow',
        date: 'Dec 16',
        high: 34,
        low: 28,
        condition: 'Sunny',
        weatherType: 'sunny',
        precipitation: 0,
      },
      {
        day: 'Wednesday',
        date: 'Dec 17',
        high: 35,
        low: 29,
        condition: 'Partly Cloudy',
        weatherType: 'cloudy',
        precipitation: 5,
      },
      {
        day: 'Thursday',
        date: 'Dec 18',
        high: 33,
        low: 27,
        condition: 'Sunny',
        weatherType: 'sunny',
        precipitation: 0,
      },
      {
        day: 'Friday',
        date: 'Dec 19',
        high: 31,
        low: 25,
        condition: 'Cloudy',
        weatherType: 'cloudy',
        precipitation: 10,
      },
    ],
    details: {
      realFeel: 36,
      uvIndex: 10,
      windDirection: 'NW',
      pressure: 1012,
      dewPoint: 15,
      visibility: 18,
    },
    hourly: [
      { time: 'Now', temperature: 32, weatherType: 'sunny', precipitation: 0 },
      { time: '2 PM', temperature: 34, weatherType: 'sunny', precipitation: 0 },
      { time: '3 PM', temperature: 35, weatherType: 'sunny', precipitation: 0 },
      { time: '4 PM', temperature: 36, weatherType: 'sunny', precipitation: 0 },
      { time: '5 PM', temperature: 34, weatherType: 'sunny', precipitation: 0 },
      { time: '6 PM', temperature: 32, weatherType: 'cloudy', precipitation: 5 },
      { time: '7 PM', temperature: 30, weatherType: 'cloudy', precipitation: 10 },
      { time: '8 PM', temperature: 28, weatherType: 'cloudy', precipitation: 15 },
    ],
  },
};