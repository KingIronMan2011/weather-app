import { COUNTRY_CAPITALS } from '../config/capitals';

// Types for weather data
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

// Helper functions to map Open-Meteo codes
function mapWeatherCodeToType(code: number): 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' {
  if ([0, 1].includes(code)) return "sunny";
  if ([2, 3, 45, 48].includes(code)) return "cloudy";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "rainy";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snowy";
  if ([95, 96, 99].includes(code)) return "stormy";
  return "cloudy";
}
function getWeatherCondition(code: number): string {
  if ([0, 1].includes(code)) return "Clear";
  if ([2, 3, 45, 48].includes(code)) return "Cloudy";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "Rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
  if ([95, 96, 99].includes(code)) return "Storm";
  return "Cloudy";
}

// Reverse geocode lat/lon to city name using Nominatim
export async function reverseGeocode(lat: number, lon: number): Promise<string> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
  );
  const data = await res.json();
  return (
    data.address.city ||
    data.address.town ||
    data.address.village ||
    data.address.state ||
    "Your Location"
  );
}

// Fetch weather data for a given lat/lon and city name
export async function fetchWeatherData(
  name: string,
  lat: number,
  lon: number
): Promise<{
  weather: WeatherData;
  forecast: DayForecast[];
  details: WeatherDetails;
  hourly: HourlyData[];
}> {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current_weather=true` +
    `&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,relative_humidity_2m,dew_point_2m,uv_index,visibility,surface_pressure,winddirection_10m` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,uv_index_max` +
    `&forecast_days=5&timezone=auto`
  );
  const data = await res.json();

  // Find the current hour index
  const now = new Date();
  const currentHourIndex = data.hourly.time.findIndex((t: string) =>
    new Date(t).getHours() === now.getHours() &&
    new Date(t).getDate() === now.getDate()
  );

  // WeatherData
  const weather: WeatherData = {
    location: name,
    country: "", // You can parse country from display_name if needed
    temperature: Math.round(data.current_weather.temperature),
    condition: getWeatherCondition(data.current_weather.weathercode),
    humidity: data.hourly.relative_humidity_2m?.[currentHourIndex] ?? 0,
    windSpeed: Math.round(data.current_weather.windspeed),
    visibility: data.hourly.visibility?.[currentHourIndex] ?? 0,
    feelsLike: Math.round(data.hourly.apparent_temperature?.[currentHourIndex] ?? data.current_weather.temperature),
    weatherType: mapWeatherCodeToType(data.current_weather.weathercode),
  };

  const windDeg = data.hourly.winddirection_10m?.[currentHourIndex] ?? 0;

  // WeatherDetails
  const details: WeatherDetails = {
    realFeel: Math.round(data.hourly.apparent_temperature?.[currentHourIndex] ?? data.current_weather.temperature),
    uvIndex: Math.round(data.hourly.uv_index?.[currentHourIndex] ?? data.daily.uv_index_max?.[0] ?? 0),
    windDirection: degreesToCompass(windDeg),
    pressure: Math.round(data.hourly.surface_pressure?.[currentHourIndex] ?? 1013),
    dewPoint: Math.round(data.hourly.dew_point_2m?.[currentHourIndex] ?? 0),
    visibility: data.hourly.visibility?.[currentHourIndex] ?? 0,
  };

  // DayForecast[]
  const forecast: DayForecast[] = data.daily.time.map((date: string, i: number) => ({
    day: new Date(date).toLocaleDateString(undefined, { weekday: "short" }),
    date: new Date(date).toLocaleDateString(),
    high: Math.round(data.daily.temperature_2m_max[i]),
    low: Math.round(data.daily.temperature_2m_min[i]),
    condition: getWeatherCondition(data.daily.weathercode[i]),
    weatherType: mapWeatherCodeToType(data.daily.weathercode[i]),
    precipitation: data.daily.precipitation_sum[i],
  }));

  // HourlyData[]
  const hourly: HourlyData[] = data.hourly.time.slice(0, 24).map((time: string, i: number) => ({
    time: new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    temperature: Math.round(data.hourly.temperature_2m[i]),
    precipitation: data.hourly.precipitation[i],
    weatherType: mapWeatherCodeToType(data.hourly.weathercode[i]),
  }));

  return { weather, forecast, details, hourly };
}

export async function getLocationFromGeolocation(): Promise<{ name: string; lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject('Geolocation not supported');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.village || data.address.state || "Your Location";
          resolve({ name: city, lat, lon });
        } catch {
          resolve({ name: "Your Location", lat, lon });
        }
      },
      () => reject('Denied')
    );
  });
}

export async function getLocationFromIP(): Promise<{ name: string; lat: number; lon: number }> {
  try {
    const ipRes = await fetch('https://ipapi.co/json/');
    const ipData = await ipRes.json();
    let countryCode = (ipData.country || "DEFAULT").toUpperCase();
    return COUNTRY_CAPITALS[countryCode] || COUNTRY_CAPITALS.DEFAULT;
  } catch {
    return COUNTRY_CAPITALS.DEFAULT;
  }
}

function degreesToCompass(degrees: number): string {
  const directions = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}