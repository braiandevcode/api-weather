import { Card, Stack } from 'react-bootstrap';
import { DataImageNameExtend } from './DataImageName';
import { DataMinMaxExtend } from './DataMinMax';
import { DataWindExtend } from './DataWind';
import { DataHumFeelsExtend } from './DataHumFeels';
import { IWeatherData } from '../types/types.d';

// COMPONENTE CONTENIDO DE ARTÍCULO
export function ContentDataArticle({ index, forecast, time }: { index: number, forecast: IWeatherData[], time: string | null }) {
    return (
        <Stack direction="vertical" gap={3}>
            <Card className="bg-light text-body rounded-3 shadow-lg"> 
                <Card.Header className="text-center fs-4 fw-bold">{time}</Card.Header> 
                <Card.Body>
                    <Stack direction='vertical' gap={2} className='align-items-center'>
                        <DataImageNameExtend index={index} forecast={forecast} />
                        <DataMinMaxExtend index={index} forecast={forecast} />
                        <DataWindExtend index={index} forecast={forecast} />
                        <DataHumFeelsExtend index={index} forecast={forecast} />
                    </Stack>
                </Card.Body>
            </Card>
        </Stack>
    );
}