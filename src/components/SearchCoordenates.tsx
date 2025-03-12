import { useContext, useEffect } from 'react';
import { Col, FormControl, Stack } from 'react-bootstrap';
import { ContextSearch } from '../context/ContextSearch';
import { IContexSearch, IContextForecast, IContextWeather } from '../types/types.d';
import { ContextWeather } from '../context/ContextWeather';
import changeLocation from '../services/changeLocation';
import { ContextForecast } from '../context/ContextWheatherExtend';


export function SearchCoordenates() {
    // OBTENER VALOR DEL CONTEXTO
    const contextWeather: IContextWeather | null = useContext(ContextWeather);
    const contextSearch: IContexSearch | null = useContext(ContextSearch);
    const contextForecast: IContextForecast | null = useContext(ContextForecast);


    if (!contextSearch || !contextWeather || !contextForecast) return null;

    const {  setCurrentWeather, setLoading } = contextWeather; //DESTRUCTURING CONTEXT WEATHER
    const { setForecastWeather } = contextForecast;
    const { errors , searchQueryLat, searchQueryLon, longManual, latManual, handleChangeLat, handleChangeLon, setField } = contextSearch; //DESTRUCTURING CONTEXT SEARCH
    
    useEffect(() => {
        if (searchQueryLat && searchQueryLon) {
            changeLocation({
                latitude: parseFloat(searchQueryLat),
                longitude: parseFloat(searchQueryLon),
                name: null,
                setCurrentWeather,
                setForecastWeather,
                setLoading,
                setButtonLoading: (value)=> setField('isButtonLoading', value),
                setIsVisible: (value)=> setField('isVisible', value)
            });
        }
    }, [searchQueryLat, searchQueryLon]);

    return (
        <>
            <Col xs='auto' className='mb-3 w-100'>
                <Stack gap={3}>
                    <div>
                        <span>¿No es la zona deseada? Ingresa las coordenadas para una mejor presición:</span>
                    </div>
                    <Stack gap={2}>
                        <Stack gap={2}>
                            <FormControl
                                type="text"
                                value={latManual}
                                onChange={handleChangeLat}
                                placeholder="Latitud - ej: 33.15565485"
                                id='filterLatitude'
                            />
                            { errors?.latManual?.isError && <p className='text-danger'><strong className='text-danger me-2'>Entrada invalida:</strong>{errors.latManual?.message}</p>}
                        </Stack>
                        <Stack gap={2}>
                            <FormControl
                                type='text'
                                value={longManual}
                                onChange={handleChangeLon}
                                placeholder="Longitud - ej: -33.15565485"
                                id='filterLongitude'
                            />
                            { errors?.longManual?.isError && <p className='text-danger'><strong className='text-danger me-2'>Entrada invalida:</strong>{errors.longManual?.message}</p>}
                        </Stack>
                    </Stack>
                </Stack>
            </Col>
        </>
    );
}