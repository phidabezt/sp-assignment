import { useEffect, useState } from 'react'
import { weatherApi } from '../api/weatherApi'

const VN_LAT_LNG = {
  lat: 10.823099,
  lon: 106.629664
}

export const useWeather = () => { 
  const [weatherCurrent, setWeatherCurrent] = useState(null)
  const [weatherHourly, setWeatherHourly] = useState(null)
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
      setWeatherCurrent(response.current)
      setWeatherHourly(response.hourly)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  return { weatherCurrent, weatherHourly, error, loading }
}