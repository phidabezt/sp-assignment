import axiosClient from './axiosClient'

export const weatherApi = {
  getWeather: (infoType, searchParams) => {
    const url = `${infoType}`;
    return axiosClient.get(url, {
      params: {
        ...searchParams,
        appid: process.env.VITE_API_KEY,
      }
    })
  },
  getWeatherIcon: (iconId) => {
    const url = `https://openweathermap.org/img/wn/${iconId}@2x.png`
    return url
  }
}