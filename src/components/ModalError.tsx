import { useContext } from 'react';
import { Button, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { ContextSearch } from '../context/ContextSearch';
import { Loading } from './Loading';
import { ExclamationCircle, XCircle } from 'react-bootstrap-icons';  // Importamos los iconos

export function ModalErrorSearch({
  title,
  info,
  handleClickModal,
  isGeolocationError, // Nuevo parámetro para indicar si el error es de geolocalización
  retryGeolocation // Función para reintentar geolocalización
}: {
  title: string,
  info: string,
  handleClickModal: () => void,
  isGeolocationError: boolean,
  retryGeolocation: () => void
}) {
  const contextSearch = useContext(ContextSearch);

  if (!contextSearch) return <Loading />;

  return (
    <div className={'modal'}>
      <ModalDialog  style={{ width: '500px', height: '300px' }}>
        <ModalHeader className={`bg-gradient ${isGeolocationError ? 'bg-danger text-light' : 'bg-warning text-black'}`}
        >
          {isGeolocationError ? (
            <ExclamationCircle size={30} className="text-warning me-2" /> // Ícono de advertencia en caso de error
          ) : (
            <XCircle size={30} className="text-secondary me-2" />  // Ícono de cierre normal
          )}
          <ModalTitle className='fw-bold fs-5 fs-sm-6'>{title}</ModalTitle>
          <Button variant="link" onClick={handleClickModal} className="close-btn" />
        </ModalHeader>
        <ModalBody className='bg-gradient bg-body-tertiary'>
          <p className='text-secondary'>{info}</p>
        </ModalBody>
        <ModalFooter className='bg-gradient bg-body-tertiary'>
          <Button
            variant={'warning'}
            onClick={isGeolocationError ? retryGeolocation : handleClickModal}
          >
            {isGeolocationError ? 'Reintentar' : 'Close'}
          </Button>
        </ModalFooter>
      </ModalDialog>
    </div>
  );
}
