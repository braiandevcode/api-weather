const formatDateToNameDay = (dt: number): string => {
    const date: Date = new Date(dt * 1000);
    const eventoToLocalString:string = date.toLocaleDateString(navigator.language, { weekday: 'long' });
    const firstLetter = eventoToLocalString.charAt(0).toLocaleUpperCase();
    const restLetters = eventoToLocalString.slice(1).toLowerCase();
    return `${firstLetter}${restLetters}`;
};

export default formatDateToNameDay;