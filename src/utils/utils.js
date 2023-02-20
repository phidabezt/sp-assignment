import { format } from 'date-fns';
import { psiFactor, meterFactor } from '../constant/common';

export const convertUnixToTime = (unix, formatDate = 'yyyy/MM/dd HH:mm:ss') => {
    const date = new Date(unix * 1000)
    return format(date, formatDate)
}

export const convertHectopascalToPsi = (hpa) => {
    return (hpa * psiFactor).toFixed(2)
}

export const convertHectopascalToMeter = (hpa) => {
    return (hpa * meterFactor).toFixed(2)
}