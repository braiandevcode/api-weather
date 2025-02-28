import { IGetLocationUser } from '../types/types.d';

// OBTENER UBIACION DEL USUARIO
const getUserLocation = ({ setCoordinates, setLoading }:IGetLocationUser) => {
    const getPosition = (pos: GeolocationPosition) => {
        setLoading(true);
        const { latitude, longitude } = pos.coords;
        setCoordinates({ latitude, longitude });
    };

    const getError = (err: GeolocationPositionError) => {
        console.error('Error obteniendo la ubicación:', err);
        setLoading(true);
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition, getError);
    } else {
        console.error('La geolocalización no está disponible.');
    }
};

export default getUserLocation;
