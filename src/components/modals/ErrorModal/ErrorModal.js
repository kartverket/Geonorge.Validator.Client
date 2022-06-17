import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { modalType } from '../modals';
import { closeModal } from 'store/slices/modalSlice';
import { createSelector } from '@reduxjs/toolkit';

const getThisModal = createSelector(
   (state) => state.modals,
   (modals) => modals.toggled.find(modal => modal.type === modalType.ERROR)
);

function ErrorModal() {
   const TITLE = 'Feil!';
   const MESSAGE = 'En feil har oppstått.';
   const [show, setShow] = useState(false);
   const thisModal = useSelector(getThisModal);
   const dispatch = useDispatch();

   useEffect(
      () => {
         console.log(thisModal);
         setShow(thisModal !== undefined);
      },
      [thisModal]
   );

   function handleOnHide() {
      dispatch(closeModal({ type: modalType.ERROR }));
   }

   return (
      <Modal show={show} onHide={handleOnHide} animation={false} centered dialogClassName={`error-dialog ${thisModal?.className}`}>
         <Modal.Header closeButton>
            <Modal.Title>{thisModal?.title || TITLE}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {thisModal?.message || MESSAGE}
         </Modal.Body>
         <Modal.Footer>
            <Button variant="primary" onClick={handleOnHide}>Lukk</Button>
         </Modal.Footer>
      </Modal>
   );
};

export default ErrorModal;