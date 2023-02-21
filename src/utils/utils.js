import { format } from 'date-fns';
import { PSI_FACTOR, METER_FACTOR } from '../constant/common';

export const convertUnixToTime = (unix, formatDate = 'yyyy/MM/dd HH:mm:ss') => {
    const date = new Date(unix * 1000)
    return format(date, formatDate)
}

export const convertHectopascalToPsi = (hpa) => {
    return (hpa * PSI_FACTOR).toFixed(2)
}

export const convertHectopascalToMeter = (hpa) => {
    return (hpa * METER_FACTOR).toFixed(2)
}

export const getWeatherIcon = (iconId) => {
    const url = `https://openweathermap.org/img/wn/${iconId}@2x.png`
    return url
}