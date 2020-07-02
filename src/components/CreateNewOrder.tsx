import React from 'react';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  makeStyles
} from '@material-ui/core';
import { useOrderCreate } from '../utils/orders';
import { VanityColor } from '../types';

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function validatePhone(phone: string) {
  const re = /^(\([0-9]{3}\)\s*|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
  return re.test(phone);
}

const useStyles = makeStyles({
  formControl: {
    flexBasis: '25%'
  }
});

export default function CreateNewOrder() {
  const classes = useStyles();
  const [createOrder] = useOrderCreate();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [color, setColor] = React.useState<VanityColor>('White');
  const [mirrorSize, setMirrorSize] = React.useState('Small');
  const [tableSize, setTableSize] = React.useState('Small');
  const [emailError, setEmailError] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [phoneError, setPhoneError] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clearErrors = () => {
    setEmailError('');
    setNameError('');
    setPhoneError(false);
  };

  const handleSubmit = () => {
    clearErrors();

    if (!validateEmail(email)) {
      setEmailError('please recheck email');
      return;
    }
    if (name.length < 3) {
      setNameError('name needs to be more the 3 character');
      return;
    }
    if (!validatePhone(phone)) {
      setPhoneError(true);
      return;
    }

    createOrder(
      {
        customer: {
          email,
          name,
          phone
        },
        vanity: {
          color,
          table: { size: tableSize },
          mirror: { size: mirrorSize },
          baseMaterial: { size: mirrorSize }
        }
      },
      {
        onSettled: () => handleClose()
      }
    );
  };

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        aria-label="open drawer"
        style={{ color: 'white' }}
      >
        <AddCircleIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New Order</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Name"
            type="text"
            error={!!nameError}
            helperText={nameError}
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            required
            fullWidth
            error={!!emailError}
            helperText={emailError}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Phone"
            type="text"
            required
            fullWidth
            error={phoneError}
            helperText="XXX-XXX-XXXX"
            onChange={(e) => setPhone(e.target.value)}
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="color">Color</InputLabel>
              <Select
                labelId="color"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value as VanityColor)}
              >
                <MenuItem value="Pink">Pink</MenuItem>
                <MenuItem value="White">White</MenuItem>
                <MenuItem value="Black">Black</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="mirror-size">Mirror Size</InputLabel>
              <Select
                labelId="mirror-size"
                id="mirror-size"
                value={mirrorSize}
                onChange={(e) => setMirrorSize(e.target.value as string)}
              >
                <MenuItem value="Small">Small</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Large">Large</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="table-size">Table Size</InputLabel>
              <Select
                labelId="table-size"
                id="table-size"
                value={tableSize}
                onChange={(e) => setTableSize(e.target.value as string)}
              >
                <MenuItem value="Small">Small</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Large">Large</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
