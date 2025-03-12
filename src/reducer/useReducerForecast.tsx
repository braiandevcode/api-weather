import { useReducer } from 'react';
import { ActionForecastWeather, IForecastData, IStateForeCast } from '../types/types.d';

const initialState:IStateForeCast = {
    forecast: [] as IForecastData[],
};

const reducer = (state: IStateForeCast , action: ActionForecastWeather) => {
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

    const setForecastWeather = (payload: IForecastData[]) => {
        dispatch({ type: 'SET_FORECAST_WEATHER', payload });
    };

    return {
        state,
        setForecastWeather,
    };
}
