import { format } from 'date-fns';

export const convertUnixToTime = (unix) => {
    const date = new Date(unix * 1000);
    return format(date, 'hh:mm a')
}

export const convertHectopascalToPsi = (hpa) => {
    return (hpa * 0.0145037738).toFixed(2);
}

export const convertHectopascalToMeter = (hpa) => {
    return (hpa * 0.0102).toFixed(2);
}