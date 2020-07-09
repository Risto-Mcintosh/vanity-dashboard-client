import React from 'react';
import OrdersTable from '../../Components/order-table';
import { useOrderListPaginated } from '../../utils/orders';

function Orders() {
  const [pageNumber, setPage] = React.useState(1);
  const { resolvedData } = useOrderListPaginated({
    limit: '15',
    pageNumber: pageNumber.toString()
  });
  console.log('pageNumber:', pageNumber);
  const paginatedData = {
    setPageFn: setPage,
    page: resolvedData?.pageData.CurrentPage,
    totalCount: resolvedData?.pageData.TotalCount,
    pageLimit: 15
  };
  return (
    <div>
      <OrdersTable orders={resolvedData.data} paginatedData={paginatedData} />
    </div>
  );
}

export default Orders;
