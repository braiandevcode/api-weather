import { useReducer } from 'react';
import { ActionApiCityUser, IWeatherData, IState, Coordinates } from '../types/types.d';
// ESTADO INICIAL
const initialState:Pick<IState, 'currentWeather'> = {
    currentWeather: {
        dt:0,
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        humidity: 0,
        feels_like: 0,
        name: null,
        deg: 0,
        gust: 0,
        speed: 0,
        latitude: 0,
        longitude: 0,
        isLoading: true,
        icon: '',
        description: '',
    },
};

// FUNCION REDUCER
const reducer = (state:Pick<IState, 'currentWeather'>, action: ActionApiCityUser) => {
    const { type } = action;

    if (type === 'SET_CURRENT_WEATHER') {
        return {
            ...state,
            currentWeather: {
                ...state.currentWeather,
                ...action.payload,
            },
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
            currentWeather: {
                ...state.currentWeather,
                isLoading:action.payload,
            },
        };
    }

    return state;
};

// CUSTOM HOOK USE-REDUCER
export function useReducerWeather() {
    const [state, dispatch] = useReducer(reducer, initialState);

    // SET CURRENT WEATHER (Clima actual)
    const setCurrentWeather = (payload: Omit<IWeatherData, 'date' | 'id'>) => {
        dispatch({ type: 'SET_CURRENT_WEATHER', payload });
    };

    // SET COORDINATES
    const setCoordinates = (payload: Coordinates) => {
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
