import { useContext } from 'react';
import { ContextForecast } from '../context/ContextForecastWheather';
import { separatorDate } from '../helpers/separatorDate';
import formatDateToNameDay from '../helpers/formatDateToNameDay';
import { ExclamationTriangle } from 'react-bootstrap-icons';
import { Loading } from './Loading';
import { ArticleDataExtendHour } from './ArticleData';
import { Stack } from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';
import { CarrouselCards } from './CarrouselCards';
import { ContextWeather } from '../context/ContextCurrentWeather';

// COMPONENTE SECCION HORARIA
export function WeatherTimeHour() {
    const contextForecast = useContext(ContextForecast);
    const contextWeather= useContext(ContextWeather);

    if (!contextForecast || !contextWeather) return <Loading />;

    const { stateCurrentWeather } = contextWeather;
    const { stateForecastWeather } = contextForecast;

    const { currentWeather } = stateCurrentWeather;
    
    const { dt } = currentWeather;

    const newDT = new Date(dt * 1000);

    const filterToday = stateForecastWeather.forecast.filter(item => {
        const today: string | null = separatorDate('T', 0, true);
        const itemDate: string | null = separatorDate(' ', 0, false, item.date);
        return today === itemDate;
    });

    return filterToday?.length > 0 ? (
        <>
            <h3 className="bg-primary text-light p-3 rounded shadow mb-4 fs-5 fs-md-4">
                Weather during the day
            </h3>
            <CarrouselCards>
                {filterToday.map((_, index) => (
                    <div key={index} className="px-2">
                        <ArticleDataExtendHour key={index} index={index} forecast={filterToday} />
                    </div>
                ))}
            </CarrouselCards>
        </>
    ) : (
        <h2 className="text-secondary text-center fw-bold fs-4">
            <Stack direction="horizontal" gap={2} className="fs-4 justify-content-center align-items-center">
                <ExclamationTriangle size={24} className="text-warning" />
                <span>There is no weather forecast by time at this time. </span>
                <span className="text-danger">{formatDateToNameDay(dt)}</span> -
                <span className="text-danger">{newDT?.toLocaleDateString()}</span>
            </Stack>
        </h2>
    );
}
