import { useContext } from 'react';
import { ContextWeather } from '../context/ContextWeather';
import { IContextWeather } from '../types/types.d';
export function DataHumFeels() {
    const context = useContext(ContextWeather) as IContextWeather | undefined;
    if(!context) return;
    const { humidity, feels_like } = context.state;
    return (
        <>
            <div className='sectionCountry__hum-feels'>
                <span>Humedad <strong> {humidity}%</strong></span> -
                <span>S.Térmica <strong>{Math.round(feels_like)} °C</strong></span>
            </div>
        </>
    );
}