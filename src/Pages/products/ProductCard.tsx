/* eslint-disable react/display-name */
import React from 'react';
import EditPrice from './EditPrice';
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Box,
  IconButton,
} from '@material-ui/core';
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
}));

type props = {
  product: VanityComponent;
};

export default function ProductCard({ product }: props) {
  const classes = useStyles();
  const [edit, toggleEdit] = React.useState(false);

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
        {edit ? (
          <EditPrice product={product} toggleEdit={toggleEdit} />
        ) : (
          PriceDisplay
        )}
      </CardContent>
    </Card>
  );
}
