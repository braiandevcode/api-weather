import { dataUrl } from '../constants';
import convertWindSpeed from '../helpers/convertWindSpeed';
import { kelvinToCelsius } from '../helpers/kelvin';
import query from '../helpers/query';
import { IGetWeather, IDeg, IWeather, IWeatherMain, IWindSpeed } from '../types/types.d';

// CONSULTAR CLIMA
const getWeatherData = async ({ latitude, longitude, setCurrentWeather, setIsVisible, setLoading, setButtonLoading }: IGetWeather):Promise<void> => {
    try {
        const { DOMAIN, SEARCH } = dataUrl({ latitude, longitude });
        const URL = `${DOMAIN}${SEARCH}`;

        const result = await query({ url:URL, setLoading, setButtonLoading, setIsVisible });
        
        console.log(result);
        

        // SI HAY RESULTADOS
        if (result) {            
            const { deg, gust, speed }: IDeg & IWindSpeed = result.wind; //DATOS DEL VIENTO            
            const { humidity, ...kelvinValues }: IWeatherMain = result.main; //HUMEDAD Y COMPIA DE OBJETO A NUEVO OBJETO
            const { description, id, icon }: IWeather = result.weather[0]; //DESCRIPCION, ID E ICONO

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
                id,
                icon,
                isLoading: false,
                latitude,
                longitude,
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