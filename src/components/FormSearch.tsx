import { useContext } from 'react';
import { Button, Form, Row, Spinner, Stack } from 'react-bootstrap';
import { SearchCity } from './SearchCity';
import { SearchCoordenates } from './SearchCoordenates';
import { ContextSearch } from '../context/ContextSearch';
import { Loading } from './Loading';

// COMPONENTE FORMULARIO DE BUSQUEDA
export function FormSearch() {
  const contextSearch = useContext(ContextSearch);
  if (!contextSearch) return <Loading />;

  const { handleSubmit, errors, location, latManual, longManual, isButtonLoading } = contextSearch;

  const isFieldEmpty = (value: string | undefined | null) => !value?.trim();
  const isAllValues: boolean = !isFieldEmpty(location) && !isFieldEmpty(latManual) && !isFieldEmpty(longManual);
  const isAllEmptyFields: boolean = isFieldEmpty(location) && isFieldEmpty(latManual) && isFieldEmpty(longManual);
  const isIncompleteCoordinates: boolean = isFieldEmpty(latManual) !== isFieldEmpty(longManual);
  const isDisabled: boolean =
    errors.latManual?.isError ||
    errors.longManual?.isError ||
    errors.location?.isError ||
    isAllValues ||
    isIncompleteCoordinates ||
    isAllEmptyFields;
    
  return (
    <Form className="formSearch w-100" onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row className="justify-content-center align-items-center">
          <SearchCity />
          <SearchCoordenates />
        </Row>
        <Button className="w-100 w-sm-50 mx-auto" type="submit" disabled={isDisabled}>
          {!isButtonLoading ? 'Search' : 'Searching...'}
          {isButtonLoading && (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          )}
        </Button>
      </Stack>
    </Form>
  );
}
