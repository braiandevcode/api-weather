import { ChangeEvent, createContext, FormEvent } from 'react';
import { ContextProviderProps, TypeContextSearch } from '../types/types.d';
import { useReducerSearch } from '../reducer/useReducerSearch';
import { ERRORS_SEARCH_FORM } from '../constants';
import { handleChangeGenerally } from '../helpers/handleChangeGenerally';

// CONTEXTO
export const ContextSearch = createContext<TypeContextSearch | null>(null);

// COMPONENTE PROVIDER
export function ContextSearchProvider({ children }: ContextProviderProps) {
    const { state, setField, setErrors } = useReducerSearch();
    const REG_EXP_NUM: RegExp = /^-?\d*\.?\d*$/;
    const REG_EXP_CITY: RegExp = /^[a-zA-Z\s]+$/;

    // CHANGE LOCATION
    const handleChangeCity = (event: ChangeEvent<HTMLInputElement>) => {
        return handleChangeGenerally({
            event,
            regExp: REG_EXP_CITY,
            setErrors,
            setField,
            field: 'location',
            isError: true,
            message: ERRORS_SEARCH_FORM.location.message,
        });
    };

    // CHANGE LATITUDE
    const handleChangeLat = (event: ChangeEvent<HTMLInputElement>) =>{
        return handleChangeGenerally({ 
            event, 
            regExp: REG_EXP_NUM, 
            setErrors, 
            setField, 
            field: 'latManual', 
            isError: true, 
            message: ERRORS_SEARCH_FORM.latManual.message 
        });
    };
    
    // CHANGE LONGITUDE
    const handleChangeLon = (event: ChangeEvent<HTMLInputElement>) => {
        return handleChangeGenerally({ 
            event, 
            regExp: REG_EXP_NUM, 
            setErrors, 
            setField, 
            field: 'longManual', 
            isError: true, 
            message: ERRORS_SEARCH_FORM.longManual.message 
        });
    };

    // SUBMIT
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // SI HAY UNA UBICACIÓN
        if (state.location) {
            setField('searchQuery', state.location);
            setField('location', '');
        } else if (state.latManual && state.longManual) { // SI HAY UNA COORDENADA
            const latitude = parseFloat(state.latManual);
            const longitude = parseFloat(state.longManual);

            if (!isNaN(latitude) && !isNaN(longitude)) {
                setField('searchQueryLat', latitude.toString());
                setField('searchQueryLon', longitude.toString());
            }
            setField('latManual', '');
            setField('longManual', '');
        }

        // SI HAY UNA UBICACIÓN Y UNA COORDENADA
        if((state.latManual || state.longManual) &&  state.location){
            setField('searchQuery', '');
            setField('searchQueryLat', '');
            setField('searchQueryLon', '');
            setField('location', state.location);
            setField('longManual', state.longManual);
            setField('latManual', state.latManual);
        }
    };

    // RENDER PROVIDER CON VALOR DEL CONTEXTO
    return (
        <ContextSearch.Provider value={{
            ...state,
            handleSubmit,
            handleChangeCity,
            handleChangeLat,
            handleChangeLon,
            setErrors,
            setField,
            setButtonLoading:(value => setField('isButtonLoading', value)),
        }}>
            {children}
        </ContextSearch.Provider>
    );
}