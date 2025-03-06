import { ChangeEvent, createContext, FormEvent } from 'react';
import { ContextProviderProps, IContexSearch } from '../types/types.d';
import formatCoordinateCustom from '../helpers/formatCoordinates';
import { useReducerSearch } from '../reducer/useReducerSearch';

// CONTEXTO
export const ContextSearch = createContext<IContexSearch | null>(null);

// COMPONENTE PROVIDER
export function ContextSearchProvider({ children }: ContextProviderProps) {
    const { state, setField  } = useReducerSearch();
    const REG_EXP: RegExp = /^-?\d*\.?\d*$/;

    // CHANGE LOCATION
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setField('location', event.target.value);
    };

    // CHANGE LATITUDE
    const handleChangeLat = (event: ChangeEvent<HTMLInputElement>) => {
        if (REG_EXP.test(event.target.value)) {
            setField('latManual', event.target.value);
        } else {
            setField('isVisible', true);
        }
    };

    // CHANGE LONGITUDE
    const handleChangeLon = (event: ChangeEvent<HTMLInputElement>) => {
        if (REG_EXP.test(event.target.value)) {
            setField('longManual', event.target.value);
        } else {
            console.log('Entrada Inválida');
            setField('isVisible', true);
        }
    };

    // SUBMIT
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (state.location) {
            setField('searchQuery', state.location);
            setField('location', '');
        } else if (state.latManual && state.longManual) {
            const latitude = parseFloat(state.latManual);
            const longitude = parseFloat(state.longManual);

            if (!isNaN(latitude) && !isNaN(longitude)) {
                setField('searchQueryLat', formatCoordinateCustom(latitude));
                setField('searchQueryLon', formatCoordinateCustom(longitude));
                setField('latManual', '');
                setField('longManual', '');
            }
        }
    };

    return (
        <ContextSearch.Provider value={{ 
            ...state, 
            handleSubmit, 
            handleChange, 
            handleChangeLat, 
            handleChangeLon, 
            setField,
        }}>
            {children}
        </ContextSearch.Provider>
    );
}