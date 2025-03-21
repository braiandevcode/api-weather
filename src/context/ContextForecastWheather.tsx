import { createContext } from 'react';
import { ContextProviderProps, TypeContextForecastWeather } from '../types/types.d';
import { useReducerForecast } from '../reducer/useReducerForecast';

export const ContextForecast = createContext<TypeContextForecastWeather | null>(null);

export function ContextForecastProvider({ children }: ContextProviderProps) {
    const { state , setForecastWeather } = useReducerForecast();

    const contextValue: TypeContextForecastWeather= {
        stateForecastWeather:state,
        setForecastWeather,
    };

    return (
        <ContextForecast.Provider value={contextValue}>
            {children}
        </ContextForecast.Provider>
    );
}
