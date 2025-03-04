import { useContext } from 'react';
import { IconWeather } from './Icons';
import { ContextWeather } from '../context/ContextWeather';
import { IContextWeather } from '../types/types.d';
import { Col, Row, Stack } from 'react-bootstrap';

export function DataImageName() {
    const context = useContext(ContextWeather) as IContextWeather | null;
    if (!context) return null;
    const { temp } = context.state;

    return (
        <>
            <Row>
                <Col xs='auto'>
                    <Stack className='align-items-center' direction='horizontal' gap={1}>
                        <IconWeather />
                        <h3><strong>{temp.toFixed(1)} °C</strong></h3>
                    </Stack>
                </Col>
            </Row>
        </>
    );
}