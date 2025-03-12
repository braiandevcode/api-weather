import { useContext } from 'react';
import cardinalPoints from '../helpers/cardinalPoints';
import { ContextWeather } from '../context/ContextWeather';
import { IContextWeather, IForecastData } from '../types/types.d';
import { Col, Row, Stack } from 'react-bootstrap';
import { ArrowRepeat, Wind, Speedometer } from 'react-bootstrap-icons'; // Iconos de viento, ráfaga y velocidad

export function DataWind() {
    const context = useContext(ContextWeather) as IContextWeather | null;
    if (!context) return null;
    const { deg, gust, speed } = context.state.currentWeather;
    const DEG = cardinalPoints(deg);

    const existeDataWind = ({ data }: { data: number | string }) => {
        return (
            <>
                {!data ? <strong>Sin datos</strong> : <strong>{isNaN(Number(data)) ? data : Math.round(Number(data))}</strong>}
            </>
        );
    };

    return (
        <>
            <Row className='mb-3'>
                <Col xs='auto'>
                    <Stack className='sectionCountry__image-name' direction='horizontal' gap={2}>
                        <ArrowRepeat size={20} className="text-primary" />
                        <span>{existeDataWind({ data: DEG })}</span> - 
                        <Wind size={20} className="text-warning" />
                        <span>{existeDataWind({ data: gust })} Km/h</span> - 
                        <Speedometer size={20} className="text-success" />
                        <span>{existeDataWind({ data: speed })} Km/h</span>
                    </Stack>
                </Col>
            </Row>
        </>
    );
}

export function DataWindExtend({ index, forecast }: { index: number, forecast: IForecastData[] }) {
    const DEG = cardinalPoints(forecast[index]?.deg);

    const existeDataWind = ({ data }: { data: number | string }) => {
        return (
            <>
                {!data ? <strong>Sin datos</strong> : <strong>{isNaN(Number(data)) ? data : Math.round(Number(data))}</strong>}
            </>
        );
    };

    return (
        <>
            <Row className='mb-3'>
                <Col xs='auto'>
                    <Stack className='sectionCountry__image-name' direction='horizontal' gap={2}>
                        <ArrowRepeat size={20} className="text-primary" />
                        <span>{existeDataWind({ data: DEG })}</span> - 
                        <Wind size={20} className="text-warning" />
                        <span>{existeDataWind({ data: forecast[index]?.gust })} Km/h</span> - 
                        <Speedometer size={20} className="text-success" />
                        <span>{existeDataWind({ data: forecast[index]?.speed })} Km/h</span>
                    </Stack>
                </Col>
            </Row>
        </>
    );
}
