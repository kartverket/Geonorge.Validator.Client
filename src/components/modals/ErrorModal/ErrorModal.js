import { Button, Modal } from 'react-bootstrap';
import { useModals } from 'context/ModalsContext';

function ErrorModal(props) {
   const { closeModal } = useModals();
   const { title = 'En feil har oppstått...', message } = props;

   function handleOnHide() {
      closeModal('ERROR');
   }

   return (
      <Modal show={true} onHide={handleOnHide} animation={false} centered dialogClassName="error-dialog">
         <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {message}
         </Modal.Body>
         <Modal.Footer>
            <Button variant="primary" onClick={handleOnHide}>Lukk</Button>
         </Modal.Footer>
      </Modal>
   );
};

export default ErrorModal;