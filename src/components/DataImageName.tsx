import { useContext } from 'react';
import { IconWeather, IconWeatherExtend } from './Icons';
import { ContextWeather } from '../context/ContextWeather';
import { IContextWeather, IForecastData } from '../types/types.d';
import { Col, Row, Stack, Card } from 'react-bootstrap';

export function DataImageName() {
    const context = useContext(ContextWeather) as IContextWeather | null;
    if (!context) return null;
    const { temp } = context.state.currentWeather;

    return (
        <Card.Text as={Row} className="justify-content-center">
            <Col xs="auto">
                <Stack className="align-items-center" direction="horizontal" gap={2}>
                    <IconWeather />
                    <span className="fw-bold fs-5 text-dark">{temp.toFixed(1)} °C</span>
                </Stack>
            </Col>
        </Card.Text>
    );
}

export function DataImageNameExtend({ index, forecast }: { index: number, forecast: IForecastData[] }) {
    return (
        <Card.Text as={Row} className="justify-content-center">
            <Col xs="auto">
                <Stack className="align-items-center" direction="horizontal" gap={2}>
                    <IconWeatherExtend index={index} forecast={forecast} />
                    <span className="fw-bold fs-5 text-dark">{forecast[index]?.temp.toFixed(1)} °C</span>
                </Stack>
            </Col>
        </Card.Text>
    );
}
