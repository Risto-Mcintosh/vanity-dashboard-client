import React from 'react';
import { daysOfTheWeek } from './mapWeeklyOrders';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import { Order } from '../../types';
import OrderCount from './OrderCount';
import OrdersTable from '../order-table';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

export default function WeeklyOrders() {
  const classes = useStyles();

  const [selected, setSelected] = React.useState<Order[] | null>(null);

  return (
    <Paper className={classes.paper}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        This Week Orders
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            {daysOfTheWeek.map((day) => (
              <TableCell key={day} align="center">
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <OrderCount setSelected={setSelected} />
        </TableBody>
      </Table>
      {selected && (
        <div>
          <OrdersTable orders={selected} />
        </div>
      )}
    </Paper>
  );
}
