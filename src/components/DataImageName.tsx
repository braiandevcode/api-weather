import { useContext } from 'react';
import { IconWeather } from './Icons';
import { ContextWeather } from '../context/ContextWeather';
import { IContextWeather } from '../types/types.d';

export function DataImageName() {
    const context = useContext(ContextWeather) as IContextWeather | undefined;
    if(!context) return;
    const { temp }  = context.state;

    return (
        <>
            <div className='sectionCountry__image-name'>
                <IconWeather />
                <h3><strong>{Math.round(temp)} °C</strong></h3>
            </div>
        </>
    );
}