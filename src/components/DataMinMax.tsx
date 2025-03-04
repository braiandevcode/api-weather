import { useContext } from 'react';
import { ContextWeather } from '../context/ContextWeather';
import { IContextWeather } from '../types/types.d';
import { Col, Row, Stack } from 'react-bootstrap';

export function DataMinMax() {
    const context = useContext(ContextWeather) as IContextWeather | null;
    if (!context) return null;
    const { temp_min, temp_max } = context.state;
    return (
        <>
            <Row className='mb-3'>
                <Col xs='auto'>
                    <Stack className='sectionCountry__image-name' direction='horizontal' gap={2}>
                        <span>Min <strong>{temp_min.toFixed(1)} °C</strong></span> -
                        <span>Max <strong>{temp_max.toFixed(1)} °C</strong></span>
                    </Stack>
                </Col>
            </Row>
        </>
    );
}