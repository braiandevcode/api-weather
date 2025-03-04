import { useContext } from 'react';
import cardinalPoints from '../helpers/cardinalPoints';
import { ContextWeather } from '../context/ContextWeather';
import { IContextWeather } from '../types/types.d';
import { Col, Row, Stack } from 'react-bootstrap';

export function DataWind() {
    const context = useContext(ContextWeather) as IContextWeather | null;
    if (!context) return null;
    const { deg, gust, speed } = context.state;
    const DEG = cardinalPoints(deg);

    const existeDataWind = ({ data }: { data: number | string }) => {
        return (
            <>
                {!data ? <strong>Sin datos</strong> : <strong>{isNaN(Number(data)) ? data : Math.round(Number(data))}</strong>}
            </>
        );
    };

    return (
        <>
            <Row className='mb-2'>
                <Col xs='auto'>
                    <Stack className='sectionCountry__image-name' direction='horizontal' gap={2}>
                        <span>Viento del sector {existeDataWind({ data: DEG })}</span> -
                        <span>Ráfaga {existeDataWind({ data: gust })} Km/h</span> -
                        <span>Velocidad {existeDataWind({ data: speed })} Km/h</span>
                    </Stack>
                </Col>
            </Row>
        </>
    );
}