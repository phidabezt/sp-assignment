import axiosClient from './axiosClient'

export const weatherApi = {
  getWeather: (searchParams) => {
    return axiosClient.get('/onecall', {
      params: {
        ...searchParams,
        appid: process.env.VITE_API_KEY,
      }
    })
  }
}