import { useContext, useEffect } from 'react';
import { Loading } from './Loading';
import getUserLocation from '../services/getUserGeoLocation';
import getWeatherData from '../services/getWeatherData';
import { ArticleData } from './ArticleData';
import { ContextWeather } from '../context/ContextWeather';
import { IContexSearch, IContextWeather } from '../types/types.d';
import { Col, Row } from 'react-bootstrap';
import { ModalErrorSearch } from './ModalErrorSearch';
import { ContextSearch } from '../context/ContextSearch';

// COMPONENTE SECCION
export function WeatherCityUser() {
    // CONTEXTOS
    const contextWeather: IContextWeather | null = useContext(ContextWeather);
    const contextSearch: IContexSearch | null = useContext(ContextSearch);

    if (!contextWeather || !contextSearch) {
        return <Loading />;
    }
    
    const { state, setCoordinates, setLoading, setWeather } = contextWeather;
    const { setField } = contextSearch;

    // DESESTRUCTURACION DEL STATE
    const { latitude, longitude, isLoading, name } = state;

    const handleClickModal = () => {
        setField('isVisible', true);
    };
    
    // OBTENER UBICACIÓN DEL USUARIO
    useEffect(() => {
        getUserLocation({ setCoordinates, setLoading });
    }, []);

    // CONSULTAR API CUANDO LAS COORDENADAS CAMBIAN
    useEffect(() => {
        if (!latitude || !longitude) return;
        getWeatherData({ 
            latitude, 
            longitude, 
            setWeather, 
            setLoading, 
            setIsVisible: (value)=> setField('isVisible', value)
        });
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
