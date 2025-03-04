import { KelvinCelsius } from '../types/types.d';

// CONVERTIR TEMPERATURAS KELVIN A CELSIUS
export function kelvinToCelsius({ obj }: { obj: KelvinCelsius }): Record<string, number> {
    // ITERAR CON REDUCER Y RETORNAR OBJETO CON SUS VALORES CONVERTIDOS
    return Object.entries(obj).reduce((acc, [key, literal]) => {
        acc[key] = literal - 273.15;
        return acc;
    }, {} as Record<string, number>);
}

// CONVERTIR TEMPERATURAS KELVIN A FAHRENHEIT
export function kelvinToFahrenheit({ obj }: { obj: KelvinCelsius }): Record<string, number> {
    // ITERAR CON REDUCER Y RETORNAR OBJETO CON SUS VALORES CONVERTIDOS
    return Object.entries(obj).reduce((acc, [key, literal]) => {
        acc[key] = literal - 273.15 * 9 / 5 + 32;
        return acc;
    }, {} as Record<string, number>);
}