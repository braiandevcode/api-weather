import { createContext } from 'react';
import { ContextProviderProps, IContextWeather } from '../types/types.d';
import { useReducerWeather } from '../reducer/useReducerWeather';

// CONTEXTO
export const ContextWeather = createContext<IContextWeather | null>(null);

// COMPONENTE PROVIDER
export function ContextWeatherProvider({ children }: ContextProviderProps) {
    // USE DEL HOOK USEREDUCER
    const {
        state,
        setCoordinates,
        setWeather,
        setLoading,
    } = useReducerWeather();

    // OBJETO TIPO "IContextWeather"
    const contextValue: IContextWeather = {
        state,
        setCoordinates,
        setLoading,
        setWeather,
    };

    //RETORNO DE PROVIDER
    return (
        <ContextWeather.Provider
            value={contextValue} 
        >
            {children}
        </ContextWeather.Provider>
    );
}