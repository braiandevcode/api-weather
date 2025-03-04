import { IGetWeather } from '../types/types.d';
import getWeatherData from './getWeatherData';

const changeLocationLatAndLon = async ({ latitude, longitude, setWeather, setLoading, setIsVisible }: IGetWeather): Promise<void> => {
    try {
      getWeatherData({ latitude, longitude, setWeather, setLoading, setIsVisible });  
    } catch (error) {
        console.error('Error al obtener zona del clima:', error);
        setIsVisible(true);
    } finally {
        setLoading(false);
    }
};

export default changeLocationLatAndLon;