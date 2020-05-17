/* eslint-disable react/display-name */
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Box,
  TextField,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Input,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { VanityComponent } from '../../types';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  size: {
    fontWeight: theme.typography.fontWeightLight,
  },
  price: {
    fontWeight: theme.typography.fontWeightLight,
    position: 'relative',

    '& button': {
      position: 'absolute',
    },
  },
  input: {
    maxWidth: '34%',
    marginRight: theme.spacing(1),
    '& .MuiInputBase-root': {
      fontSize: theme.typography.pxToRem(18),
    },
    '& .MuiInputBase-input': {
      marginLeft: theme.spacing(1),
    },
  },
}));

type props = {
  product: VanityComponent;
};

export default function ProductCard({ product }: props) {
  const classes = useStyles();
  const [edit, toggleEdit] = React.useState(false);

  const EditPriceForm = (
    <Box
      component="form"
      display="flex"
      justifyContent="center"
      onBlur={() => toggleEdit(false)}
      onSubmit={() => toggleEdit(false)}
      mt={2}
    >
      <TextField
        value={product.price}
        id="price"
        label="Price"
        className={classes.input}
        InputProps={{
          inputComponent: (props: any) => (
            <NumberFormat {...props} prefix="$" />
          ),
        }}
        autoFocus
      />

      <Button type="submit" color="primary" variant="contained">
        Save
      </Button>
    </Box>
  );

  const PriceDisplay = (
    <Typography className={classes.price} variant="h4" align="center">
      ${product.price}
    </Typography>
  );

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography className={classes.size} variant="h6">
            {product.type}
          </Typography>
          {!edit && (
            <IconButton color="secondary" onClick={() => toggleEdit(true)}>
              <EditIcon />
            </IconButton>
          )}
        </Box>
        <Typography align="center" variant="h2">
          {product.size}
        </Typography>
        {edit ? EditPriceForm : PriceDisplay}
      </CardContent>
    </Card>
  );
}
