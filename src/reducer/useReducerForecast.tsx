import { useReducer } from 'react';
import { ActionForecastWeather, IState, IWeatherData } from '../types/types.d';

const initialState: Pick<IState, 'forecast'> = {
    forecast: [],
};

const reducer = (state: Pick<IState, 'forecast'> , action: ActionForecastWeather) => {
    if (action.type === 'SET_FORECAST_WEATHER') {
        return {
            ...state,
            forecast: action.payload,
        };
    }
    return state;
};

export function useReducerForecast() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setForecastWeather = (payload: IWeatherData[]) => {
        dispatch({ type: 'SET_FORECAST_WEATHER', payload });
    };

    return {
        state,
        setForecastWeather,
    };
}
