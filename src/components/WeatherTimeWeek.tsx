import { Col, Row } from 'react-bootstrap';
import { IContextForecast, TimeDate } from '../types/types.d';
import { useContext } from 'react';
import { ContextForecast } from '../context/ContextWheatherExtend';
import { ArticleDataExtendWeek } from './ArticleData';
import { forecastTime, ITimeDate } from '../helpers/forecastTime';
import { calculateColumnsUI } from '../helpers/ui';

export function WeatherTimeWeek() {
    const contextForecast: IContextForecast | null = useContext(ContextForecast);
    if (!contextForecast) return null;

    const { state } = contextForecast;

    const filterTimeWeek = state.forecast.filter(item => {
        const dateItem: ITimeDate | null = forecastTime({ dateNow: item.date, dateHour: item.date, dateDate: item.date });
        if (!dateItem) return;
        const { dateNow, dateHour, dateDate } = dateItem;
        return dateHour === TimeDate.LIGTH_NIGTH && dateNow !== dateDate;
    });

    return (
        <>
            <h3 className='bg-dark text-light p-2'>Pronóstico Semanal</h3>
            <Row className="justify-content-center align-items-center mb-2 g-3">
                {filterTimeWeek.map((_, index) => (
                    <Col
                        xs="12"
                        lg={calculateColumnsUI(filterTimeWeek.length, index)}
                        xl={calculateColumnsUI(filterTimeWeek.length, index)}
                        xxl={calculateColumnsUI(filterTimeWeek.length, index)}
                        key={index}
                    >
                        <ArticleDataExtendWeek index={index} forecast={filterTimeWeek} />
                    </Col>
                ))}
            </Row>

        </>
    );
}


