import { Loading } from './Loading';
import { useContext } from 'react';
import { ContextSearch } from '../context/ContextSearch';
import { Button, Form, Row, Spinner, Stack } from 'react-bootstrap';
import { SearchCity } from './SearchCity';
import { SearchCoordenates } from './SearchCoordenates';
import { ContextWeather } from '../context/ContextWeather';

export function FormSearch() {
    const contextSearch = useContext(ContextSearch);
    const contextWeather = useContext(ContextWeather);

    if (!contextSearch || !contextWeather) return <Loading />;

    const { handleSubmit, errors, location, latManual, longManual, isButtonLoading } = contextSearch;

    const isErrorInputs = errors.latManual?.isError || errors.longManual?.isError || errors.location?.isError;
    const isFieldEmpty = (value: string | undefined | null) => !value?.trim();

    const isAllValues:boolean = !isFieldEmpty(location) && !isFieldEmpty(latManual) && !isFieldEmpty(longManual);
    const isEmptyFields:boolean = isFieldEmpty(location) && isFieldEmpty(latManual) && isFieldEmpty(longManual);
    const isIncompleteCoordinates:boolean = isFieldEmpty(latManual) !== isFieldEmpty(longManual);
    const isDisabled: boolean = isErrorInputs || isAllValues || isIncompleteCoordinates || isEmptyFields;
    return (
        <>
            <Form className="formSearch" onSubmit={handleSubmit}>
                <Stack gap={4}>
                    <Row className='justify-content-center align-items-center'>
                        <SearchCity />
                        <SearchCoordenates />
                    </Row>
                    <Button className='w-50' type="submit" disabled={isDisabled}>{!isButtonLoading ? 'Buscar' : 'Buscando...'}
                        {
                            isButtonLoading && <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden='true'
                            />
                        }
                    </Button>
                </Stack>
            </Form>
        </>
    );
}
