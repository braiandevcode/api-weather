import { createContext } from 'react';
import { ContextWeatherProviderProps, IContextWeather } from '../types/types.d';
import { useReducerWeather } from '../reducer/useReducerWeather';

// CONTEXTO
export const ContextWeather = createContext<IContextWeather | null>(null);

// COMPONENTE PROVIDER
export function ContextWeatherProvider({ children }: ContextWeatherProviderProps) {
    // USE DEL HOOK USEREDUCER
    const {
        state,
        setCoordinates,
        setWeather,
        setLoading,
        setIsVisible
    } = useReducerWeather();

    // OBJETO TIPO "IContextWeather"
    const contextValue: IContextWeather = {
        state,
        setCoordinates,
        setLoading,
        setWeather,
        setIsVisible
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