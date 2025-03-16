import { useContext } from 'react';
import { ThermometerLow, ThermometerHigh } from 'react-bootstrap-icons';
import { ContextWeather } from '../context/ContextCurrentWeather';
import { Col, Row, Stack } from 'react-bootstrap';
import { Loading } from './Loading';
import { IWeatherData } from '../types/types.d';

// COMPONENTE DATOS DE TEMPERATURA MÍNIMA Y MÁXIMA
export function DataMinMax() {
  const context = useContext(ContextWeather);
  if (!context) return <Loading />;
  const { temp_min, temp_max } = context.stateCurrentWeather.currentWeather;

  return (
    <Row className="mb-3">
      <Col xs="auto">
        <Stack className="align-items-center" direction="horizontal" gap={2}>
          <ThermometerLow size={20} className="text-primary" />
          <span className="fw-bold fs-5">{temp_min.toFixed(1)} °C</span>
          <span>-</span>
          <ThermometerHigh size={20} className="text-danger" />
          <span className="fw-bold fs-5">{temp_max.toFixed(1)} °C</span>
        </Stack>
      </Col>
    </Row>
  );
}

// COMPONENTE DATOS DE TEMPERATURA MÍNIMA Y MÁXIMA EXTENDIDO
export function DataMinMaxExtend({ index, forecast }: { index: number, forecast: IWeatherData[] }) {
  return (
    <Row className="mb-3">
      <Col xs="auto">
        <Stack className="align-items-center" direction="horizontal" gap={2}>
          <ThermometerLow size={20} className="text-primary" />
          <span className="fw-bold fs-5">{forecast[index]?.temp_min.toFixed(1)} °C</span>
          <span>-</span>
          <ThermometerHigh size={20} className="text-danger" />
          <span className="fw-bold fs-5">{forecast[index]?.temp_max.toFixed(1)} °C</span>
        </Stack>
      </Col>
    </Row>
  );
}
