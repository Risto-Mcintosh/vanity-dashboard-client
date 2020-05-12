/* eslint-disable react/display-name */
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';

interface Props {
  tableTitle?: string;
  orders: any[];
}

export default function OrdersTable({ tableTitle, orders }: Props) {
  const theme = useTheme();
  return (
    <>
      <MaterialTable
        style={{
          padding: theme.spacing(2),
        }}
        title={tableTitle}
        columns={[
          { title: 'Date', field: 'date' },
          { title: 'Name', field: 'name' },
          { title: 'Email', field: 'email' },
          { title: 'Number', field: 'number' },
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
        components={{
          Toolbar: (props) => (
            <Typography
              {...props}
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
