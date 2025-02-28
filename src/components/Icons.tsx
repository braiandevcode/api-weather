import { useContext } from 'react';
import { ContextWeather } from '../context/ContextWeather';
import { dataUrlIcon } from '../constants';
import { IContextWeather } from '../types/types.d';

export function IconWeather() {
    const context = useContext(ContextWeather) as IContextWeather | undefined;
    if (!context) return;
    const { icon  } = context.state;
    const ICON_WEATHER: string = dataUrlIcon({ icon });
    return (
        <>
            <div className="container-icon">
                <img src={ICON_WEATHER} alt="Imagen de icono de clima" />
            </div>
        </>
    );
}


