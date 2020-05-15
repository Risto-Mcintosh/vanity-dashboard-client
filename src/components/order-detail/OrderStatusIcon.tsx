import React from 'react';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import BuildIcon from '@material-ui/icons/Build';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { OrderStatus } from '../../types';

type props = {
  orderStatus: OrderStatus;
};
function OrderStatusIcon({ orderStatus }: props) {
  switch (orderStatus) {
    case 'New':
      return <FiberNewIcon color="secondary" />;
    case 'Pending':
      return <BuildIcon color="secondary" />;
    case 'Complete':
      return <CheckCircleOutlineIcon color="secondary" />;
    default:
      return null;
  }
}

export default OrderStatusIcon;
