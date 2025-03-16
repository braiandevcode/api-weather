import { useContext } from 'react';
import { ContextForecast } from '../context/ContextForecastWheather';
import { separatorDate } from '../helpers/separatorDate';
import formatDateToNameDay from '../helpers/formatDateToNameDay';
import { ExclamationTriangle } from 'react-bootstrap-icons';
import { IWeatherData } from '../types/types.d';
import { Loading } from './Loading';
import { ArticleDataExtendHour } from './ArticleData';
import { Stack } from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';
import { CarrouselCards } from './CarrouselCards';

// COMPONENTE SECCION HORARIA
export function WeatherTimeHour() {
    const contextForecast = useContext(ContextForecast);
    if (!contextForecast) return <Loading />;

    const { stateForecastWeather } = contextForecast;
    const { forecast } = stateForecastWeather;

    if (!forecast) return <Loading />;
    const forecastData = forecast[0] as Pick<IWeatherData, 'date' | 'dt'>;

    if (!forecastData) return <Loading />;
    const { date, dt } = forecastData;

    const filterToday = stateForecastWeather.forecast.filter(item => {
        const today: string | null = separatorDate('T', 0, true);
        const itemDate: string | null = separatorDate(' ', 0, false, item.date);
        return today === itemDate;
    });


    return filterToday.length > 0 ? (
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
            <Stack direction="horizontal" gap={2} className="justify-content-center align-items-center">
                <ExclamationTriangle size={24} className="text-warning" />
                <span>No forecast at this time of the day</span>
                <span className="text-danger">{formatDateToNameDay(dt)}</span> -
                <span className="text-danger">
                    {separatorDate(' ', 0, false, date)?.split('-').reverse().join('-')}
                </span>
            </Stack>
        </h2>
    );
}
