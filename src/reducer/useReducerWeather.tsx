import { useReducer } from 'react';
import { ActionApiCityUser, ICoordinates, IWeatherData, IState } from '../types/types.d';

// ESTADO INICIAL
const initialState:IState = {
    currentWeather: {
        dt:0,
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        humidity: 0,
        feels_like: 0,
        name: '',
        deg: 0,
        gust: 0,
        speed: 0,
        latitude: 0,
        longitude: 0,
        isLoading: true,
        icon: '',
        id: 0,
        description: '',
    },
    isLoading: true,
};

// FUNCION REDUCER
const reducer = (state:IState, action: ActionApiCityUser) => {
    const { type } = action;

    if (type === 'SET_CURRENT_WEATHER') {
        return {
            ...state,
            currentWeather: {
                ...state.currentWeather,
                ...action.payload,
            },
            isLoading: false,
        };
    }

    if (type === 'SET_COORDINATES') {
        return {
            ...state,
            currentWeather: {
                ...state.currentWeather,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
            },
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

// CUSTOM HOOK USE-REDUCER
export function useReducerWeather() {
    const [state, dispatch] = useReducer(reducer, initialState);

    // SET CURRENT WEATHER (Clima actual)
    const setCurrentWeather = (payload: IWeatherData) => {
        dispatch({ type: 'SET_CURRENT_WEATHER', payload });
    };

    // SET COORDINATES
    const setCoordinates = (payload: ICoordinates) => {
        dispatch({ type: 'SET_COORDINATES', payload });
    };

    // SET LOADING
    const setLoading = (payload: boolean) => {
        dispatch({ type: 'SET_LOADING', payload });
    };

    return {
        state,
        setCurrentWeather,
        setCoordinates,
        setLoading,
    };
}
