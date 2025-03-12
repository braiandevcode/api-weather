import { useContext } from 'react';
import { ContextWeather } from '../context/ContextWeather';
import { dataUrlIcon } from '../constants';
import { IContextWeather, IForecastData } from '../types/types.d';

export function IconWeather() {
    const contextWeatherCurrent = useContext(ContextWeather) as IContextWeather |null;
    if (!contextWeatherCurrent) return;
    const { icon  } = contextWeatherCurrent.state.currentWeather;
    const ICON_WEATHER: string = dataUrlIcon({ icon });
    return (
        <>
            <div className="container-icon">
                <img src={ICON_WEATHER} alt="Imagen de icono de clima" />
            </div>
        </>
    );
}

export function IconWeatherExtend({ index, forecast }: { index:number, forecast:IForecastData[] }) {
    const ICON_WEATHER_FORECAST: string = dataUrlIcon({ icon: forecast[index]?.icon});
    return (
        <>
            <div className="container-icon">
                <img src={ICON_WEATHER_FORECAST} alt="Imagen de icono de clima" />
            </div>
        </>
    );
}


