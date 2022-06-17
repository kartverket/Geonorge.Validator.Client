import ErrorModal from './ErrorModal/ErrorModal';
import InvalidFileModal from './InvalidFileModal/InvalidFileModal';

const modals = {
   ERROR: ErrorModal,
   INVALID_FILE: InvalidFileModal
};

export const modalType = {
   ERROR: 'ERROR',
   INVALID_FILE: 'INVALID_FILE'
}

export default modals;