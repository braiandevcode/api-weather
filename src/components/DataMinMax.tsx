import { useContext } from 'react';
import { ContextWeather } from '../context/ContextWeather';
import { IContextWeather } from '../types/types.d';

export function DataMinMax() {
    const context = useContext(ContextWeather) as IContextWeather | undefined;
    if (!context) return;
    const { temp_min, temp_max } = context.state;
    return (
        <>
            <div className='sectionCountry__data-min-max'>
                <span>Min <strong>{Math.round(temp_min)} °C</strong></span> -
                <span>Max <strong>{Math.round(temp_max)} °C</strong></span>
            </div>
        </>
    );
}