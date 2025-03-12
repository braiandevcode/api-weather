import { useContext, useEffect } from 'react';
import { Loading } from './Loading';
import getUserLocation from '../services/getUserGeoLocation';
import getWeatherData from '../services/getWeatherData';
import { ArticleData } from './ArticleData';
import { ContextWeather } from '../context/ContextWeather';
import { IContexSearch, IContextForecast, IContextWeather } from '../types/types.d';
import { Card, Col, Row, Stack } from 'react-bootstrap';
import { ModalErrorSearch } from './ModalErrorSearch';
import { ContextSearch } from '../context/ContextSearch';
import getWeatherDataExtend from '../services/getWeatherExtendTimeHours';
import { ContextForecast } from '../context/ContextWheatherExtend';
import formatDateToNameDay from '../helpers/formatDateToNameDay';
import { separatorDate } from '../helpers/separatorDate';
import { GeoAlt, Calendar } from 'react-bootstrap-icons'; // Importamos los iconos

// COMPONENTE SECCION
export function WeatherCityUser() {
    // CONTEXTOS
    const contextWeather: IContextWeather | null = useContext(ContextWeather);
    const contextSearch: IContexSearch | null = useContext(ContextSearch);
    const contextForecast: IContextForecast | null = useContext(ContextForecast);

    if (!contextWeather || !contextSearch || !contextForecast) {
        return null;
    }

    const { state, setCoordinates, setLoading, setCurrentWeather } = contextWeather;
    const { setField, isVisible } = contextSearch;
    const { setForecastWeather, state: stateForecast } = contextForecast;

    // DESESTRUCTURACION DEL STATE
    const { latitude, longitude, isLoading, name, dt } = state.currentWeather;

    const handleClickModal = () => {
        setField('isVisible', false);
    };

    // OBTENER UBICACIÓN DEL USUARIO
    useEffect(() => {
        getUserLocation({ setCoordinates, setLoading });
    }, []);

    // CONSULTAR API CUANDO LAS COORDENADAS CAMBIAN
    useEffect(() => {
        if (!latitude || !longitude) return;
        const query = async () => {
            return await Promise.all([  
                getWeatherData({
                    latitude,
                    longitude,
                    setCurrentWeather,
                    setLoading,
                    setButtonLoading: (value) => setField('isButtonLoading', value),
                    setIsVisible: (value) => setField('isVisible', value)
                }),
                getWeatherDataExtend({
                    latitude,
                    longitude,
                    setForecastWeather,
                    setLoading,
                    setButtonLoading: (value) => setField('isButtonLoading', value),
                    setIsVisible: (value) => setField('isVisible', value),
                })
            ]);
        };
        query();
    }, [latitude, longitude]); //DEPENDENCIA DE COORDENADAS

    // RENDERIZADO DEL COMPONENTE
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {isVisible && (
                        <ModalErrorSearch
                            handleClickModal={handleClickModal}
                            title="Upps!!"
                            info="La zona especificada no fue encontrada. Vuelve a intentarlo."
                        />
                    )}

                    <Row className="justify-content-center align-content-center">
                        <Col xs="12">
                            {/* Aquí agregamos la tarjeta para mejorar el diseño */}
                            <Card className="shadow rounded-4 border-0 bg-light p-3">
                                <Card.Body>
                                    <Stack direction="vertical" gap={3}>
                                        {/* Nombre de la ciudad */}
                                        <h4 className="p-0 m-0 fw-bold">
                                            <GeoAlt size={20} className="text-primary" /> {/* Icono de ubicación */}
                                            {name ? name : 'Desconocida'}
                                        </h4>

                                        {/* Fecha */}
                                        <Stack direction="horizontal" gap={2} className="align-items-center">
                                            <Calendar size={20} className="text-secondary" /> {/* Icono de calendario */}
                                            <p className="p-0 m-0 fs-3 text-secondary">
                                                {formatDateToNameDay(dt)}
                                            </p>
                                            -
                                            <span className="text-danger fs-3">
                                                {separatorDate(' ', 0, false, stateForecast.forecast[0]?.date)
                                                    ?.split('-')
                                                    .reverse()
                                                    .join('-')}
                                            </span>
                                        </Stack>

                                        {/* Datos adicionales */}
                                        <ArticleData />
                                    </Stack>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
}
