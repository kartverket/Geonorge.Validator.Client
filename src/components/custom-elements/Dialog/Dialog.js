import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { hideDialog } from 'store/slices/dialogSlice';

function hideScrollbar() {
   document.querySelector('html').style.paddingRight = `${window.innerWidth - document.body.clientWidth}px`;
   document.querySelector('html').style.overflowY = 'hidden';
}

function showScrollbar() {
   document.querySelector('html').style.paddingRight = 0;
   document.querySelector('html').style.overflowY = 'scroll';  
}

function Dialog() {
   const show = useSelector(state => state.dialog.show);
   const title = useSelector(state => state.dialog.title);
   const body = useSelector(state => state.dialog.body);
   const className = useSelector(state => state.dialog.className);
   const dispatch = useDispatch();

   function onHide() {
      dispatch(hideDialog());
      showScrollbar();
   }

   if (show) {
      hideScrollbar();
   }
   
   return (
      <Modal show={show} onHide={onHide} animation={false} centered dialogClassName={className}>
         <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div dangerouslySetInnerHTML={{__html: body}}></div>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="primary" onClick={onHide}>Lukk</Button>
         </Modal.Footer>
      </Modal>
   );
};

export default Dialog