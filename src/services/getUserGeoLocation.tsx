import { GetLocationUser } from '../types/types.d';

// OBTENER UBICACION DEL USUARIO
const getUserLocation = ({ setCoordinates, setLoading }:GetLocationUser) => {

    // FUNCION QUE LOCALIZA LA POSICION DEL USUARIO
    const getPosition = (pos: GeolocationPosition) => {
        setLoading(true);
        const { latitude, longitude } = pos.coords;    
        setCoordinates({ latitude, longitude }); //MODIFICADOR DE ESTADO DE  COORDENADAS
    };

    // FUNCION QUE EJECUTA EL MENSAJE DE ERROR EN LA GEOLOCALIZACIÓN
    const getError = (err: GeolocationPositionError) => {
        console.error('Error obteniendo la ubicación:', err);
        setLoading(false);
    };

    // SI HAY UNA GEOLOCALIZACIÓN
    if (navigator.geolocation) {
        setLoading(false);
        navigator.geolocation.getCurrentPosition(getPosition, getError);
    } else {
        console.error('La geolocalización no está disponible.');
    }
};

export default getUserLocation;
