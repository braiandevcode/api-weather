import { useContext, useEffect } from 'react';
import getUserLocation from '../services/getUserGeoLocation';
import getWeatherData from '../services/getWeatherData';
import { ArticleData } from './ArticleData';
import { ContextWeather } from '../context/ContextCurrentWeather';
import { ContexSearch, ContextCurrentWeather, ContextForecastWeather } from '../types/types.d';
import { Card, Col, Row, Stack } from 'react-bootstrap';
import { ContextSearch } from '../context/ContextSearch';
import getWeatherDataExtend from '../services/getWeatherExtendTimeHours';
import { ContextForecast } from '../context/ContextForecastWheather';
import formatDateToNameDay from '../helpers/formatDateToNameDay';
import { separatorDate } from '../helpers/separatorDate';
import { Calendar } from 'react-bootstrap-icons'; // Importamos los iconos
import { Loading } from './Loading';

// COMPONENTE SECCION
export function WeatherCityUser() {
    // CONTEXTOS
    const contextWeather: ContextCurrentWeather | null = useContext(ContextWeather);
    const contextSearch: ContexSearch | null = useContext(ContextSearch);
    const contextForecast: ContextForecastWeather | null = useContext(ContextForecast);

    if (!contextWeather || !contextSearch || !contextForecast) {
        return <Loading />;
    }

    const { stateCurrentWeather, setCoordinates, setLoading, setCurrentWeather } = contextWeather;
    const { setField } = contextSearch;
    const { setForecastWeather, stateForecastWeather } = contextForecast;

    // DESESTRUCTURACION DEL STATE
    const { latitude, longitude, dt } = stateCurrentWeather.currentWeather;
    const { forecast } = stateForecastWeather;

    if (!forecast) return null;
    const date: string = forecast[0]?.date;

    // const handleClickModal = () => {
    //     setField('isVisible', false);
    // };

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
                    setIsVisible: (value) => setField('isVisible', value),
                })
            ]);
        };
        query();
    }, [latitude, longitude]); //DEPENDENCIA DE COORDENADAS

    // RENDERIZADO DEL COMPONENTE
    return (
        <Row className="justify-content-center align-content-center">
            <Col xs="12">
                <Card className="shadow rounded-4 border-0 bg-light p-3">
                    <Card.Body>
                        <Stack direction="vertical" gap={3}>
                            <Stack direction="horizontal" gap={2} className="align-items-xl-center align-items-xl-center justify-content-xl-around justify-content-center flex-column flex-xl-row">
                               <Stack direction="horizontal" gap={2} className="align-items-center">
                                    <Calendar size={20} className="text-secondary" />
                                    <p className="p-0 m-0 fs-5 fs-lg-3 text-secondary">{formatDateToNameDay(dt)}</p>
                                </Stack>
                                <span className="text-warning fw-bold fs-5 fs-lg-4 ">
                                    {separatorDate(' ', 0, false, date)?.split('-').reverse().join('-')}
                                </span>
                            </Stack>
                            <ArticleData />
                        </Stack>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );

}
