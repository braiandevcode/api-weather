import { ChangeEvent, FormEvent, ReactNode } from 'react';

// INTERFACE GENERAL QUE COMBINA TODOS LOS TIPOS
export type IWeatherData = {
    dt: number,
    date: string,
    temp: number,
    temp_max: number,
    temp_min: number,
    humidity: number,
    feels_like: number,
    name: string | null,
    deg: number,
    gust: number,
    speed: number,
    latitude: number,
    longitude: number,
    isLoading: boolean,
    icon: string,
    id: number,
    description: string,
}

// INTERFACE SEARCH FORM
export interface ISearchForm {
    location: string;
    longManual: string;
    latManual: string;
    searchQuery: string;
    searchQueryLat: string;
    searchQueryLon: string;
    isVisible: boolean;
    errors: Errors;
    isButtonLoading: boolean;
    url: string;
}

// INTERFACE STATE
export interface IState {
    currentWeather: Omit<IWeatherData, 'date' | 'id'>;
    forecast: IWeatherData[];
}

// INTERFACE FORECAST
export interface IForecastDay {
    dt: Pick<IWeatherData, 'dt'>;
    dt_txt: Pick<IWeatherData, 'date'>;
    main: WeatherMain;
    weather: Pick<IWeatherData, 'icon' | 'id' | 'description'>[];
    wind: Pick<IWeatherData, 'deg' | 'speed' | 'gust'>;
}

// INTERFACE GET WEATHER A REVISION
export interface IGetWeather extends Coordinates {
    setLoading: (isLoading: boolean) => void;
    setIsVisible: (isVisible: boolean) => void;
    setButtonLoading: (value: boolean) => void;
    setCurrentWeather: ({ ...state }: Omit<IWeatherData, 'date' | 'id'>) => void;
    setForecastWeather: (payload: IWeatherData[]) => void;
    setCoordinates: ({ latitude, longitude }: Coordinates) => void;
    stateCurrentWeather: Pick<IState, 'currentWeather'>;
    stateForecastWeather: Pick<IState, 'forecast'>;
}

// INTERFACE HANDLE CHANGES
export interface IHandleChangeSearch {
    setErrors: (field: keyof Errors, value: Errors[keyof ISearchForm]) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    handleChangeCity: (event: ChangeEvent<HTMLInputElement>) => void;
    handleChangeLat: (event: ChangeEvent<HTMLInputElement>) => void;
    handleChangeLon: (event: ChangeEvent<HTMLInputElement>) => void;
    setField: (field: keyof ISearchForm, value: string | boolean) => void;
}

// INTERFACE TO PROVIDER
export interface ContextProviderProps {
    children: ReactNode;
}

export interface ITimeDate {
    dateNow: string | null;
    dateHour: string | null;
    dateDate: string | null;
}

export interface IHandleChangeLatAndLon extends Pick<IHandleChangeSearch, 'setErrors' | 'setField'> {
    event: React.ChangeEvent<HTMLInputElement>;
    regExp: RegExp;
    field: keyof ISearchForm;
    isError: boolean;
    message: string;
}

export type WeatherMain = Pick<IWeatherData, 'temp' | 'temp_max' | 'temp_min' | 'deg' | 'speed' | 'humidity' | 'feels_like' | 'name'>;

// COORDINATES NUMBERS
export type Coordinates = Pick<IWeatherData, 'latitude' | 'longitude'>;

export type Errors = {
    [key in keyof ISearchForm]?: {
        isError: boolean;
        message: string;
    }
};

// ACTION PAYLOAD CITY USER
export type ActionApiCityUser =
    | { type: 'SET_CURRENT_WEATHER', payload: Omit<IWeatherData, 'date' | 'id'> }
    | { type: 'SET_COORDINATES', payload: Coordinates }
    | { type: 'SET_LOADING', payload: boolean };

export type ActionForecastWeather =
    | { type: 'SET_FORECAST_WEATHER', payload: IWeatherData[] }

// ACTION PAYLOAD CITY USER
export type ActionApiSearch =
    | { type: 'SET_FIELD', field: keyof ISearchForm; value: string | boolean }
    | { type: 'SET_ERROR', field: keyof ISearchForm; value: Errors[keyof ISearchForm] }
    | { type: 'SET_BUTTON_LOADING', field: keyof ISearchForm; value: boolean }

// TYPE CARDINAL
export type Cardinals = 'Northeast' | 'East' | 'Southeast' | 'South' | 'Southwest' | 'West' | 'Northwest' | 'North';

export type Languages = 'es-ES' | 'en-US' | 'fr-FR' | 'de-DE';

// ENUM CARDINALS
export enum CardinalsEnum {
    N = 'North',
    NE = 'Northeast',
    NOE = 'Northwest',
    S = 'South',
    SE = 'Southeast',
    SOE = 'Southwest',
    O = 'West',
    E = 'East'
}

export enum LanguageDay {
    es = 'es-ES',
    en = 'en-US',
    fr = 'fr-FR',
    de = 'de-DE',
}

export enum FieldsSearchForm {
    LOCATION = 'location',
    LATITUDE = 'latManual',
    LONGITUDE = 'longManual',
}

// ENUM DATE HOUR
export enum DateHour {
    NIGHT = '00:00:00',
    MORNING = '06:00:00',
    AFTERNOON = '12:00:00',
    EVENING = '18:00:00', 
    LIGHT_NIGHT = '21:00:00',
}

// ENUM CARDINALS
export enum ErrorsMessage {
    S_LAT_LONG = 'Only negative or positive numbers are allowed.',
    S_LOCATION = 'Only letters are allowed.',
}

// OBTENER UBIACION DEL USUARIO
export type GetLocationUser = Pick<IGetWeather, 'setCoordinates' | 'setLoading'>;

export type GetForecastWeather = Omit<IGetWeather, 'setCurrentWeather'>;

// INTERFACE GET WEATHER A REVISION
export type Query = Pick<ISearchForm, 'url'> & Pick<IGetWeather, 'setLoading' | 'setButtonLoading' | 'setIsVisible'>;

// INTERFACE CONTEXT SEARCH FORM

export type TypeContextSearch = ISearchForm & IHandleChangeSearch & Pick<IGetWeather, 'setButtonLoading'>;

// INTERFACE CONTEXT WEATHER
export type TypeContextCurrentWeather = Pick<IGetWeather, 'stateCurrentWeather' | 'setCoordinates' | 'setCurrentWeather' | 'setLoading'>;

// INTERFACE KELVIN TO CELSIUS
export type KelvinCelsius = Pick<IWeatherData, 'temp' | 'temp_max' | 'temp_min' | 'feels_like'>;

export type TypeContextForecastWeather = Pick<IGetWeather, 'stateForecastWeather' | 'setForecastWeather'>;

// RECORD KELVIN
export type KeyKelvin = Record<string, number>;


// TYPES TO CAROUSEL RESPONSIVE
export type MinMax= {
    max: number; 
    min: number 
}

export type WindowDevice = {
    breakpoint: MinMax;
    items: number;
    slidesToSlide: number;
}

export type ConfigItem = WindowDevice & {
    name: string;
};
export type Responsive =  Record<string, WindowDevice>;
  