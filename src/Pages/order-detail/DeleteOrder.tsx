import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  withStyles
} from '@material-ui/core';
import { useOrderDelete } from '../../utils/orders';
import { useHistory } from 'react-router-dom';
import { red } from '@material-ui/core/colors';

const RedButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    '&:hover': {
      backgroundColor: red[800]
    }
  }
}))(Button);

type props = {
  orderId: string;
};

function DeleteOrder({ orderId }: props) {
  const [deleteOrder] = useOrderDelete();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    deleteOrder(orderId, {
      onSuccess: () => {
        handleClose();
        history.push('/orders');
      }
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <RedButton variant="contained" onClick={() => setOpen(true)}>
        Delete
      </RedButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography>Are you sure you want to delete this order?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <RedButton variant="contained" onClick={handleDelete} color="primary">
            Delete Order
          </RedButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteOrder;
