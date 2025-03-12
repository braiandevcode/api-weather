import { useContext } from 'react';
import { ContextWeather } from '../context/ContextWeather';
import { IContextWeather, IForecastData } from '../types/types.d';
import { Col, Row, Stack } from 'react-bootstrap';
import { Droplet, ThermometerHalf } from 'react-bootstrap-icons'; // Íconos de Bootstrap

// DATOS DE HUMEDAD Y SENSACIÓN TÉRMICA
export function DataHumFeels() {
    const context = useContext(ContextWeather) as IContextWeather | null;
    if (!context) return null;
    const { humidity, feels_like } = context.state.currentWeather;

    return (
        <Row className="align-items-center">
            <Col xs="auto">
                <Stack direction="horizontal" gap={3} className="text-secondary fs-5">
                    <div>
                        <Droplet className="text-primary me-1" /> 
                        <strong>{humidity}%</strong> Humedad
                    </div>
                    <div>
                        <ThermometerHalf className="text-danger me-1" /> 
                        <strong>{feels_like.toFixed(1)}°C</strong> S.Térmica
                    </div>
                </Stack>
            </Col>
        </Row>
    );
}

// DATOS EXTENDIDOS DE HUMEDAD Y SENSACIÓN TÉRMICA
export function DataHumFeelsExtend({ index, forecast }: { index: number; forecast: IForecastData[] }) {
    return (
        <Row className="align-items-center">
            <Col xs="auto">
                <Stack direction="horizontal" gap={3} className="text-secondary fs-6">
                    <div>
                        <Droplet className="text-primary me-1" /> 
                        <strong>{forecast[index]?.humidity}%</strong> Humedad
                    </div>
                    <div>
                        <ThermometerHalf className="text-danger me-1" /> 
                        <strong>{forecast[index]?.feels_like.toFixed(1)}°C</strong> S.Térmica
                    </div>
                </Stack>
            </Col>
        </Row>
    );
}
