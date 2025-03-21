import { GetLocationUser } from '../types/types.d';

const getUserLocation = ({
    setCoordinates,
    setLoading,
    onError, // ✅ Recibe la función para mostrar el error desde el padre
}: GetLocationUser & { onError: (message: string) => void }) => {
    const getPosition = (pos: GeolocationPosition) => {
        const { latitude, longitude } = pos.coords;
        setCoordinates({ latitude, longitude });
        setLoading(true);
    };

    const getError = (err: GeolocationPositionError) => {
        console.error('Error obteniendo la ubicación:', err);
        setLoading(false);

        switch (err.code) {
            case err.PERMISSION_DENIED:
                onError(
                    'Permiso de ubicación denegado. Habilítalo en la configuración del navegador para obtener tu ubicación.'
                );
                break;
            case err.POSITION_UNAVAILABLE:
                onError(
                    'La geolocalización está desactivada o no disponible en tu dispositivo. Habilítala en la configuración del sistema para continuar.'
                );
                break;
            case err.TIMEOUT:
                onError(
                    'No se pudo obtener la ubicación a tiempo. Intenta nuevamente.'
                );
                break;
            default:
                onError('Error desconocido al obtener la ubicación.');
                break;
        }
    };

    if (navigator.geolocation) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(getPosition, getError);
    } else {
        onError('La geolocalización no está disponible en este navegador.');
        setLoading(false);
    }
};

export default getUserLocation;
