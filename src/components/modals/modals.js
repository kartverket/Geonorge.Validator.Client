import ErrorModal from './ErrorModal/ErrorModal';
import InvalidFileModal from './InvalidFileModal/InvalidFileModal';

const Modal = {
   type: {
      ERROR: 'ERROR',
      INVALID_FILE: 'INVALID_FILE'
   },
   component: {
      ERROR: ErrorModal,
      INVALID_FILE: InvalidFileModal
   }
}

export default Modal;
