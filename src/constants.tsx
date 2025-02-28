import { ICoordinates, IIcons } from './types/types.d';

export const dataUrl= ({latitude, longitude}: ICoordinates) =>  {
    return{
        DOMAIN: `${import.meta.env.VITE_DOMAIN}`,
        SEARCH: `weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`,
    }; 
};

export const dataUrlIcon =({ icon }: IIcons) =>{
    return `${import.meta.env.VITE_URL_ICON}/${icon}@2x.png`;
};