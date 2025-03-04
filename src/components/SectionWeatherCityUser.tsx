import { useContext, useEffect } from 'react';
import { Loading } from './Loading';
import getUserLocation from '../services/getUserGeoLocation';
import getWeatherData from '../services/getWeatherData';
import { ArticleData } from './ArticleData';
import { ContextWeather } from '../context/ContextWeather';
import { IContextWeather } from '../types/types.d';
import { Col, Row } from 'react-bootstrap';
import { ModalErrorSearch } from './ModalErrorSearch';
// import { ModalErrorSearch } from './ModalErrorSearch';

// COMPONENTE SECCION
export function SectionWeatherCityUser() {
    const handleClickModal = () => {
        setIsVisible(false);
    };
    // Obtener el valor del contexto
    const context: IContextWeather | null = useContext(ContextWeather);

    if (!context) {
        return <Loading />;
    }

    const { state, setCoordinates, setLoading, setWeather, setIsVisible } = context;
    // DESESTRUCTURACION DEL STATE
    const { latitude, longitude, isLoading, name } = state;

    // OBTENER UBICACIÓN DEL USUARIO
    useEffect(() => {
        getUserLocation({ setCoordinates, setLoading });
    }, []);

    // CONSULTAR API CUANDO LAS COORDENADAS CAMBIAN
    useEffect(() => {
        if (!latitude || !longitude) return;
        getWeatherData({ latitude: latitude, longitude: longitude, setWeather, setLoading, setIsVisible });
    }, [latitude, longitude]); //DEPENDENCIA DE COORDENADAS

    // RENDERIZADO DEL COMPONENTE
    return (
        <>
            {
                isLoading
                    ? <Loading />
                    : <>
                        <ModalErrorSearch
                            handleClickModal={handleClickModal}
                            title='Upps!!'
                            info='La zona especificada no fue encontrada.Vuelve a intentarlo.'
                        />
                        <Row className='justify-content-center'>
                            <Col xs='auto'>
                                <h2 className='sectionCountry__title'>{name ? name : 'Desconocido'}</h2>
                                <ArticleData />
                            </Col>
                        </Row>
                    </>
            }
        </>
    );
}
