import { dataUrl } from '../constants';
import convertWindSpeed from '../helpers/convertWindSpeed';
import { kelvinToCelsius } from '../helpers/kelvin';
import { IGetWeather, IDeg, IWeather, IWeatherMain, IWindSpeed } from '../types/types.d';

// CONSULTAR CLIMA
const getWeatherData = async ({ latitude, longitude, setWeather, setLoading }: IGetWeather) => {
    try {
        setLoading(true);
        const { DOMAIN, SEARCH } = dataUrl({ latitude, longitude });
        const URL = `${DOMAIN}${SEARCH}`;

        const response = await fetch(URL);

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const result = await response.json();
        if (result) {
            const { deg, gust, speed }: IDeg & IWindSpeed= result.wind;
            const { humidity, temp, temp_max, temp_min, feels_like }: IWeatherMain = result.main;
            const { description, id, icon }: IWeather = result.weather[0];

            setWeather({
                temp: kelvinToCelsius(temp),
                temp_max: kelvinToCelsius(temp_max),
                temp_min: kelvinToCelsius(temp_min),
                humidity,
                feels_like: kelvinToCelsius(feels_like),
                deg,
                gust: convertWindSpeed({ gust, speed }).gust,
                speed: convertWindSpeed({ gust, speed }).speed,
                name: result.name,
                description,
                id,
                icon,
                isLoading: false,
                latitude,
                longitude
            });
        }
    } catch (error) {
        console.error('Error obteniendo los datos del clima:', error);
    } finally {
        setLoading(false);
    }
};

export default getWeatherData;