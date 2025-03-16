import { dataUrl } from '../constants';
import convertWindSpeed from '../helpers/convertWindSpeed';
import { kelvinToCelsius } from '../helpers/kelvin';
import query from '../helpers/query';
import { IGetWeather, IWeatherData, WeatherMain } from '../types/types.d';

// CONSULTAR CLIMA
const getWeatherData = async ({ latitude, longitude, setCurrentWeather, setIsVisible, setLoading, setButtonLoading,  }: Pick<IGetWeather, 'latitude' | 'longitude' | 'setCurrentWeather' | 'setLoading' | 'setButtonLoading' | 'setIsVisible'>):Promise<void> => {
    try {
        const { DOMAIN, SEARCH } = dataUrl({ latitude, longitude });
        const URL = `${DOMAIN}${SEARCH}`;

        const result = await query({ url:URL, setLoading, setButtonLoading, setIsVisible });
        
        // SI HAY RESULTADOS
        if (result) {            
            const { deg, gust, speed }: Pick<IWeatherData, 'deg' | 'gust' | 'speed'> = result.wind; //DATOS DEL VIENTO            
            const { humidity, ...kelvinValues }: WeatherMain = result.main; //HUMEDAD Y COPIA DE OBJETO A NUEVO OBJETO
            const { description, icon }: Pick<IWeatherData, 'description' | 'icon'> = result.weather[0]; //DESCRIPCION, ID E ICONO
    
            const { roundGust, roundAverage } = convertWindSpeed({ gust, speed }); // DESESTRUCTURACION DE CONVERSION DE VELOCIDAD DE VIENTO.
            const convertedTemperatures = kelvinToCelsius({ obj: kelvinValues}); //CONVERTIMOS VALORES A CELSIUS
            const { temp, temp_min, temp_max, feels_like } = convertedTemperatures; // DESESTRUCTURAMOS
            
            // MODIFICADOR DE ESTADO DE CLIMA
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
    } catch{
        setIsVisible(true);
    }finally{
        setLoading(false);
        setButtonLoading(false);
    }
};

export default getWeatherData;