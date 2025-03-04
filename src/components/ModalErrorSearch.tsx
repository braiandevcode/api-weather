import { useContext } from 'react';
import { Button, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { ContextWeather } from '../context/ContextWeather';

export function ModalErrorSearch({ title, info,  handleClickModal }: { title: string, info: string, handleClickModal: ()=> void}) {
   const context = useContext(ContextWeather);

   if(!context) return null;

  return (
    <div className={`modal ${context.state.isVisible ? 'd-block' : 'd-none' }`}>
      <ModalDialog className='bg-gradient bg-success'>
        <ModalHeader className='bg-gradient bg-success' onClick={handleClickModal} closeButton>
          <ModalTitle className='text-warning fw-bold'>{title}</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <p className='text-secondary'>{info}</p>
        </ModalBody>

        <ModalFooter>
          <Button variant="secondary" onClick={handleClickModal}>Cerrar</Button>
        </ModalFooter>
      </ModalDialog>
    </div>

  );
}
