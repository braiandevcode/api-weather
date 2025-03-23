import { useContext, useEffect, useState } from 'react';
import getUserLocation from '../services/getUserGeoLocation';
import getWeatherData from '../services/getWeatherData';
import { ArticleData } from './ArticleData';
import { ContextWeather } from '../context/ContextCurrentWeather';
import { TypeContextCurrentWeather, TypeContextForecastWeather, TypeContextSearch } from '../types/types.d';
import { Card, Col, Row, Stack } from 'react-bootstrap';
import getWeatherDataExtend from '../services/getWeatherExtendTimeHours';
import { ContextForecast } from '../context/ContextForecastWheather';
import formatDateToNameDay from '../helpers/formatDateToNameDay';
import { Calendar } from 'react-bootstrap-icons';
import { Loading } from './Loading';
import { ModalErrorSearch } from './ModalError';
import { ContextSearch } from '../context/ContextSearch';

// COMPONENTE SECCION
export function WeatherCityUser() {
    const contextWeather: TypeContextCurrentWeather | null = useContext(ContextWeather);
    const contextSearch: TypeContextSearch | null = useContext(ContextSearch);
    const contextForecast: TypeContextForecastWeather | null = useContext(ContextForecast);

    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isGeolocationError, setIsGeolocationError] = useState(false);

    if (!contextWeather || !contextSearch || !contextForecast) {
        return <Loading />;
    }

    const { stateCurrentWeather, setCoordinates, setLoading, setCurrentWeather } = contextWeather;
    const { setField, isVisible } = contextSearch;
    const { setForecastWeather } = contextForecast;

    // DESESTRUCTURACION DEL STATE
    const { latitude, longitude, dt } = stateCurrentWeather.currentWeather;
    const newDT: Date = new Date(dt * 1000);

    const handleClickModal = () => {
        setField('isVisible', false);
        setShowModal(false);
    };

    // REINTENTAR GEOLocalización
    const retryGeolocation = () => {
        getUserLocation({
            setCoordinates,
            setLoading,
            onError: (message: string) => {
                setModalMessage(message);
                setShowModal(true);
                setIsGeolocationError(true);
            },
        });
        // Recargar la página después de intentar nuevamente
        window.location.reload();
    };

    // OBTENER UBICACIÓN DEL USUARIO
    useEffect(() => {
        getUserLocation({
            setCoordinates,
            setLoading,
            onError: (message: string) => {
                setModalMessage(message);
                setShowModal(true);
                setIsGeolocationError(true); // Marcamos que es un error de geolocalización
            },
        });
    }, []);

    // CONSULTAR API CUANDO LAS COORDENADAS CAMBIAN
    useEffect(() => {
        if (!latitude || !longitude) return;
        const query = async () => {
            setLoading(true);
            await Promise.all([
                getWeatherData({
                    latitude,
                    longitude,
                    setCurrentWeather,
                    setLoading,
                    setButtonLoading: (value) => setField('isButtonLoading', value),
                    setIsVisible: (value) => setField('isVisible', value),
                }),
                getWeatherDataExtend({
                    latitude,
                    longitude,
                    setForecastWeather,
                    setIsVisible: (value) => setField('isVisible', value),
                }),
            ]);
            setLoading(false);
        };
        query();
    }, [latitude, longitude]); //DEPENDENCIA DE COORDENADAS

    return (
        <>
            {showModal && (
                <ModalErrorSearch
                    handleClickModal={handleClickModal}
                    title="Sin ubicación"
                    info={modalMessage}
                    isGeolocationError={isGeolocationError} // Pasamos el estado del error de geolocalización
                    retryGeolocation={retryGeolocation} // Pasamos la función para reintentar
                />
            )}

            {!stateCurrentWeather.currentWeather.isLoading || contextSearch.isButtonLoading ? (
                isVisible ? (
                    <ModalErrorSearch
                        handleClickModal={handleClickModal}
                        title="Upps!"
                        info="No se encontró localización"
                        isGeolocationError={false}
                        retryGeolocation={retryGeolocation}
                    />
                ) : (
                    <Row className="justify-content-center align-content-center">
                        <Col xs="12">
                            <Card className="shadow rounded-4 border-0 p-3">
                                <Card.Body>
                                    <Stack direction="vertical" gap={3}>
                                        <Stack direction="horizontal" gap={2} className="align-items-xl-center justify-content-xl-around justify-content-center flex-column flex-xl-row">
                                            <Stack direction="horizontal" gap={2} className="align-items-center justify-content-sm-center">
                                                <Calendar size={20} className="text-secondary" />
                                                <p className="p-0 m-0 fs-5 fs-lg-3 text-secondary">
                                                    {formatDateToNameDay(dt)}
                                                </p>
                                            </Stack>
                                            <span className="text-warning fw-bold fs-5 fs-lg-4">
                                                {newDT?.toLocaleDateString()}
                                            </span>
                                        </Stack>
                                        <ArticleData />
                                    </Stack>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )
            ) : (
                <Loading />
            )}
        </>
    );
}
