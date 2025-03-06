import { ChangeEvent, FormEvent, ReactNode } from 'react';

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
export interface IWeatherData extends IDataHumFeel, IWeather, IWeatherMain, ICoordinates {
    isLoading: boolean;
}

// TYPE LOADING
export type Loading = { isLoading: boolean }

// ACTION PAYLOAD CITY USER
export type ActionApiCityUser =
    | { type: 'SET_WEATHER', payload: IWeatherData  }
    | { type: 'SET_COORDINATES', payload: ICoordinates  }
    | { type: 'SET_LOADING', payload: boolean }

    // ACTION PAYLOAD CITY USER
export type ActionApiSearch =
| { type: 'SET_FIELD', field: keyof ISearchForm; value: string | boolean }


// TYPE CARDINAL
export type Cardinals = 'Noreste' | 'Este' | 'Sureste' | 'Sur' | 'Suroeste' | 'Oeste' | 'Noroeste' | 'Norte';


// ENUM CARDINALS
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

// INTERFACE TO PROVIDER
export interface ContextProviderProps {
    children: ReactNode;
}

// OBTENER UBIACION DEL USUARIO
export interface IGetLocationUser{
    setCoordinates:( { latitude, longitude }: ICoordinates)=> void, 
    setLoading:(isLoading:boolean)=>void
}

// INTERFACE GET WEATHER A REVISION
export interface IGetWeather extends ICoordinates{ 
    setWeather: ({...state}: IWeatherData)=> void, 
    setLoading: (isLoading:boolean)=> void,
    setIsVisible:(isVisible:boolean) => void
}

// INTERFACE SEARCH FORM
export interface ISearchForm {
    location:string,
    longManual:string,
    latManual:string,
    searchQuery:string, 
    searchQueryLat: string,
    searchQueryLon: string,
    isVisible:boolean,
}

// INTERFACE CONTEXT SEARCH FORM
export interface IContexSearch extends ISearchForm{
    handleSubmit:(event:FormEvent<HTMLFormElement>) => void;
    handleChange: (event:ChangeEvent<HTMLInputElement>) => void;
    handleChangeLat:(event:ChangeEvent<HTMLInputElement>) => void;
    handleChangeLon: (event:ChangeEvent<HTMLInputElement>) => void;
    setField:(field: keyof ISearchForm, value: string | boolean) => void;
}

// INTERFACE CONTEXT WEATHER
export interface  IContextWeather {
    state: IWeatherData;
    setCoordinates: (payload: { latitude: number; longitude: number }) => void;
    setWeather: (payload: IWeatherData) => void;
    setLoading: (payload: boolean) => void;
}

// INTERFACE KELVIN TO CELSIUS
export interface KelvinCelsius{
    temp:number,
    temp_max:number,
    temp_min:number,
    feels_like:number
}

// INTERFACE FILTER CITY
export interface IGetWeatherFilterCity extends IName{
    setWeather: ({...state}: IWeatherData)=> void, 
    setLoading: (isLoading:boolean)=> void
    setIsVisible: (isVisible:boolean) => void
}
