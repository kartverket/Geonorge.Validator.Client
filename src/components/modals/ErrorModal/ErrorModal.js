import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { closeModal } from 'store/slices/modalSlice';

function ErrorModal(props) {
   const TITLE = 'Feil!';
   const MESSAGE = 'En feil har oppstått.';
   const dispatch = useDispatch();

   function handleOnHide() {
      dispatch(closeModal({ type: 'ERROR' }));
   }

   return (
      <Modal show={true} onHide={handleOnHide} animation={false} centered dialogClassName="error-dialog">
         <Modal.Header closeButton>
            <Modal.Title>{props.title || TITLE}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {props.message || MESSAGE}
         </Modal.Body>
         <Modal.Footer>
            <Button variant="primary" onClick={handleOnHide}>Lukk</Button>
         </Modal.Footer>
      </Modal>
   );
};

export default ErrorModal;