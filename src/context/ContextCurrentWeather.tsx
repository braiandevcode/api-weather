import { createContext } from 'react';
import { ContextProviderProps, ContextCurrentWeather } from '../types/types.d';
import { useReducerWeather } from '../reducer/useReducerWeather';

// CONTEXTO
export const ContextWeather = createContext<ContextCurrentWeather | null>(null);

// COMPONENTE PROVIDER
export function ContextWeatherProvider({ children }: ContextProviderProps) {
    // USE DEL HOOK USEREDUCER
    const {
        state,
        setCurrentWeather,
        setCoordinates,
        setLoading,
    } = useReducerWeather();

    // OBJETO TIPO "IContextWeather"
    const contextValue: ContextCurrentWeather = {
        stateCurrentWeather:state,
        setCurrentWeather, 
        setCoordinates,
        setLoading,
    };

    // RETORNO DE PROVIDER
    return (
        <ContextWeather.Provider value={contextValue}>
            {children}
        </ContextWeather.Provider>
    );
}
