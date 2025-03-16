import { useContext } from 'react';
import { Droplet, ThermometerHalf } from 'react-bootstrap-icons';
import { ContextWeather } from '../context/ContextCurrentWeather';
import { Col, Row, Stack } from 'react-bootstrap';
import { Loading } from './Loading';
import { IWeatherData } from '../types/types.d';

// COMPONENTE DATOS DE HUMEDAD Y SENSACIÓN TÉRMICA
export function DataHumFeels() {
  const context = useContext(ContextWeather);
  if (!context) return <Loading />;
  const { humidity, feels_like } = context.stateCurrentWeather.currentWeather;

  return (
    <Row className="align-items-center">
      <Col xs="auto">
        <Stack direction="horizontal" gap={3} className="text-secondary fs-5 fs-sm-6">
          <div>
            <Droplet className="text-primary me-1" /> 
            <strong>{humidity}%</strong> Humidity
          </div>
          <div>
            <ThermometerHalf className="text-danger me-1" /> 
            <strong>{feels_like.toFixed(1)}°C</strong> Thermal Sensing
          </div>
        </Stack>
      </Col>
    </Row>
  );
}

// COMPONENTE DATOS DE HUMEDAD Y SENSACIÓN TÉRMICA EXTENDIDO
export function DataHumFeelsExtend({ index, forecast }: { index: number; forecast: IWeatherData[] }) {
  return (
    <Row className="align-items-center">
      <Col xs="auto">
        <Stack direction="horizontal" gap={3} className="text-secondary fs-6">
          <div>
            <Droplet className="text-primary me-1" /> 
            <strong>{forecast[index]?.humidity}%</strong> Humidity
          </div>
          <div>
            <ThermometerHalf className="text-danger me-1" /> 
            <strong>{forecast[index]?.feels_like.toFixed(1)}°C</strong> Thermal Sensing
          </div>
        </Stack>
      </Col>
    </Row>
  );
}
