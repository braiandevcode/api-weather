import { useContext } from 'react';
import { Button, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { ContextSearch } from '../context/ContextSearch';
import { Loading } from './Loading';

export function ModalErrorSearch({ title, info,  handleClickModal }: { title: string, info: string, handleClickModal: ()=> void}) {
   const contextSearch = useContext(ContextSearch);

   if(!contextSearch) return <Loading />;

  return (
    <div className={'modal'}>
      <ModalDialog>
        <ModalHeader className='bg-gradient bg-warning' onClick={handleClickModal} closeButton>
          <ModalTitle className='fw-bold'>{title}</ModalTitle>
        </ModalHeader>
        <ModalBody className='bg-gradient bg-body-tertiary'>
          <p className='text-secondary'>{info}</p>
        </ModalBody>
        <ModalFooter className='bg-gradient bg-body-tertiary'>
          <Button variant="warning" onClick={handleClickModal}>Close</Button>
        </ModalFooter>
      </ModalDialog>
    </div>

  );
}
