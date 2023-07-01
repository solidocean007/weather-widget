export const WEATHER_API = import.meta.env.VITE_WEATHER_API;
export const WEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast?zip=28304&appid=${WEATHER_API}&units=imperial`;


console.log("API key: ", WEATHER_API);
