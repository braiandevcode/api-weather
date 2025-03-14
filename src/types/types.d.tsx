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
    name: string | null;
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
    dt:number,
    isLoading: boolean;
}

// Ahora, creamos la interfaz IForecastData extendiendo IWeatherData
export interface IForecastData extends IWeatherData {
    dt:number;
    date: string; // solo agregamos el campo 'date'
}

// TYPE LOADING
export type Loading = { isLoading: boolean }

export interface IState {
    currentWeather: IWeatherData;
    isLoading: boolean;
}

export interface IStateForeCast {
    forecast: IForecastData[];
}

export type Errors = { 
    [key in keyof ISearchForm]?: { 
        isError: boolean; 
        message: string; 
    } 
};


// INTERFACE SEARCH FORM
export interface ISearchForm {
    location:string;
    longManual:string;
    latManual:string;
    searchQuery:string;
    searchQueryLat: string;
    searchQueryLon: string;
    isVisible:boolean;
    errors:Errors
    isButtonLoading:boolean
}

// ACTION PAYLOAD CITY USER
export type ActionApiCityUser = 
    | { type: 'SET_CURRENT_WEATHER', payload: IWeatherData }
    | { type: 'SET_COORDINATES', payload: ICoordinates }
    | { type: 'SET_LOADING', payload: boolean };

export type ActionForecastWeather =
    | { type: 'SET_FORECAST_WEATHER', payload: IForecastData[] }
    | { type: 'SET_FORECAST_INDEX', payload:number }

// ACTION PAYLOAD CITY USER
export type ActionApiSearch =
| { type: 'SET_FIELD', field: keyof ISearchForm; value: string | boolean }
| { type: 'SET_ERROR', field: keyof ISearchForm; value: Errors[keyof ISearchForm] }
| { type: 'SET_BUTTON_LOADING', field: keyof ISearchForm; value: boolean }



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

export enum TimeDate{
    LIGTH_NIGTH='21:00:00',
}

// ENUM CARDINALS
export enum ErrorsMessage{
    S_LAT_LONG = 'Solo se admiten números negativos o positivos.',
    S_LOCATION = 'Solo se admiten letras.',
}

// INTERFACE TO PROVIDER
export interface ContextProviderProps {
    children: ReactNode;
}

// OBTENER UBIACION DEL USUARIO
export interface IGetLocationUser{
    setCoordinates:( { latitude, longitude }: ICoordinates)=> void;
    setLoading:(isLoading:boolean)=>void;
}

// INTERFACE GET WEATHER A REVISION
export interface IGetWeather extends ICoordinates{ 
    setLoading: (isLoading:boolean)=> void;
    setIsVisible:(isVisible:boolean) => void;
    setButtonLoading:(value:boolean) => void;
    setCurrentWeather: ({...state}: IWeatherData)=> void;
}

export interface IGetForecastWeather extends ICoordinates{ 
    setLoading: (isLoading:boolean)=> void;
    setIsVisible:(isVisible:boolean) => void;
    setButtonLoading:(value:boolean) => void;
    setForecastWeather:(payload: IForecastData[]) => void
}

// INTERFACE GET WEATHER A REVISION
export interface IQuery{ 
    url:string,
    setLoading: (isLoading:boolean)=> void;
    setIsVisible:(isVisible:boolean) => void;
    setButtonLoading:(value:boolean) => void;
}

// INTERFACE CONTEXT SEARCH FORM
export interface IContexSearch extends ISearchForm{
    handleSubmit:(event:FormEvent<HTMLFormElement>) => void;
    handleChange: (event:ChangeEvent<HTMLInputElement>) => void;
    handleChangeLat:(event:ChangeEvent<HTMLInputElement>) => void;
    handleChangeLon: (event:ChangeEvent<HTMLInputElement>) => void;
    setField:(field: keyof ISearchForm, value: string | boolean ) => void;
    setButtonLoading:(field: keyof ISearchForm, value: boolean ) => void;
}

// INTERFACE CONTEXT WEATHER
export interface  IContextWeather {
    state: IState;
    setCoordinates: (payload: { latitude: number; longitude: number }) => void;
    setCurrentWeather: (payload: IWeatherData) => void;
    setLoading: (payload: boolean) => void;
}

// INTERFACE KELVIN TO CELSIUS
export interface KelvinCelsius{
    temp:number,
    temp_max:number,
    temp_min:number,
    feels_like:number
}

export interface IContextForecast {
    state: IStateForeCast,
    setForecastWeather: (payload: IForecastData[]) => void;
}

// INTERFACE FILTER CITY
export interface IGetWeatherFilterCity extends IName, ICoordinates{
    setCurrentWeather: ({...state}: IWeatherData)=> void; 
    setForecastWeather: (payload: IForecastData[]) => void;
    setLoading: (isLoading:boolean)=> void;
    setButtonLoading: (value:boolean)=>void;
    setIsVisible: (isVisible:boolean) => void;
}

export interface IForecastDay {
    dt:number;
    dt_txt: string;
    main: IWeatherMain;
    weather: IWeather[];
    wind: IDeg & IWindSpeed;
}


// RECORD KELVIN
export type KeyKelvin = Record<string, number>;