import { ReactNode } from 'react';

// PROPIEDAD LAT Y LON DE NAVIGATOR
export interface ICoordinates {
    latitude: number;
    longitude: number;
}

// PROPIEDAD GUST Y SPEED DENTRO DE WIND
export interface IWindSpeed {
    gust: number;
    speed: number;
}

// PROPIEDAD DEG DENTRO DE WIND
export interface IDeg {
    deg: number;
}

export interface IIcons {
    icon: string;
}

export interface IName {
    name: string;
}

export interface IWeather extends IIcons {
    id: number,
    description: string,
}

export interface IDataImageName extends IIcons {
    temp: number
};

export interface IDataHumFeel {
    humidity: number;
    feels_like: number;
};

export interface IWeatherMain extends IDataMinMax, IDeg, IWindSpeed, IDataHumFeel, IName {
    temp: number;
}

export interface IDataMinMax {
    temp_min: number,
    temp_max: number
};

// INTERFACE GENERAL QUE COMBINA TODOS LOS TIPOS
export interface IWeatherData extends IDataHumFeel, IWeather, ICoordinates, IWeatherMain {
    isLoading: boolean;
}

export type Loading = { isLoading: boolean }

export type ActionApi =
    | { type: 'SET_WEATHER', payload: IWeatherData }
    | { type: 'SET_COORDINATES', payload: ICoordinates }
    | { type: 'SET_LOADING', payload: boolean }


export type Cardinals = 'Noreste' | 'Este' | 'Sureste' | 'Sur' | 'Suroeste' | 'Oeste' | 'Noroeste' | 'Norte';

export enum CardinalsEnum {
    N = 'Norte',
    NE = 'Noreste',
    NOE = 'Noroeste',
    S = 'Sur',
    SE = 'Sureste',
    SOE = 'Suroeste',
    O = 'Oeste',
    E = 'Este'
}


export interface ContextWeatherProviderProps {
    children: ReactNode;
}

// OBTENER UBIACION DEL USUARIO
export interface IGetLocationUser{
    setCoordinates:( { latitude, longitude}: ICoordinates)=> void, 
    setLoading:(isLoading:boolean)=>void
}

export interface IGetWeather{
    latitude: number, 
    longitude: number, 
    setWeather: ({...state}: IWeatherData)=> void, 
    setLoading: (isLoading:boolean)=> void
}

export interface IContextWeather {
    state: IWeatherData;
    setCoordinates: (payload: { latitude: number; longitude: number }) => void;
    setWeather: (payload: IWeatherData) => void;
    setLoading: (payload: boolean) => void;
}