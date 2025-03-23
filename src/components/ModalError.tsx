import { useContext } from 'react';
import { Button, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Stack } from 'react-bootstrap';
import { ContextSearch } from '../context/ContextSearch';
import { Loading } from './Loading';
import { ExclamationCircle, XCircle, ArrowClockwise } from 'react-bootstrap-icons';  // Importamos los iconos
import { IModalError } from '../types/types.d';

export function ModalErrorSearch({
  title,
  info,
  handleClickModal,
  isGeolocationError, // Nuevo parámetro para indicar si el error es de geolocalización
  retryGeolocation // Función para reintentar geolocalización
}: IModalError) {
  const contextSearch = useContext(ContextSearch);

  if (!contextSearch) return <Loading />;

  return (
    <div className='modal'>
      <ModalDialog className='w-75'>
        <ModalHeader className={`bg-gradient ${isGeolocationError ? 'bg-danger text-light' : 'bg-warning text-black'}`}>
          <ExclamationCircle size={30} className="text-warning me-2" />
          <ModalTitle className='fw-bold fs-5'>{title}</ModalTitle>
          <Button variant="link" onClick={handleClickModal} className="close-btn fs-6" />
        </ModalHeader>
        <ModalBody className='bg-gradient bg-body-tertiary'>
          <p className='text-secondary fs-6'>{info}</p>
        </ModalBody>
        <ModalFooter className='bg-gradient bg-body-tertiary'>
          <Button
            className={'text-decoration-none text-warning'}
            variant={'link'}
            onClick={isGeolocationError ? retryGeolocation : handleClickModal}
          >
            {/* Botón con icono de Reintentar (actualización) */}
            {isGeolocationError
              ? <Stack direction='horizontal' gap={1} className='align-items-center'>
                <ArrowClockwise size={40} />
              </Stack>
              : <Stack direction='horizontal' gap={1} className='align-items-center'>
                <XCircle size={40} />
              </Stack>
            }
          </Button>
        </ModalFooter>
      </ModalDialog>
    </div>
  );
}

