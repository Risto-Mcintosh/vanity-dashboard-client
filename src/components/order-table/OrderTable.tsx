/* eslint-disable react/display-name */
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';
import { Order } from '../../types';
import { useHistory } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

interface Props {
  tableTitle?: string;
  orders: Order[];
}

export default function OrdersTable({ tableTitle, orders }: Props) {
  const theme = useTheme();
  const history = useHistory();
  return (
    <>
      <MaterialTable
        style={{
          padding: theme.spacing(2),
        }}
        title={tableTitle}
        columns={[
          {
            title: 'Date',
            field: 'orderedOn',
            render: (rowData) => formatDate(rowData.orderedOn),
          },
          { title: 'Name', field: 'customer.name' },
          { title: 'Email', field: 'customer.email' },
          { title: 'Number', field: 'customer.phone' },
          { title: 'Total', field: 'total' },
        ]}
        data={orders}
        options={{
          search: false,
          showTitle: typeof tableTitle === 'string',
          paging: false,
          sorting: false,
          draggable: false,
        }}
        onRowClick={(e, rowData) => history.push(`/orders/${rowData?.id}`)}
        components={{
          Toolbar: (props) => (
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              {tableTitle}
            </Typography>
          ),
        }}
      />
    </>
  );
}
