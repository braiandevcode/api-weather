import { ChangeEvent, createContext, FormEvent } from 'react';
import { ContextProviderProps, IContexSearch } from '../types/types.d';
import formatCoordinateCustom from '../helpers/formatCoordinates';
import { useReducerSearch } from '../reducer/useReducerSearch';
import { ERRORS_SEARCH_FORM } from '../constants';

// CONTEXTO
export const ContextSearch = createContext<IContexSearch | null>(null);

// COMPONENTE PROVIDER
export function ContextSearchProvider({ children }: ContextProviderProps) {
    const { state, setField, setErrors, setButtonLoading } = useReducerSearch();
    const REG_EXP_NUM: RegExp = /^-?\d*\.?\d*$/;
    const REG_EXP_CITY: RegExp = /^[a-zA-Z\s]+$/;

    // CHANGE LOCATION
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!REG_EXP_CITY.test(value) && value !== '') {
            setErrors('location', { isError: true, message: ERRORS_SEARCH_FORM.location.message });
        } else {
            setErrors('location', { isError: false, message: '' });
        }
        setField('location', value);
    };

    // CHANGE LATITUDE
    const handleChangeLat = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (!REG_EXP_NUM.test(value)) {
            setErrors('latManual', { isError: true, message: ERRORS_SEARCH_FORM.latManual.message });
        } else {
            // SI EL VALOR TIENE MÁS DE 2 CARACTERES Y NO CONTIENE UN PUNTO, INSERTAMOS EL PUNTO EN LA POSICIÓN CORRECTA
            if (value.length > 2 && !value.includes('.')) {
                value = value.includes('-') ? `${value.slice(0, 3)}.${value.slice(3)}` : `${value.slice(0, 2)}.${value.slice(2)}`;  // INSERTAR PUNTO LUEGO DE LOS PRIMEROS 2 DIGITOS
            }
            setErrors('latManual', { isError: false, message: '' });
        }
        setField('latManual', value);
    };

    // CHANGE LONGITUDE
    const handleChangeLon = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (!REG_EXP_NUM.test(value)) {
            setErrors('longManual', { isError: true, message: ERRORS_SEARCH_FORM.longManual.message });
        } else {
            // SI EL VALOR TIENE MÁS DE 2 CARACTERES Y NO CONTIENE UN PUNTO, INSERTAMOS EL PUNTO EN LA POSICIÓN CORRECTA
            if (value.length > 2 && !value.includes('.')) {
                value = value.includes('-') ? `${value.slice(0, 3)}.${value.slice(3)}` : `${value.slice(0, 2)}.${value.slice(2)}`;  // INSERTAR PUNTO LUEGO DE LOS PRIMEROS 2 DIGITOS
            }
            setErrors('longManual', { isError: false, message: '' });
        }
        setField('longManual', value);
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
            }
            setField('latManual', '');
            setField('longManual', '');
        }


        if((state.latManual || state.longManual) &&  state.location){
            setField('searchQuery', '');
            setField('searchQueryLat', '');
            setField('searchQueryLon', '');
            setField('location', state.location);
            setField('longManual', state.longManual);
            setField('latManual', state.latManual);
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
            setButtonLoading
        }}>
            {children}
        </ContextSearch.Provider>
    );
}