import { ITimeDate } from '../types/types.d';
import { separatorDate } from './separatorDate';

export const forecastTime = ({ dateNow, dateHour, dateDate }: ITimeDate): ITimeDate | null => {
    if (dateNow && dateHour && dateDate) {
        const newDateNow: string | null = separatorDate('T', 0, true, dateNow);
        const newDateHour: string | null = separatorDate(' ', 1, false, dateHour);
        const newDateDate: string | null = separatorDate(' ', 0, false, dateDate);
        return {
            dateNow: newDateNow,
            dateHour: newDateHour,
            dateDate: newDateDate
        };
    }
    return null;
};
