import { useReducer } from 'react';
import { ActionApiCityUser, ICoordinates, IWeatherData} from '../types/types.d';

// ESTADOS INICIALES
const initialState: IWeatherData= {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    humidity: 0,
    feels_like: 0,
    name: '',
    deg: 0,
    gust: 0,
    speed: 0,
    latitude:0,
    longitude:0,
    isLoading: true,
    icon:'',
    id:0,
    description:'',
};

// FUNCION REDUCER
const reducer = (state: IWeatherData, action: ActionApiCityUser) => {
    const { type } = action;
    // EVALUAR SEGUN TIPO
    if (type === 'SET_WEATHER') {
        return {
            ...state,
            temp: action.payload.temp,
            temp_max: action.payload.temp_max,
            temp_min: action.payload.temp_min,
            humidity: action.payload.humidity,
            feels_like: action.payload.feels_like,
            name: action.payload.name,
            deg: action.payload.deg,
            gust: action.payload.gust,
            speed: action.payload.speed,
            icon: action.payload.icon,
            id: action.payload.id,
            description: action.payload.description,
        };
    }

    if (type === 'SET_COORDINATES') {
        return {
            ...state,
            ...action.payload,
        };
    }

    if (type === 'SET_LOADING') {
        return {
            ...state,
            isLoading: action.payload,
        };
    }

    return state;
};

// CUSTOM HOOK USEREDCUER
export function useReducerWeather() {
    const [state, dispatch ] = useReducer(reducer, initialState);

    const setWeather = (payload: IWeatherData) => {
        dispatch({ type: 'SET_WEATHER', payload });
    };

    const setCoordinates = (payload: ICoordinates) => {
        dispatch({ type: 'SET_COORDINATES', payload });
    };

    const setLoading = (payload: boolean) => {
        dispatch({ type: 'SET_LOADING', payload });
    };

    return {
        state,
        setWeather, 
        setCoordinates, 
        setLoading ,
    };
} 