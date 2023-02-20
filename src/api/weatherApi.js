import axiosClient from './axiosClient';

export const weatherApi = {
  getWeather: async (infoType, searchParams) => { 
    try {
      const url = `${infoType}`;
      return await axiosClient.get(url, {
        params: {
          ...searchParams,
          appid: process.env.VITE_API_KEY,
      } });
    } catch (error) {
      console.log(error)
    }
  },
  getWeatherIcon: (iconId) => { 
    const url = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
    return url
  }
}