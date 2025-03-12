import { useContext } from 'react';
import { ContextForecast } from '../context/ContextWheatherExtend';
import { Col, Row, Stack } from 'react-bootstrap';
import { ArticleDataExtendHour } from './ArticleData';
import { calculateColumnsUI } from '../helpers/ui';
import { separatorDate } from '../helpers/separatorDate';
import formatDateToNameDay from '../helpers/formatDateToNameDay';
import { ExclamationTriangle } from 'react-bootstrap-icons'; // Importamos el icono de alerta

export function WeatherTimeHour() {
    const contextForecast = useContext(ContextForecast);
    if (!contextForecast) return null;

    const { state } = contextForecast;

    const filterToday = state.forecast.filter(item => {
        const today: string | null = separatorDate('T', 0, true); // Obtiene la fecha de cada ítem
        const itemDate: string | null = separatorDate(' ', 0, false, item.date);
        return today === itemDate;
    });

    return (
        filterToday.length > 0 ? (
            <>
                <h3 className="bg-primary text-light p-3 rounded shadow text-center mb-4">
                    Clima durante el Día
                </h3>
                <Row className="justify-content-center align-items-center mb-2">
                    {filterToday.map((_, index) => (
                        <Col
                            xs="auto"
                            lg={calculateColumnsUI(filterToday.length, index)}
                            xl={calculateColumnsUI(filterToday.length, index)}
                            xxl={calculateColumnsUI(filterToday.length, index)}
                            key={index}
                            className="g-3"
                        >
                            <ArticleDataExtendHour index={index} forecast={filterToday} />
                        </Col>
                    ))}
                </Row>
            </>
        ) : (
            <h2 className="text-secondary text-center fw-bold fs-4">
                <Stack direction="horizontal" gap={2} className="justify-content-center align-items-center">
                    <ExclamationTriangle size={24} className="text-warning" /> {/* Icono de alerta */}
                    <span>Sin pronóstico en este momento de horarios para el día{' '}</span>
                    <span className="text-danger">{formatDateToNameDay(state.forecast[0]?.dt)}</span> -{' '}
                    <span className="text-danger">
                        {separatorDate(' ', 0, false, state.forecast[0]?.date)?.split('-').reverse().join('-')}
                    </span>
                </Stack>
            </h2>
        )
    );
}
