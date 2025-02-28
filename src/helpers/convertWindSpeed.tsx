import { IWindSpeed } from '../types/types.d';

export default function convertWindSpeed({ gust, speed }: IWindSpeed){
    const gustCalc = gust * 3.6;
    const speedCalc= speed * 3.6;

    // Para redondear los resultados
    const roundGust =  Math.round(gustCalc * 100) / 100;
    const roundAverage = Math.round(speedCalc* 100) / 100;

    return {
        gust: roundGust,
        speed: roundAverage
    };
}