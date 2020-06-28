import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Order } from '../types';
import { MutationOptions } from 'react-query';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Box, Typography } from '@material-ui/core';

type props = {
  order: Order;
  mutateOrder: (
    variables: Order,
    options?: MutationOptions<Order, Order>
  ) => Promise<Order>;
};

function DatePicker({ order, mutateOrder }: props) {
  const [selectedDate, setSelectedDate] = React.useState<
    Date | MaterialUiPickersDate
  >(new Date());

  return (
    <Box display="flex" flexDirection="column">
      <Typography align="center" gutterBottom={true}>
        Set Due Date
      </Typography>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          format="DD MMM YYYY"
          disabled={order.orderStatus === 'New'}
          onAccept={(date) =>
            mutateOrder({
              ...order,
              meta: { ...order.meta, dueOn: date?.toDate() ?? null }
            })
          }
        />
      </MuiPickersUtilsProvider>
    </Box>
  );
}

export default DatePicker;
