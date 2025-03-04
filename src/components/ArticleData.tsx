import { Col, Row } from 'react-bootstrap';
import { DataHumFeels } from './DataHumFeels';
import { DataImageName } from './DataImageName';
import { DataMinMax } from './DataMinMax';
import { DataWind } from './DataWind';

// ARTICULOS CON LOS DATOS DEL CLIMA DEL USUARIO
export function ArticleData() {
    return (
        <>
            <Row className='justify-content-center'>
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