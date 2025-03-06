import { useReducer } from 'react';
import { ActionApiSearch, ISearchForm } from '../types/types.d';

const initialState: ISearchForm = {
    location: '',
    longManual: '',
    latManual: '',
    searchQuery: '',
    searchQueryLat: '',
    searchQueryLon: '',
    isVisible: false,
};

const reducer = (state: ISearchForm, action: ActionApiSearch) => {
    const { type, value, field } = action;
    switch (type) {
        case 'SET_FIELD': 
            return {
                ...state,
                [field]: value,
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

    return { state, setField };
}
