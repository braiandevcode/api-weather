export const separatorDate = (separator:string, index:number,  dateNow: boolean, date?:string,): string | null=> {
    if(dateNow){
        return date
        ?  new Date(date).toISOString().split(separator)[index] 
        :  new Date().toISOString().split(separator)[index] ;
    }
    if(!dateNow && date){
        return date.split(separator)[index] ;
    }

    return null;
};