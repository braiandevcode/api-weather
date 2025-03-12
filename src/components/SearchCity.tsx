import { useContext, useEffect } from 'react';
import { Col, FormControl, Stack } from 'react-bootstrap';
import { ContextSearch } from '../context/ContextSearch';
import { ContextWeather } from '../context/ContextWeather';
import { IContexSearch, IContextForecast, IContextWeather } from '../types/types.d';
import changeLocation from '../services/changeLocation';
import { ContextForecast } from '../context/ContextWheatherExtend';

export function SearchCity() {
    // OBTENER VALOR DEL CONTEXTO
    const contextWeather: IContextWeather | null = useContext(ContextWeather);
    const contextSearch: IContexSearch | null = useContext(ContextSearch);
    const contextForecast: IContextForecast | null = useContext(ContextForecast);

    // SI NO HAY CONTEXTO
    if (!contextWeather || !contextSearch || !contextForecast) {
        return null;
    }

    const { setLoading, setCurrentWeather } = contextWeather; //DESTRUCTURING
    const { setForecastWeather } = contextForecast;
    const { searchQuery, setField, location, handleChange, errors, setButtonLoading } = contextSearch; //DESTRUCTURINg

    // USEEFFECT SEARCH QUERY CITY
    useEffect(() => {
        if (searchQuery) {
            setButtonLoading('isButtonLoading', true);
            changeLocation({
                latitude: 0,
                longitude: 0,
                name: searchQuery,
                setCurrentWeather,
                setForecastWeather,
                setLoading,
                setButtonLoading: (value) => setField('isButtonLoading', value),
                setIsVisible: (value) => setField('isVisible', value)
            });
            setButtonLoading('isButtonLoading', false);

        }
    }, [searchQuery]);

    // RENDER INPUT CITY
    return (
        <>
            <Col xs='auto' className='mb-3 w-100' >
                <Stack gap={3}>
                    <div>
                        <span>Buscar por nombre de ciudad o provincia</span>
                    </div>
                    <Stack gap={2}>
                        <FormControl
                            type="text"
                            id="filterLocation"
                            placeholder="Ciudad o Provincia"
                            value={location}
                            onChange={handleChange}
                            autoFocus
                        />
                        {
                            errors?.location?.isError
                            && <p className='text-danger'><strong className='text-danger me-2'>Entrada invalida:</strong>{errors.location?.message}</p>
                        }
                    </Stack>
                </Stack>
            </Col>
        </>
    );
}