import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { IContextWeather } from '../types/types.d';
import { ContextWeather } from '../context/ContextWeather';
import formatCoordinateCustom from '../helpers/formatCoordinates';
import changeFilterLocation from '../services/changeFilterLocation';
import changeLocationLatAndLon from '../services/changeLocationLatAndLon';

export function useSearch() {
    const REG_EXP: RegExp = /^-?\d*\.?\d*$/;
    // OBTENER VALOR DEL CONTEXTO
    const context: IContextWeather | null = useContext(ContextWeather);

    // SI NO HAY CONTEXTO
    if (!context) {
        return null;
    }
    
    const { setLoading, setWeather, setIsVisible } = context; //DESTRUCTURING
 
    // ESTADOS
    const [location, setLocation] = useState('');
    const [latManual, setLatManual] = useState('');
    const [longManual, setLongManual] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryLat, setSearchQueryLat] = useState('');
    const [searchQueryLon, setSearchQueryLon] = useState('');

    // CHANGE LONGITUDE CITY
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
    };

        // CHANGE LATITUDE
    const handleChangeLat = (event: ChangeEvent<HTMLInputElement>) => {
        // Validar si la entrada es un número entero o signo negativo seguido de números
        if (REG_EXP.test(event.target.value)) {
            setLatManual(event.target.value);
        } else {
            console.log('Entrada Invalida');
            setIsVisible(true);
        }
    };

    // CHANGE LONGITUDE
    const handleChangeLon = (event: ChangeEvent<HTMLInputElement>) => {
        // Validar si la entrada es un número entero o signo negativo seguido de números
        if (REG_EXP.test(event.target.value)) {
            setLongManual(event.target.value);
        } else {
            console.log('Entrada Invalida');
            setIsVisible(true);
        }
    };

    // SUBMIT
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (location) {
            setSearchQuery(location);
            setLocation('');
        } else if (latManual && longManual) {
            const latitude = parseFloat(latManual);
            const longitude = parseFloat(longManual);

            if (!isNaN(latitude) && !isNaN(longitude)) {
                setSearchQueryLat(formatCoordinateCustom(latitude));
                setSearchQueryLon(formatCoordinateCustom(longitude));
                setLatManual('');
                setLongManual('');
            }
        }
    };

    useEffect(() => {
        if (searchQuery) {
            changeFilterLocation({ name: searchQuery, setWeather, setLoading, setIsVisible });
        }
    }, [searchQuery]);

    useEffect(() => {
        if (searchQueryLat && searchQueryLon) {
            changeLocationLatAndLon({
                latitude: parseFloat(searchQueryLat),
                longitude: parseFloat(searchQueryLon),
                setWeather,
                setLoading,
                setIsVisible
            });
        }
    }, [searchQueryLat, searchQueryLon]);

    return {
        handleSubmit,
        handleChange,
        handleChangeLat,
        handleChangeLon,
        location,
        searchQuery,
        searchQueryLat,
        searchQueryLon,
        latManual,
        longManual
    };
}
