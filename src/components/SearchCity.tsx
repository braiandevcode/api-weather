import { useContext, useEffect } from 'react';
import { Col, FormControl, Stack } from 'react-bootstrap';
import { ContextSearch } from '../context/ContextSearch';
import { ContextWeather } from '../context/ContextCurrentWeather';
import { TypeContextSearch, TypeContextCurrentWeather, TypeContextForecastWeather } from '../types/types.d';
import changeLocation from '../services/changeLocation';
import { ContextForecast } from '../context/ContextForecastWheather';
import { Loading } from './Loading';

export function SearchCity() {
    // OBTENER VALOR DEL CONTEXTO
    const contextWeather: TypeContextCurrentWeather | null = useContext(ContextWeather);
    const contextSearch: TypeContextSearch | null = useContext(ContextSearch);
    const contextForecast: TypeContextForecastWeather | null = useContext(ContextForecast);

    // SI NO HAY CONTEXTO
    if (!contextWeather || !contextSearch || !contextForecast) {
        return <Loading />;
    }

    const { setLoading, setCurrentWeather } = contextWeather; //DESTRUCTURING
    const { setForecastWeather } = contextForecast;
    const { searchQuery, setField, location, handleChangeCity, errors } = contextSearch; //DESTRUCTURINg

    // USEEFFECT SEARCH QUERY CITY
    useEffect(() => {
        if (searchQuery) {
            changeLocation({
                latitude: 0,
                name: searchQuery,
                longitude: 0,
                setButtonLoading: (value) => setField('isButtonLoading', value),
                setLoading,
                setIsVisible: (value) => setField('isVisible', value),
                setForecastWeather,
                setCurrentWeather,
            });
        }
    }, [searchQuery]);

    // RENDER INPUT CITY
    return (
        <Col xs={12} sm="auto" className="mb-3 w-100">
          <Stack gap={3}>
            <div>
              <span className="fs-6">Search by city or province name</span>
            </div>
            <Stack gap={2}>
              <FormControl
                type="text"
                id="filterLocation"
                placeholder="City or Province"
                value={location}
                onChange={handleChangeCity}
                autoFocus
                className="w-100"
              />
              {errors?.location?.isError && (
                <p className="text-danger fs-6">
                  <strong className="me-2">Invalid entry:</strong>
                  {errors.location?.message}
                </p>
              )}
            </Stack>
          </Stack>
        </Col>
      );
}