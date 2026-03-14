const KEY  = import.meta.env.VITE_WEATHER_API_KEY
const BASE = 'https://api.openweathermap.org/data/2.5'

export const getCurrentWeather = async (city) => {
  const r = await fetch(`${BASE}/weather?q=${encodeURIComponent(city)}&appid=${KEY}&units=metric`)
  if (!r.ok) throw new Error('City not found. Please check the city name.')
  return r.json()
}

export const getForecast = async (city) => {
  const r = await fetch(`${BASE}/forecast?q=${encodeURIComponent(city)}&appid=${KEY}&units=metric`)
  if (!r.ok) throw new Error('Forecast not found.')
  return r.json()
}

export const getWeatherByCoords = async (lat, lon) => {
  const r = await fetch(`${BASE}/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`)
  if (!r.ok) throw new Error('Location weather not found.')
  return r.json()
}

export const getForecastByCoords = async (lat, lon) => {
  const r = await fetch(`${BASE}/forecast?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`)
  if (!r.ok) throw new Error('Location forecast not found.')
  return r.json()
}

export const getWeatherIconUrl = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`

export const getDailyForecast = (list) => {
  const days = {}
  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0]
    if (!days[date]) days[date] = item
  })
  return Object.values(days).slice(0, 5)
}