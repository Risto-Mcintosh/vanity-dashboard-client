import React from 'react';
import OrdersTable from '../../Components/order-table';
import { useOrderListPaginated } from '../../utils/orders';
import Search from '../../Components/Search';
import { Box } from '@material-ui/core';
import debounce from 'lodash.debounce';
import { useLocation } from 'react-router-dom';

type LocationState = {
  searchTerm: string;
};

function Orders() {
  const { state: locationState } = useLocation<LocationState>();

  const [pageNumber, setPage] = React.useState(1);
  const [searchString, setSearch] = React.useState(
    locationState?.searchTerm ?? ''
  );
  const { resolvedData } = useOrderListPaginated({
    limit: '15',
    pageNumber: pageNumber.toString(),
    searchString
  });

  const paginatedData = {
    setPageFn: setPage,
    page: resolvedData?.pageData.CurrentPage,
    totalCount: resolvedData?.pageData.TotalCount,
    pageLimit: 15
  };
  const setSearchDebounced = debounce((term: string) => setSearch(term), 600);
  return (
    <div>
      <Box display="flex" justifyContent="center" mb={3} py={1}>
        <Search fetchSearch={setSearchDebounced} />
      </Box>
      <OrdersTable orders={resolvedData.data} paginatedData={paginatedData} />
    </div>
  );
}

export default Orders;
