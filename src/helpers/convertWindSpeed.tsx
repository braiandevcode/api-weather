import { IWeatherData } from '../types/types.d';

// CONVERTIR LOS VALORES DEL VIENTO DE M/S A KM/H
export default function convertWindSpeed({ gust, speed }: Pick<IWeatherData, 'gust' | 'speed'>){
    const gustCalc = gust * 3.6;
    const speedCalc= speed * 3.6;

    // REDONDEAR RESULTADOS
    const roundGust =  Math.round(gustCalc * 100) / 100;
    const roundAverage = Math.round(speedCalc* 100) / 100;

    return { roundGust, roundAverage };
}