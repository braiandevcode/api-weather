import { ErrorsMessage, ICoordinates, IIcons } from './types/types.d';

// URL DATA CLIMA
export const dataUrl = ({ latitude, longitude }: ICoordinates) => {
    return {
        DOMAIN: `${import.meta.env.VITE_DOMAIN}`,
        SEARCH: `weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`,
        EXTEND_WEEK: `forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`
    };
};

// URL DATA ICONOS
export const dataUrlIcon = ({ icon }: IIcons) => {
    return `${import.meta.env.VITE_URL_ICON}/${icon}@2x.png`;
};

// PARA FILTRADO DE BUSQUEDA
export const dataUrlFilterSearch = (name:string) => {
    return {
        DOMAIN: `${import.meta.env.VITE_DOMAIN_GEO}`,
        FILTER: `direct?q=${name}&limit=1&appid=${import.meta.env.VITE_API_KEY}`
    };
};

export const ERRORS_SEARCH_FORM ={
    latManual: { message: ErrorsMessage.S_LAT_LONG},
    longManual:{ message: ErrorsMessage.S_LAT_LONG},
    location: { message: ErrorsMessage.S_LOCATION }
};