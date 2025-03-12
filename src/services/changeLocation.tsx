import { dataUrl, dataUrlFilterSearch } from '../constants';
import query from '../helpers/query';
import { IGetWeatherFilterCity } from '../types/types.d';
import getWeatherData from './getWeatherData';
import getWeatherDataExtend from './getWeatherExtendTimeHours';

const changeLocation = async ({ latitude, longitude, name, setCurrentWeather, setButtonLoading, setLoading, setForecastWeather, setIsVisible }: IGetWeatherFilterCity) => {
    let URL: string;

    if (name) {
        const { DOMAIN, FILTER } = dataUrlFilterSearch(name);
        URL = `${DOMAIN}${FILTER}`;
    } else {
        const { DOMAIN, SEARCH } = dataUrl({ latitude, longitude });
        URL = `${DOMAIN}${SEARCH}`;
    }

    const result = await query({url: URL, setLoading, setButtonLoading, setIsVisible});

    console.log(result);
    

    if (result) {
        // Si es una búsqueda por ciudad, extraemos las coordenadas
        if (name) {
            const LAT = result[0]?.lat;
            const LON = result[0]?.lon;
            getWeatherData({ latitude: LAT, longitude: LON, setCurrentWeather, setLoading, setIsVisible, setButtonLoading });
            getWeatherDataExtend({ latitude:LAT, longitude:LON, setForecastWeather, setIsVisible, setLoading, setButtonLoading});
        } else {
            // Si no es por ciudad, ya tenemos los datos directamente
            getWeatherData({ latitude, longitude, setCurrentWeather, setLoading, setIsVisible, setButtonLoading });
        }
    }
};

export default changeLocation;