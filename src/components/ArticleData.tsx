import { Col, Row } from 'react-bootstrap'; 
import { DataHumFeels } from './DataHumFeels';
import { DataImageName } from './DataImageName';
import { DataMinMax } from './DataMinMax';
import { DataWind } from './DataWind';
import { IWeatherData } from '../types/types.d';
import { ContentDataArticle } from './ContentDataArticle';
import { ContextWeather } from '../context/ContextCurrentWeather';
import { useContext } from 'react';
import formatDateToNameDay from '../helpers/formatDateToNameDay';
import { separatorDate } from '../helpers/separatorDate';
import { Loading } from './Loading';

// COMPONENTE DATOS DEL ARTÍCULO
export function ArticleData() {
  const context = useContext(ContextWeather);
  if (!context) return <Loading />;
  return (
    <Row className='justify-content-center'>
      <Col xs={12} sm="auto">
        <DataImageName />
        <DataMinMax />
        <DataWind />
        <DataHumFeels />
      </Col>
    </Row>
  );
}

// COMPONENTE DATOS DEL ARTÍCULO EXTENDIDO HORARIO
export function ArticleDataExtendHour({ index, forecast }: { index: number, forecast: IWeatherData[] }) {
  const hour: string | undefined = separatorDate(' ', 1, false, forecast[index].date)
    ?.split(':')
    .slice(0, 2)
    .join(':');
  if (!hour) return null;
  return (
    <>
      <ContentDataArticle index={index} forecast={forecast} time={`${hour}hs`} />
    </>
  );
}

// COMPONENTE DATOS DEL ARTÍCULO EXTENDIDO SEMANAL
export function ArticleDataExtendWeek({ index, forecast }: { index: number, forecast: IWeatherData[] }) {
  return (
    <>
      <ContentDataArticle index={index} forecast={forecast} time={formatDateToNameDay(forecast[index].dt)} />
    </>
  );
}
