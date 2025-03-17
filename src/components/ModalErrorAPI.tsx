import { ModalBody, ModalDialog, ModalHeader, ModalTitle } from 'react-bootstrap';

export function ModalErrorAPI({ title, info }: { title: string; info: string }) {
    return (
        <div className="modal show" style={{ display: 'block' }}>
            <ModalDialog>
                <ModalHeader className="bg-danger text-white">
                    <ModalTitle className="fw-bold">{title}</ModalTitle>
                </ModalHeader>
                <ModalBody className="bg-light">
                    <p className="text-secondary">{info}</p>
                </ModalBody>
            </ModalDialog>
        </div>
    );
}
