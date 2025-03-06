import { useContext, useEffect } from 'react';
import { Col, FormControl, Stack } from 'react-bootstrap';
import { ContextSearch } from '../context/ContextSearch';
import { IContextWeather } from '../types/types.d';
import { ContextWeather } from '../context/ContextWeather';
import changeLocationLatAndLon from '../services/changeLocationLatAndLon';

export function SearchCoordenates() {
    // OBTENER VALOR DEL CONTEXTO
    const contextWeather: IContextWeather | null = useContext(ContextWeather);
    const contextSearch = useContext(ContextSearch);

    if (!contextSearch || !contextWeather) return null;

    const {  setWeather, setLoading } = contextWeather; //DESTRUCTURING CONTEXT WEATHER
    const { searchQueryLat, searchQueryLon, longManual, latManual, handleChangeLat, handleChangeLon, setField } = contextSearch; //DESTRUCTURING CONTEXT SEARCH
    
    useEffect(() => {
        if (searchQueryLat && searchQueryLon) {
            changeLocationLatAndLon({
                latitude: parseFloat(searchQueryLat),
                longitude: parseFloat(searchQueryLon),
                setWeather,
                setLoading,
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
                        </Stack>
                        <Stack gap={2}>
                            <FormControl
                                type='text'
                                value={longManual}
                                onChange={handleChangeLon}
                                placeholder="Longitud - ej: -33.15565485"
                                id='filterLongitude'
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Col>
        </>
    );
}