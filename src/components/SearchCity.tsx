import { useContext, useEffect } from 'react';
import { Col, FormControl, Stack } from 'react-bootstrap';
import { ContextSearch } from '../context/ContextSearch';
import changeFilterLocation from '../services/changeFilterLocation';
import { ContextWeather } from '../context/ContextWeather';
import { IContexSearch, IContextWeather } from '../types/types.d';

export function SearchCity() {
    // OBTENER VALOR DEL CONTEXTO
    const contextWeather: IContextWeather | null = useContext(ContextWeather);
    const contextSearch: IContexSearch | null = useContext(ContextSearch);

    // SI NO HAY CONTEXTO
    if (!contextWeather || !contextSearch) {
        return null;
    }

    const { setLoading, setWeather } = contextWeather; //DESTRUCTURING

    const { searchQuery, setField, location, handleChange } = contextSearch; //DESTRUCTURINg

    // USEEFFECT SEARCH QUERY CITY
    useEffect(() => {
        if (searchQuery) {
            changeFilterLocation({ 
                name: searchQuery, 
                setWeather, 
                setLoading, 
                setIsVisible: (value)=> setField('isVisible', value)
            });
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
                    </Stack>
                </Stack>
            </Col>
        </>
    );
}