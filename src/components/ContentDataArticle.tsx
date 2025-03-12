import { Card, Stack } from 'react-bootstrap';
import { DataImageNameExtend } from './DataImageName';
import { DataMinMaxExtend } from './DataMinMax';
import { DataWindExtend } from './DataWind';
import { DataHumFeelsExtend } from './DataHumFeels';
import { IForecastData } from '../types/types.d';

export function ContentDataArticle({ index, forecast, time }: { index: number, forecast: IForecastData[], time: string }) {
    return (
        <Stack direction="vertical" gap={3}>
            <Card className="bg-light text-body rounded-3 shadow-lg"> 
                <Card.Header className="text-center fs-4 fw-bold">{time}</Card.Header> 
                <Card.Body>
                    <Stack gap={2}>
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