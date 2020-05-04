import React from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';

function OrderStatus() {
  const [status, setStatus] = React.useState<string | null | unknown>('new');

  function handleChange(
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) {
    setStatus(event.target.value);
  }
  return (
    <FormControl>
      <Select id="select-order-status" value={status} onChange={handleChange}>
        <MenuItem value="new">New</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="paid">Paid</MenuItem>
      </Select>
    </FormControl>
  );
}

export default OrderStatus;
