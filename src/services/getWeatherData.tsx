import { dataUrl } from '../constants';
import convertWindSpeed from '../helpers/convertWindSpeed';
import { kelvinToCelsius } from '../helpers/kelvin';
import { IGetWeather, IDeg, IWeather, IWeatherMain, IWindSpeed } from '../types/types.d';

// CONSULTAR CLIMA
const getWeatherData = async ({ latitude, longitude, setWeather, setLoading, setIsVisible }: IGetWeather):Promise<void> => {
    try {
        setLoading(true); //MODIFICADOR DE ESTADO DE LOADING 
        setIsVisible(false);
        const { DOMAIN, SEARCH } = dataUrl({ latitude, longitude });
        const URL = `${DOMAIN}${SEARCH}`;

        const response = await fetch(URL);

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const result = await response.json();

        // SI HAY RESULTADOS
        if (result) {
            const { deg, gust, speed }: IDeg & IWindSpeed = result.wind; //DATOS DEL VIENTO            
            const { humidity, ...kelvinValues }: IWeatherMain = result.main; //HUMEDAD Y COMPIA DE OBJETO A NUEVO OBJETO
            const { description, id, icon }: IWeather = result.weather[0]; //DESCRIPCION, ID E ICONO

            const { roundGust, roundAverage } = convertWindSpeed({ gust, speed }); // DESESTRUCTURACION DE CONVERSION DE VELOCIDAD DE VIENTO.
            const convertedTemperatures = kelvinToCelsius({ obj: kelvinValues}); //CONVERTIMOS VALORES A CELSIUS
            const { temp, temp_min, temp_max, feels_like } = convertedTemperatures; // DESESTRUCTURAMOS
            
            // MODIFICADOR DE ESTADO DE CLIMA
            setWeather({ 
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
                id,
                icon,
                isLoading: false,
                latitude,
                longitude,
            });
        }
    } catch (error) {
        console.error('Error obteniendo los datos del clima:', error);
        setIsVisible(true);
    } finally {
        setLoading(false);
    }
};

export default getWeatherData;