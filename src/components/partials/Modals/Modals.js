import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import modals from 'components/modals/modals';
import ErrorModal from 'components/modals/ErrorModal/ErrorModal';

function Modals() {
   return (
      <Fragment>
         <ErrorModal />
      </Fragment>
   );
}

export default Modals;