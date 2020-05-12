import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

const daysOfTheWeek: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

export default function WeeklyOrders() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        This Week Orders
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            {daysOfTheWeek.map((day) => (
              <TableCell align="center">{day}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">0</TableCell>
            <TableCell align="center">4</TableCell>
            <TableCell align="center">0</TableCell>
            <TableCell align="center">2</TableCell>
            <TableCell align="center">1</TableCell>
            <TableCell align="center">0</TableCell>
            <TableCell align="center">0</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}
