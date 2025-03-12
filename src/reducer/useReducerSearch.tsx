import { useReducer } from 'react';
import { ActionApiSearch, Errors, ISearchForm } from '../types/types.d';

const initialState: ISearchForm = {
    location: '',
    longManual: '',
    latManual: '',
    searchQuery: '',
    searchQueryLat: '',
    searchQueryLon: '',
    isVisible: false,
    isButtonLoading:false,
    errors: {}
};

const reducer = (state: ISearchForm, action: ActionApiSearch) => {
    const { type, value, field } = action; 
    switch (type) {
        case 'SET_FIELD': 
            return {
                ...state,
                [field]: value,
            };
        case 'SET_ERROR':
            return{
                ...state,
                errors: {
                    ...state.errors, // ESTADO DE ERRORES PREVIOS
                    [field]: value,  // MODIFICAR SOLO EL ERROR DEL CAMPO ESPECIFICO
                }
            };
        case 'SET_BUTTON_LOADING':
            return { 
                ...state, 
                [field]: value 
            };
        default:
            return state;
    }
};

export function useReducerSearch() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setField = (field: keyof ISearchForm, value: string | boolean) => {
        dispatch({ type: 'SET_FIELD', field, value });
    };

    const setErrors = (field: keyof Errors, value: Errors[keyof ISearchForm]) =>{
        dispatch({ type:'SET_ERROR', field, value });
    };

    const setButtonLoading = (field: keyof ISearchForm, value: boolean) => {
        dispatch({ type: 'SET_BUTTON_LOADING', field, value });
    };

    return { state, setField, setErrors, setButtonLoading};
}
