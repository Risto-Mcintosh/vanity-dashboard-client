import React from 'react';
import { Order } from '../../types';
import formatDate from '../../utils/formatDate';
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  Paper,
  TableFooter,
  TablePagination,
  Table,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Typography,
  Box
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

type props = {
  tableTitle?: string;
  orders: Order[];
  paginatedData?: {
    setPageFn: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    totalCount: number;
    pageLimit: number;
  };
};

export default function OrderTable({
  orders,
  paginatedData,
  tableTitle
}: props) {
  const classes = useStyles();
  const history = useHistory();

  function handleChangePage(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) {
    /* 
    Need to add 1 here because the page number set in the
    TablePagination component zero index
    */
    console.log('page change', page);

    paginatedData?.setPageFn(page + 1);
  }
  return (
    <TableContainer component={Paper}>
      {tableTitle && (
        <Box px={3} pt={2}>
          <Typography component="h2" variant="h4" color="primary" gutterBottom>
            {tableTitle}
          </Typography>
        </Box>
      )}
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              hover
              onClick={() => history.push(`/orders/${order.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell component="th" scope="row">
                {formatDate(order.orderedOn)}
              </TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>{order.customer.email}</TableCell>
              <TableCell>{order.customer.phone}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>{order.orderStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {paginatedData && (
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={6}
                rowsPerPage={paginatedData.pageLimit}
                count={paginatedData.totalCount}
                page={paginatedData.page - 1}
                onChangePage={handleChangePage}
                labelRowsPerPage=""
                rowsPerPageOptions={[]}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
}
