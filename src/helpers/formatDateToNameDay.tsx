import { LanguageDay } from '../types/types.d';

const formatDateToNameDay = (dt: number): string | null => {
    let eventoToLocalString:string | null = null;
    const date: Date = new Date(dt * 1000);
   // AQUI SE COMPRUEBA QUE LA FECHA NO SEA NULA
   if(date && dt){
    eventoToLocalString = date.toLocaleDateString(LanguageDay.en, { weekday: 'long' });
   }
    //AQUI SE IMPRIME EL DIA DE LA SEMANA
    if(eventoToLocalString){
        const firstLetter:string | null = eventoToLocalString.charAt(0).toLocaleUpperCase();
        const restLetters: string | null= eventoToLocalString.slice(1).toLowerCase();
        return `${firstLetter}${restLetters}`;
    }
    return null ;
};

export default formatDateToNameDay;