import { dataUrl } from '../constants';
import convertWindSpeed from '../helpers/convertWindSpeed';
import { kelvinToCelsius } from '../helpers/kelvin';
import { IForecastDay, IGetWeather, IWeatherData, WeatherMain } from '../types/types.d';

// CONSULTAR CLIMA
const getWeatherDataExtend = async ({ latitude, longitude, setForecastWeather, setIsVisible }: Pick<IGetWeather, 'latitude' | 'longitude' | 'setForecastWeather' | 'setIsVisible'>): Promise<void> => {
    try {
        const { DOMAIN, EXTEND_WEEK } = dataUrl({ latitude, longitude });
        const URL = `${DOMAIN}${EXTEND_WEEK}`;

        const response = await fetch(URL);

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const result = await response.json();

        const LIST = result.list;

        // SI HAY RESULTADOS
        if (result && LIST.length > 0) {
            const forecastData = LIST.map((day:IForecastDay) => {     
                const { deg, gust, speed }:Pick<IWeatherData, 'deg' | 'gust' | 'speed'>= day.wind;
                const { humidity, ...kelvinValues }:WeatherMain = day.main;
                const { description, icon, id}: Pick<IWeatherData, 'description' | 'icon' | 'id'>= day.weather[0];

                const { roundGust, roundAverage } = convertWindSpeed({ gust, speed });
                const convertedTemperatures = kelvinToCelsius({ obj: kelvinValues });
                const { temp, temp_min, temp_max, feels_like, } = convertedTemperatures;

                return {
                    dt: day.dt,
                    date: day.dt_txt, 
                    temp,
                    temp_min,
                    temp_max,
                    feels_like,
                    humidity,
                    deg,
                    gust: roundGust,
                    speed: roundAverage,
                    name: null,
                    description,
                    id,
                    icon,
                    isLoading: false,
                    latitude,
                    longitude,
                };
            });
            // MODIFICADOR DE ESTADO DE CLIMA
            setForecastWeather(forecastData);
        }
    } catch {
        setIsVisible(true);
    }
};

export default getWeatherDataExtend;