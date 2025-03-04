import { useContext } from 'react';
import { ContextWeather } from '../context/ContextWeather';
import { IContextWeather } from '../types/types.d';
import { Col, Row, Stack } from 'react-bootstrap';
// DATOS DE HUMEDAD Y SENSACIÓN TÉRMICA
export function DataHumFeels() {
    const context = useContext(ContextWeather) as IContextWeather | null;
    if (!context) return null;
    const { humidity, feels_like } = context.state;
    return (
        <>
            <Row>
                <Col xs='auto'>
                    <Stack className='sectionCountry__image-name' direction='horizontal' gap={2}>
                        <span>Humedad <strong> {humidity}%</strong></span> -
                        <span>S.Térmica <strong>{feels_like.toFixed(1)} °C</strong></span>
                    </Stack>
                </Col>
            </Row>
        </>
    );
}