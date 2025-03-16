import { createContext } from 'react';
import { ContextProviderProps, ContextForecastWeather } from '../types/types.d';
import { useReducerForecast } from '../reducer/useReducerForecast';

export const ContextForecast = createContext<ContextForecastWeather | null>(null);

export function ContextForecastProvider({ children }: ContextProviderProps) {
    const { state , setForecastWeather } = useReducerForecast();

    const contextValue: ContextForecastWeather= {
        stateForecastWeather:state,
        setForecastWeather,
    };

    return (
        <ContextForecast.Provider value={contextValue}>
            {children}
        </ContextForecast.Provider>
    );
}
