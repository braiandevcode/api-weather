import { dataUrl, dataUrlFilterSearch } from '../constants';
import query from '../helpers/query';
import { IGetWeather, IWeatherData } from '../types/types.d';
import getWeatherData from './getWeatherData';
import getWeatherDataExtend from './getWeatherExtendTimeHours';

const changeLocation = async ({ latitude, name, longitude, setButtonLoading,  setLoading, setIsVisible, setForecastWeather, setCurrentWeather }: Omit<IGetWeather, 'stateCurrentWeather' | 'stateForecastWeather' | 'setCoordinates'> & Pick<IWeatherData, 'name'>) => {
    let URL: string;

    if (name) {
        const { DOMAIN, FILTER } = dataUrlFilterSearch(name);
        URL = `${DOMAIN}${FILTER}`;
    } else {
        const { DOMAIN, SEARCH } = dataUrl({ latitude, longitude });
        URL = `${DOMAIN}${SEARCH}`;
    }

    const result = await query({url: URL, setLoading, setButtonLoading, setIsVisible});

    if (result) {
        // Si es una búsqueda por ciudad, extraemos las coordenadas
        if (name) {
            const LAT:number = result[0]?.lat;
            const LON:number = result[0]?.lon;
            getWeatherData({ latitude: LAT, longitude: LON, setCurrentWeather, setIsVisible, setLoading, setButtonLoading});
            getWeatherDataExtend({ 
                latitude:LAT, 
                longitude:LON, 
                setIsVisible, 
                setForecastWeather, 
            });
        } else {
            // Si no es por ciudad, ya tenemos los datos directamente
            getWeatherData({ latitude, longitude, setCurrentWeather, setIsVisible, setLoading, setButtonLoading });
        }
    }
};

export default changeLocation;