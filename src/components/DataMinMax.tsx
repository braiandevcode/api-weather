import { useContext } from 'react';
import { ThermometerLow, ThermometerHigh} from 'react-bootstrap-icons'; // Puedes usar estos íconos si ya los has instalado
import { ContextWeather } from '../context/ContextWeather';
import { IContextWeather, IForecastData } from '../types/types.d';
import { Col, Row, Stack } from 'react-bootstrap';

export function DataMinMax() {
    const context = useContext(ContextWeather) as IContextWeather | null;
    if (!context) return null;
    const { temp_min, temp_max } = context.state.currentWeather;

    return (
        <Row className='mb-3'>
            <Col xs="auto">
                <Stack className='align-items-center' direction='horizontal' gap={2}>
                    <ThermometerLow size={20}  className='text-primary'/>
                    <span className="fw-bold">{temp_min.toFixed(1)} °C</span>
                    <span>-</span>
                    <ThermometerHigh size={20} className='text-danger'/>
                    <span className="fw-bold">{temp_max.toFixed(1)} °C</span>
                </Stack>
            </Col>
        </Row>
    );
}

export function DataMinMaxExtend({ index, forecast }: { index: number, forecast: IForecastData[] }) {
    return (
        <Row className='mb-3'>
            <Col xs="auto">
                <Stack className='align-items-center' direction='horizontal' gap={2}>
                    <ThermometerLow size={20}  className='text-primary'/>
                    <span className="fw-bold">{forecast[index]?.temp_min.toFixed(1)} °C</span>
                    <span>-</span>
                    <ThermometerHigh size={20} className='text-danger' />
                    <span className="fw-bold">{forecast[index]?.temp_max.toFixed(1)} °C</span>
                </Stack>
            </Col>
        </Row>
    );
}
