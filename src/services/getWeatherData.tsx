import { dataUrl } from '../constants';
import convertWindSpeed from '../helpers/convertWindSpeed';
import { kelvinToCelsius } from '../helpers/kelvin';
import query from '../helpers/query';
import { IGetWeather, IWeatherData, WeatherMain } from '../types/types.d';

const getWeatherData = async ({
    latitude,
    longitude,
    setCurrentWeather,
    setIsVisible,
    setLoading,
    setButtonLoading,
}: Pick<IGetWeather, 'latitude' | 'longitude' | 'setCurrentWeather' | 'setLoading' | 'setButtonLoading' | 'setIsVisible'>): Promise<void> => {
    try {
        const { DOMAIN, SEARCH } = dataUrl({ latitude, longitude });
        const URL = `${DOMAIN}${SEARCH}`;

        const result = await query({ url: URL, setLoading, setButtonLoading, setIsVisible });

        // SI HAY RESULTADOS
        if (result) {
            const { deg, gust, speed }: Pick<IWeatherData, 'deg' | 'gust' | 'speed'> = result.wind;
            const { humidity, ...kelvinValues }: WeatherMain = result.main;
            const { description, icon }: Pick<IWeatherData, 'description' | 'icon'> = result.weather[0];

            const { roundGust, roundAverage } = convertWindSpeed({ gust, speed });
            const convertedTemperatures = kelvinToCelsius({ obj: kelvinValues });
            const { temp, temp_min, temp_max, feels_like } = convertedTemperatures;

            // Modificar el estado del clima
            setCurrentWeather({
                temp,
                temp_min,
                temp_max,
                feels_like,
                humidity,
                deg,
                gust: roundGust,
                speed: roundAverage,
                name: result.name,
                description,
                icon,
                isLoading: false,
                latitude,
                longitude,
                dt: result.dt,
            });
        }
    } catch {
        setIsVisible(true);
    } finally {
        setLoading(false);
        setButtonLoading(false);
    }
};

export default getWeatherData;
