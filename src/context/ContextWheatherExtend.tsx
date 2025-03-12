import { createContext } from 'react';
import { ContextProviderProps, IContextForecast } from '../types/types.d';
import { useReducerForecast } from '../reducer/useReducerForecast';

export const ContextForecast = createContext<IContextForecast | null>(null);

export function ContextForecastProvider({ children }: ContextProviderProps) {
    const { state , setForecastWeather } = useReducerForecast();

    const contextValue: IContextForecast = {
        state,
        setForecastWeather,
    };

    return (
        <ContextForecast.Provider value={contextValue}>
            {children}
        </ContextForecast.Provider>
    );
}
