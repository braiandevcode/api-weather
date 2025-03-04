// REACT BOOTSTRAP
import { Button, Form, FormControl, Stack, Col, Row } from 'react-bootstrap';
import { useSearch } from '../hooks/useSearch';
import { Loading } from './Loading';

export function FormSearch() {
    const hookSearch = useSearch();
    if(!hookSearch) return <Loading />;
    
    // CUSTOM HOOK SEARCH
    const { 
        handleChange, 
        handleChangeLat, 
        handleChangeLon, 
        handleSubmit, 
        location, 
        latManual, 
        longManual 
    } = hookSearch;

    return (
        <>
            <Form className="formSearch" onSubmit={handleSubmit}>
                <Stack gap={4}>
                    <Row className='justify-content-center'>
                        <Col xs='auto' className='mb-3 w-100' >
                            <Stack gap={3}>
                                <div>
                                    <span>Buscar por nombre de ciudad o provincia</span>
                                </div>
                                <Stack gap={3}>
                                    <FormControl
                                        type="text"
                                        id="filterLocation"
                                        placeholder="Ciudad o Provincia"
                                        value={location}
                                        onChange={handleChange}
                                        autoFocus
                                    />
                                </Stack>
                            </Stack>
                        </Col>
                        <Col xs='auto' className='mb-3 w-100'>
                            <Stack gap={3}>
                                <div>
                                    <span>¿No es la zona deseada? Ingresa las coordenadas para una mejor presición:</span>
                                </div>
                                <Stack gap={2}>
                                    <Stack gap={2}>
                                        <FormControl
                                            type="text"
                                            value={latManual}
                                            onChange={handleChangeLat}
                                            placeholder="Latitud - ej: 33.15565485"
                                            id='filterLatitude'
                                        />
                                    </Stack>
                                    <Stack gap={2}>
                                        <FormControl
                                            type='text'
                                            value={longManual}
                                            onChange={handleChangeLon}
                                            placeholder="Longitud - ej: -33.15565485"
                                            id='filterLongitude'
                                        />
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Col>
                    </Row>
                    <Button className='w-50' type="submit">Buscar</Button>
                </Stack>
            </Form>
        </>
    );
}
