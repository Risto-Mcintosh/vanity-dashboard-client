import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import OrderStatus from './OrderStatusSelect';
import MaterialTable from 'material-table';

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  number: string,
  email: string,
  color: string,
  total: number
) {
  return { id, date, name, number, email, color, total };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'Presley@gmail.com',
    'Red, Large, Small',
    312.44
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'McCartney@gmail.com',
    'Red, Large, Small',
    866.99
  ),
  createData(
    2,
    '16 Mar, 2019',
    'Tom Scholz',
    'Boston, MA',
    'Scholz@gmail.com',
    'Red, Large, Small',
    100.81
  ),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'Jackson@gmail.com',
    'Red, Large, Small',
    654.39
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'Springsteen@gmail.com',
    'Red, Large, Small',
    212.79
  )
];

interface Props {
  tableTitle?: string;
}

export default function OrdersTable({ tableTitle }: Props) {
  const theme = useTheme();
  return (
    <>
      <MaterialTable
        style={{
          padding: theme.spacing(2)
        }}
        title={tableTitle}
        columns={[
          { title: 'Date', field: 'date' },
          { title: 'Name', field: 'name' },
          { title: 'Email', field: 'email' },
          { title: 'Number', field: 'number' },
          { title: 'Color | Mirror | Table', field: 'color' },
          { title: 'Total', field: 'total' },
          {
            title: 'Order Status',
            field: 'orderStatus',
            render: () => <OrderStatus />
          }
        ]}
        data={rows}
        options={{
          search: false,
          showTitle: typeof tableTitle === 'string',
          padding: 'dense',
          paging: false,
          sorting: false,
          draggable: false
        }}
        components={{
          Toolbar: props => (
            <Typography
              {...props}
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              {tableTitle}
            </Typography>
          )
        }}
      />
    </>
  );
}
