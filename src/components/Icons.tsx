import { useContext } from 'react';
import { dataUrlIcon } from '../constants';
import { ContextWeather } from '../context/ContextCurrentWeather';
import { Loading } from './Loading';
import { IWeatherData } from '../types/types.d';

// COMPONENTE ICONO DE CLIMA
export function IconWeather() {
  const contextWeatherCurrent = useContext(ContextWeather);
  if (!contextWeatherCurrent) return <Loading />;
  const { icon } = contextWeatherCurrent.stateCurrentWeather.currentWeather;
  const ICON_WEATHER: string = dataUrlIcon({ icon });
  return (
    <div className="container-icon">
      <img className="img-fluid" src={ICON_WEATHER} alt="Imagen de icono de clima" />
    </div>
  );
}

// COMPONENTE ICONO DE CLIMA EXTENDIDO
export function IconWeatherExtend({ index, forecast }: { index: number, forecast: IWeatherData[] }) {
  const ICON_WEATHER_FORECAST: string = dataUrlIcon({ icon: forecast[index]?.icon });
  return (
    <div className="container-icon">
      <img className="img-fluid" src={ICON_WEATHER_FORECAST} alt="Imagen de icono de clima" />
    </div>
  );
}
