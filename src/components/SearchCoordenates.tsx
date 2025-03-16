import { useContext, useEffect } from 'react';
import { Col, FormControl, Stack } from 'react-bootstrap';
import { ContextSearch } from '../context/ContextSearch';
import { ContexSearch, ContextForecastWeather, ContextCurrentWeather} from '../types/types.d';
import { ContextWeather } from '../context/ContextCurrentWeather';
import changeLocation from '../services/changeLocation';
import { ContextForecast } from '../context/ContextForecastWheather';
import { Loading } from './Loading';

// COMPONENTE BUSCADOR DE COORDENADAS
export function SearchCoordenates() {
    // OBTENER VALOR DEL CONTEXTO
    const contextWeather: ContextCurrentWeather | null = useContext(ContextWeather);
    const contextSearch: ContexSearch | null = useContext(ContextSearch);
    const contextForecast: ContextForecastWeather | null = useContext(ContextForecast);

    if (!contextSearch || !contextWeather || !contextForecast) return <Loading />;

    const { setCurrentWeather, setLoading} = contextWeather; //DESTRUCTURING CONTEXT WEATHER

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
                setIsVisible: (value)=> setField('isVisible', value),
            });
        }
    }, [searchQueryLat, searchQueryLon]);

    return (
        <Col xs={12} sm="auto" className="mb-3 w-100">
          <Stack gap={3}>
            <div>
              <span className="fs-6">Not the desired area? Enter the coordinates for better precision:</span>
            </div>
            <Stack gap={2}>
              <Stack gap={2}>
                <FormControl
                  type="text"
                  value={latManual}
                  onChange={handleChangeLat}
                  placeholder="Latitude - e.g.: 33.15565485"
                  className="w-100"
                />
                {errors?.latManual?.isError && (
                  <p className="text-danger fs-6">
                    <strong className="me-2">Invalid entry:</strong>
                    {errors.latManual?.message}
                  </p>
                )}
              </Stack>
              <Stack gap={2}>
                <FormControl
                  type="text"
                  value={longManual}
                  onChange={handleChangeLon}
                  placeholder="Longitude - e.g.: -33.15565485"
                  className="w-100"
                />
                {errors?.longManual?.isError && (
                  <p className="text-danger fs-6">
                    <strong className="me-2">Invalid entry:</strong>
                    {errors.longManual?.message}
                  </p>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Col>
      );
}
