import { dataUrlFilterSearch } from '../constants';
import { IGetWeatherFilterCity } from '../types/types.d';
import getWeatherData from './getWeatherData';

const changeFilterLocation = async ({name:city, setWeather, setLoading, setIsVisible }: IGetWeatherFilterCity): Promise<void> => {
    try {
        setLoading(true); //MODIFICADOR DE ESTADO DE LOADING 
        const { DOMAIN, FILTER } = dataUrlFilterSearch(city);
        const URL_FILTER = `${DOMAIN}${FILTER}`;

        const response = await fetch(URL_FILTER);

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const resultFilter = await response.json();

        if (resultFilter) {
            const LAT = resultFilter[0]?.lat;
            const LON = resultFilter[0]?.lon;
            getWeatherData({ latitude: LAT, longitude:LON, setWeather, setLoading, setIsVisible });
        }
    } catch (error) {
        console.error('Error al obtener zona del clima:', error);
        
    } finally {
        setLoading(false);
    }
};

export default changeFilterLocation;