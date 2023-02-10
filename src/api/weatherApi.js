import axiosClient from './axiosClient';

export const weatherApi = {
  getWeather: async (infoType, searchParams) => { 
    try {
      const url = `${infoType}`;
      return await axiosClient.get(url, {
        params: {
          ...searchParams,
          appid: import.meta.env.VITE_API_KEY,
      } });
    } catch (error) {
      console.log(error)
    }
  }
}