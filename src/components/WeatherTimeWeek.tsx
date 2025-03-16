import { useContext } from 'react';
import { ContextForecastWeather, DateHour, ITimeDate } from '../types/types.d';
import { ContextForecast } from '../context/ContextForecastWheather';
import { forecastTime } from '../helpers/forecastTime';
import { Loading } from './Loading';
import { ArticleDataExtendWeek } from './ArticleData';
import 'react-multi-carousel/lib/styles.css';
import { CarrouselCards } from './CarrouselCards';

// COMPONENTE SECCION SEMANAL
export function WeatherTimeWeek() {
  const contextForecast: ContextForecastWeather | null = useContext(ContextForecast);
  if (!contextForecast) return <Loading />;

  const { stateForecastWeather } = contextForecast;

  const filterTimeWeek = stateForecastWeather.forecast.filter(item => {
    const dateItem: ITimeDate | null = forecastTime({
      dateNow: item.date,
      dateHour: item.date,
      dateDate: item.date
    });
    if (!dateItem) return;
    const { dateNow, dateHour, dateDate } = dateItem;
    return dateHour === DateHour.LIGTH_NIGTH && dateNow !== dateDate;
  });

  return filterTimeWeek.length > 0 ? (
    <>
      <h3 className="bg-primary text-light p-3 rounded shadow mb-4 fs-5 fs-md-4">
        Weekly Forecast
      </h3>

      <CarrouselCards>
        {filterTimeWeek.map((_, index) => (
          <div key={index} className="px-2">
            <ArticleDataExtendWeek
              index={index}
              forecast={filterTimeWeek}
            />
          </div>
        ))}
      </CarrouselCards>
    </>
  ) : (
    <p className="text-center text-secondary fw-bold fs-5">
      No weekly forecast available.
    </p>
  );
}
