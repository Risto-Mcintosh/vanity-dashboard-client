import React from 'react';
import OrdersTable from '../../Components/order-table/OrderTable';
import { useListOrders } from '../../utils/orders';

function Orders() {
  const { data, status, error } = useListOrders();

  if (status === 'loading' || !data) return <h2>Loading...</h2>;
  return (
    <div>
      <OrdersTable orders={data} />
    </div>
  );
}

export default Orders;
