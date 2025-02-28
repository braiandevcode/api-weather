import { useContext, useEffect } from 'react';
import { Loading } from './Loading';
import getUserLocation from '../services/getUserGeoLocation';
import getWeatherData from '../services/getWeatherData';
import { ArticleData } from './ArticleData';
import { ContextWeather } from '../context/ContextWeather';
import { IContextWeather } from '../types/types.d';

// COMPONENTE SECCION
export function SectionWeatherCityUser() {
    // Obtener el valor del contexto
    const context: IContextWeather | undefined = useContext(ContextWeather);
     
    if(!context){
        return <Loading />;
    }
    
    const { state, setCoordinates, setLoading, setWeather } = context;
    // DESESTRUCTURACION DEL STATE
    const { latitude, longitude,  isLoading, name } = state;

    // OBTENER UBICACIÓN DEL USUARIO
    useEffect(() => {
       getUserLocation({setCoordinates, setLoading});
    }, []);

    // CONSULTAR API CUANDO LAS COORDENADAS CAMBIAN
    useEffect(() => {
        if (!latitude || !longitude) return;
        getWeatherData({ latitude: latitude, longitude:longitude, setWeather, setLoading});
    }, [latitude, longitude]); //DEPENDENCIA DE COORDENADAS
    
    // RENDERIZADO DEL COMPONENTE
    return (
        <>
            {
                isLoading
                    ? <Loading />
                    : <section className='sectionCountry'>
                        <h2 className='sectionCountry__title'>{name}</h2>
                        <ArticleData />
                    </section>
            }
        </>
    );
}
