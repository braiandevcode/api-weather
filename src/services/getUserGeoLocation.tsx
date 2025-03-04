import {IGetLocationUser } from '../types/types.d';

// OBTENER UBICACION DEL USUARIO
const getUserLocation = ({ setCoordinates, setLoading }:IGetLocationUser) => {

    // FUNCION QUE LOCALIZA LA POSICION DEL USUARIO
    const getPosition = (pos: GeolocationPosition) => {
        setLoading(true);
        const { latitude, longitude } = pos.coords;    
        setCoordinates({ latitude, longitude }); //MODIFICADOR DE ESTADO DE  COORDENADAS
    };

    // FUNCION QUE EJECUTA EL MENSAJE DE ERROR EN LA GEOLOCALIZACIÓN
    const getError = (err: GeolocationPositionError) => {
        console.error('Error obteniendo la ubicación:', err);
        setLoading(true);
    };

    // SI HAY UNA GEOLOCALIZACIÓN
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition, getError);
    } else {
        console.error('La geolocalización no está disponible.');
    }
};

export default getUserLocation;
