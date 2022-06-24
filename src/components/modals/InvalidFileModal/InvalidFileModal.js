import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from 'store/slices/modalSlice';
import { modalType } from '..';

function InvalidFileModal() {
   const TITLE = 'Ugyldig fil!';
   const BODY = 'Filen er ugyldig.';
   const [show, setShow] = useState(false);
   const [title, setTitle] = useState(null);
   const [body, setBody] = useState(null);
   const [className, setClassName] = useState(null);
   const dispatch = useDispatch();   
   const modals = useSelector(state => state.modals.added);

   useEffect(
      () => {
         const modal = modals.find(modal => modal.type === modalType.INVALID_FILE);

         if (modal) {
            setShow(modal.visible);
            setTitle(modal.title);
            setBody(modal.body);
            setClassName(modal.className);
         }
      },
      [modals]
   );

   function handleOnHide() {
      dispatch(closeModal({ type: modalType.INVALID_FILE }));
   }

   return (
      <Modal show={show} onHide={handleOnHide} animation={false} centered dialogClassName={className}>
         <Modal.Header closeButton>
            <Modal.Title>{title || TITLE}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {body || BODY}
         </Modal.Body>
         <Modal.Footer>
            <Button variant="primary" onClick={handleOnHide}>Lukk</Button>
         </Modal.Footer>
      </Modal>
   );
};

export default InvalidFileModal;