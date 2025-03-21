import { useContext } from 'react';
import { IconWeather, IconWeatherExtend } from './Icons';
import { ContextWeather } from '../context/ContextCurrentWeather';
import { Col, Row, Stack, Card } from 'react-bootstrap';
import { GeoAlt } from 'react-bootstrap-icons';
import { Loading } from './Loading';
import { IWeatherData } from '../types/types.d';

// COMPONENTE NOMBRE DE CIUDAD E IMAGEN DE CLIMA
export function DataImageName() {
  const context = useContext(ContextWeather);
  if (!context) return <Loading />;
  const { temp, name } = context.stateCurrentWeather.currentWeather;

  return (
    <Card.Text as={Row} className="justify-content-start">
      <Col xs="auto">
        <Stack className="align-items-center" direction="horizontal" gap={2}>
          <Stack direction="horizontal" className="align-items-center" gap={1}>
            <GeoAlt size={20} className="text-primary" />
            <h4 className="p-0 m-0 fw-bold fs-5 fs-md-4">{name ? name : 'Desconocida'}</h4>
          </Stack>
          <Stack direction="horizontal" className="align-items-center">
            <IconWeather />
            <span className="fw-bold fs-5 text-dark">{temp.toFixed(1)} °C</span>
          </Stack>
        </Stack>
      </Col>
    </Card.Text>
  );
}

// COMPONENTE NOMBRE DE CIUDAD E IMAGEN DE CLIMA EXTENDIDO
export function DataImageNameExtend({ index, forecast }: { index: number, forecast: IWeatherData[] }) {
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
