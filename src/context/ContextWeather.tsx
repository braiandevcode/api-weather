import { createContext } from 'react';
import { ContextWeatherProviderProps, IContextWeather } from '../types/types.d';
import { useReducerWeather } from '../reducer/useReducerWeather';

// CONTEXTO
export const ContextWeather = createContext<IContextWeather | undefined>(undefined);

// COMPONENTE PROVIDER
export function ContextWeatherProvider({ children }: ContextWeatherProviderProps) {
    // USE DEL HOOK USEREDUCER
    const {
        state,
        setCoordinates,
        setWeather,
        setLoading
    } = useReducerWeather();

    // OBJETO TIPO "IContextWeather"
    const contextValue: IContextWeather = {
        state,
        setCoordinates,
        setLoading,
        setWeather
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