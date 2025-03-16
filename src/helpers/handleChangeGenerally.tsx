import { FieldsSearchForm, IHandleChangeLatAndLon } from '../types/types.d';

// CHANGE LATITUDE
export const handleChangeGenerally = ({ event, regExp, setErrors, setField, field, isError, message }: IHandleChangeLatAndLon) => {
    let value = event.target.value;
    if (!regExp.test(value) && value !== '') {
        setErrors(field, { isError, message });
    } else {
        // SI EL VALOR TIENE MÁS DE 2 CARACTERES Y NO CONTIENE UN PUNTO, INSERTAMOS EL PUNTO EN LA POSICIÓN CORRECTA
        if (field === FieldsSearchForm.LATITUDE || field === FieldsSearchForm.LONGITUDE) {
            if (value.length > 2 && !value.includes('.')) {
                value = value.includes('-')
                    ? `${value.slice(0, 3)}.${value.slice(3)}`
                    : `${value.slice(0, 2)}.${value.slice(2)}`;
            }
        }
        setErrors(field, { isError: false, message: '' });
    }

    setField(field, value);
};