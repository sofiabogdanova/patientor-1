import React from 'react';
import {Modal, Segment} from 'semantic-ui-react';
import AddPatientForm, {VisitFormValues} from './AddVisitForm';

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: VisitFormValues) => void;
    error?: string;
}

const AddVisitModal = ({modalOpen, onClose, onSubmit, error}: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new visit entry</Modal.Header>
        <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddPatientForm onSubmit={onSubmit} onCancel={onClose}/>
        </Modal.Content>
    </Modal>
);

export default AddVisitModal;
