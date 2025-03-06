import { Loading } from './Loading';
import { useContext } from 'react';
import { ContextSearch } from '../context/ContextSearch';
import { Button, Form, Row, Stack } from 'react-bootstrap';
import { SearchCity } from './SearchCity';
import { SearchCoordenates } from './SearchCoordenates';

export function FormSearch() {
    const contextSearch = useContext(ContextSearch);

    if(!contextSearch) return <Loading />;

    const { handleSubmit } = contextSearch;

    return (
        <>
            <Form className="formSearch" onSubmit={handleSubmit}>
                <Stack gap={4}>
                    <Row className='justify-content-center'>
                        <SearchCity />
                        <SearchCoordenates />
                    </Row>
                    <Button className='w-50' type="submit">Buscar</Button>
                </Stack>
            </Form>
        </>
    );
}
