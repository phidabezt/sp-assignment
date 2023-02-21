import { useEffect, useState } from 'react'
import { weatherApi } from '../api/weatherApi'
import { convertHectopascalToMeter, convertHectopascalToPsi, convertUnixToTime, getWeatherIcon } from '../utils/utils'
import { VN_LAT_LNG } from '../constant/common'

export const useWeather = () => { 
  const [currentWeather, setCurrentWeather] = useState({
    temp: 0,
    weather: '',
    icon: '',
    humidity: 0,
    rain: 0,
    dengue: 0,
    psi: 0
  })
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
      const response = await weatherApi.getWeather({
        lat: VN_LAT_LNG.lat,
        lon: VN_LAT_LNG.lon,
        units: 'metric'
      })

      const icon = getWeatherIcon(response.current.weather[0].icon)

      setCurrentWeather({
        temp: Number(response.current.temp).toFixed(0),
        weather: response.current.weather[0].main,
        icon: response.current.weather[0].icon,
        humidity: response.current.humidity,
        rain: response.current.rain || 0,
        dengue: response.current.dengue || 51,
        psi: convertHectopascalToPsi(response.current.pressure),
        icon
      })

      setSeaLevels(response.hourly.map(item => ({
        time: new Date(convertUnixToTime(item.dt)),
        sea_level: Number(convertHectopascalToMeter(item.pressure))
      })))
      /*
        Since the API only returns 48 hours in the hourly array, we only need to get the next 3 days
        from the daily array instead of taking all 8 days from the daily array
      */
      setSunLevels([
        {
          sunrise: new Date(convertUnixToTime(response.daily[0].sunrise)),
          sunset: new Date(convertUnixToTime(response.daily[0].sunset))
        },
        {
          sunrise: new Date(convertUnixToTime(response.daily[1].sunrise)),
          sunset: new Date(convertUnixToTime(response.daily[1].sunset))
        },
        {
          sunrise: new Date(convertUnixToTime(response.daily[2].sunrise)),
          sunset: new Date(convertUnixToTime(response.daily[2].sunset))
        }
      ])
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  return { currentWeather, seaLevels, sunLevels, error, loading }
}