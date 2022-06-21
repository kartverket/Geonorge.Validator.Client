import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'components/modals/modals';

function Modals() {
   const openedModals = useSelector(state => state.modals.opened);
   const [modals, setModals] = useState([]);

   useEffect(
      () => {
         const toOpen = openedModals
            .filter(modal => !modals.some(mod => mod.type === modal.type))
            .map(modal => {
               const { type, ...props } = modal;

               return {
                  type,
                  component: Modal.component[type],
                  props
               };
            });

         setModals([...toOpen]);
      },
      [openedModals]
   );

   return (
      <Fragment>
         {
            modals.map(modal => <modal.component {...modal.props} key={modal.type} />)
         }
      </Fragment>
   );
}

export default Modals;