import { generateResponsiveConfig } from './helpers/defineResponsive';
import { ErrorsMessage, Coordinates, IWeatherData,  ConfigItem } from './types/types.d';

// URL DATA CLIMA
export const dataUrl = ({ latitude, longitude }: Coordinates) => {
    return {
        DOMAIN: `${import.meta.env.VITE_DOMAIN}`,
        SEARCH: `weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`,
        EXTEND_WEEK: `forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`
    };
};

// URL DATA ICONOS
export const dataUrlIcon = ({ icon }: Pick<IWeatherData, 'icon'>) => {
    return `${import.meta.env.VITE_URL_ICON}/${icon}@2x.png`;
};

// PARA FILTRADO DE BUSQUEDA
export const dataUrlFilterSearch = (name: string | null) => {
    return {
        DOMAIN: `${import.meta.env.VITE_DOMAIN_GEO}`,
        FILTER: `direct?q=${name}&limit=1&appid=${import.meta.env.VITE_API_KEY}`
    };
};

export const ERRORS_SEARCH_FORM = {
    latManual: { message: ErrorsMessage.S_LAT_LONG },
    longManual: { message: ErrorsMessage.S_LAT_LONG },
    location: { message: ErrorsMessage.S_LOCATION }
};

// CONFIG RESPONSIVE CAROUSEL
const config: ConfigItem[] = [
    {
        name: 'desktop',
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 1,
    },
    {
        name: 'tablet',
        breakpoint: { max: 1024, min: 768 },
        items: 3,
        slidesToSlide: 1,
    },
    {
        name: 'mobile',
        breakpoint: { max: 768, min: 0 },
        items: 1,
        slidesToSlide: 1,
    },
];

// RESPONSIVE
export const responsive = generateResponsiveConfig(config);