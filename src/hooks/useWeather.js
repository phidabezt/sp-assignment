import { useEffect, useState } from 'react'
import { weatherApi } from '../api/weatherApi'
import { convertHectopascalToMeter, convertHectopascalToPsi, convertUnixToTime } from '../utils/utils'

const VN_LAT_LNG = {
  lat: 10.823099,
  lon: 106.629664
}

export const useWeather = () => { 
  const [weatherCurrent, setWeatherCurrent] = useState(null)
  const [seaLevels, setSeaLevels] = useState([])
  const [sunLevels, setSunLevels] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchWeather()
  }, [])

  const fetchWeather = async () => {
    try {
      setLoading(true)
      const response = await weatherApi.getWeather('onecall', {
        lat: VN_LAT_LNG.lat,
        lon: VN_LAT_LNG.lon,
        units: 'metric'
      })

      const icon = weatherApi.getWeatherIcon(response.current.weather[0].icon)

      setWeatherCurrent({
        temp: response.current.temp,
        weather: response.current.weather[0].main,
        icon: response.current.weather[0].icon,
        humidity: response.current.humidity,
        rain: response.current?.rain || 0,
        dengue: response.current.dengue || 51,
        psi: convertHectopascalToPsi(response.current.pressure),
        icon
      })

      setSeaLevels(response.hourly.map(item => ({
        time: new Date(convertUnixToTime(item.dt)),
        sea_level: Number(convertHectopascalToMeter(item.pressure))
      })))
      setSunLevels(response.daily.map(item => ({
        sunrise: item.sunrise,
        sunset: item.sunset
      })))
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  return { weatherCurrent, seaLevels, sunLevels, error, loading }
}