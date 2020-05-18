import React from 'react';
import {
  makeStyles,
  Box,
  TextField,
  Button,
  InputAdornment,
} from '@material-ui/core';
import { VanityComponent } from '../../types';

const useStyles = makeStyles((theme) => ({
  input: {
    maxWidth: '67%',
    '& .MuiInputBase-root': {
      fontSize: theme.typography.pxToRem(18),
    },
    '& .MuiInputBase-input': {
      marginLeft: theme.spacing(1),
    },
  },
  cancelButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.getContrastText(theme.palette.error.main),
    marginLeft: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

type props = {
  toggleEdit: React.Dispatch<React.SetStateAction<boolean>>;
  product: VanityComponent;
};

export default function EditPrice({ product, toggleEdit }: props) {
  const classes = useStyles();
  const [formError, setFormError] = React.useState({ isError: false, msg: '' });
  const [price, setPrice] = React.useState<number | string>(product.price);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value.match(/[A-Za-z]/)) return;
    setPrice(value);
  }

  function handleSubmit(e: React.FormEvent) {
    console.log(e);
    //toggleEdit(false)
    e.preventDefault();
  }

  function clearForm() {
    toggleEdit(false);
    setFormError({ isError: false, msg: '' });
  }

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      onSubmit={handleSubmit}
      onReset={clearForm}
      mt={2}
    >
      <TextField
        value={price}
        onChange={handleChange}
        error={formError.isError}
        helperText={formError.msg}
        id="price"
        label="Price"
        className={classes.input}
        onBlur={(e) =>
          !e.relatedTarget &&
          setFormError({ isError: true, msg: 'Save or cancel change' })
        }
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        autoFocus
      />
      <Box mt={1}>
        <Button type="submit" color="primary" variant="contained">
          Save
        </Button>
        <Button
          type="reset"
          className={classes.cancelButton}
          variant="contained"
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
