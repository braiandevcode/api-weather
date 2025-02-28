import { useContext } from 'react';
import cardinalPoints from '../helpers/cardinalPoints';
import { ContextWeather } from '../context/ContextWeather';
import { IContextWeather } from '../types/types.d';

export function DataWind() {
    const context = useContext(ContextWeather) as IContextWeather | undefined;
    if (!context) return;
    const { deg, gust, speed } = context.state;
    const DEG = cardinalPoints(deg);
    return (
        <>
            <div className='sectionCountry__data-wind'>
                <span>Viento del sector <strong>{DEG}</strong></span> -
                <span>Ráfaga <strong>{Math.round(gust)} Km/h</strong></span> -
                <span>Velocidad <strong>{Math.round(speed)} Km/h</strong></span>
            </div>
        </>
    );
}