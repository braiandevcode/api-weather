import { Col, Row } from 'react-bootstrap';
import { DataHumFeels } from './DataHumFeels';
import { DataImageName } from './DataImageName';
import { DataMinMax } from './DataMinMax';
import { DataWind } from './DataWind';
import { IContextWeather, IForecastData } from '../types/types.d';
import { ContentDataArticle } from './ContentDataArticle';
import { ContextWeather } from '../context/ContextWeather';
import { useContext } from 'react';
import formatDateToNameDay from '../helpers/formatDateToNameDay';
import { separatorDate } from '../helpers/separatorDate';

// ARTICULOS CON LOS DATOS DEL CLIMA DEL USUARIO
export function ArticleData() {
    const context = useContext(ContextWeather) as IContextWeather | null;
    if (!context) return null;
    return (
        <>
            <Row className='justify-justify-content-start'>
                <Col xs='auto'>
                    <DataImageName />
                    <DataMinMax />
                    <DataWind />
                    <DataHumFeels />
                </Col>
            </Row>
        </>
    );
}

// ARTICULOS ETENDIDO CON LOS DATOS DEL CLIMA 
export function ArticleDataExtendHour({ index, forecast }: { index: number, forecast: IForecastData[] }) {
    const hour:string | undefined = separatorDate(' ', 1, false, forecast[index].date)?.split(':').slice(0,2).join(':');
    if(hour === undefined || hour === null) return;
    return (
        <>
            <ContentDataArticle index={index} forecast={forecast} time={`${hour}hs`} />
        </>
    );
}


// ARTICULOS CON LOS DATOS DEL CLIMA
export function ArticleDataExtendWeek({ index, forecast }: { index: number, forecast: IForecastData[] }) {
    return (
        <>
            <ContentDataArticle index={index} forecast={forecast} time={formatDateToNameDay(forecast[index].dt)} />
        </>
    );
}