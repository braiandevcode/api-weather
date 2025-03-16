import { useContext } from 'react';
import cardinalPoints from '../helpers/cardinalPoints';
import { ContextWeather } from '../context/ContextCurrentWeather';
import { Col, Row, Stack } from 'react-bootstrap';
import { ArrowRepeat, Wind, Speedometer } from 'react-bootstrap-icons';
import { Loading } from './Loading';
import { IWeatherData } from '../types/types.d';

// COMPONENTE DATOS DE VIENTO
export function DataWind() {
  const context = useContext(ContextWeather);
  if (!context) return <Loading />;
  const { deg, gust, speed } = context.stateCurrentWeather.currentWeather;
  const DEG = cardinalPoints(deg);

  const existeDataWind = ({ data }: { data: number | string }) => (
    <>
      {!data ? <strong>No data</strong> : <strong>{isNaN(Number(data)) ? data : Math.round(Number(data))}</strong>}
    </>
  );

  return (
    <Row className="mb-3">
      <Col xs="auto">
        <Stack direction="horizontal" gap={2} className="align-items-center">
          <ArrowRepeat size={20} className="text-primary" />
          <span>{existeDataWind({ data: DEG })}</span> - 
          <Wind size={20} className="text-warning" />
          <span>{existeDataWind({ data: gust })} Km/h</span> - 
          <Speedometer size={20} className="text-success" />
          <span>{existeDataWind({ data: speed })} Km/h</span>
        </Stack>
      </Col>
    </Row>
  );
}

// COMPONENTE DATOS DE VIENTO EXTENDIDO
export function DataWindExtend({ index, forecast }: { index: number, forecast: IWeatherData[] }) {
  const DEG = cardinalPoints(forecast[index]?.deg);

  const existeDataWind = ({ data }: { data: number | string }) => (
    <>
      {!data ? <strong>No data</strong> : <strong>{isNaN(Number(data)) ? data : Math.round(Number(data))}</strong>}
    </>
  );

  return (
    <Row className="mb-3">
      <Col xs="auto">
        <Stack direction="horizontal" gap={2} className="align-items-center">
          <ArrowRepeat size={20} className="text-primary" />
          <span>{existeDataWind({ data: DEG })}</span> - 
          <Wind size={20} className="text-warning" />
          <span>{existeDataWind({ data: forecast[index]?.gust })} Km/h</span> - 
          <Speedometer size={20} className="text-success" />
          <span>{existeDataWind({ data: forecast[index]?.speed })} Km/h</span>
        </Stack>
      </Col>
    </Row>
  );
}
