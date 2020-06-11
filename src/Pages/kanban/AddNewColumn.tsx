import React from 'react';
import {
  TextField,
  Box,
  makeStyles,
  Button,
  IconButton,
  useTheme,
  withStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { useKanbanColumnCreate } from '../../utils/kanban';

const useStyles = makeStyles((theme) => ({
  container: {
    flex: '0 0 225px',
    marginLeft: '10px',
    marginRight: '10px'
  },
  cancelButton: {
    marginLeft: theme.spacing(1)
  }
}));

const StyledTextField = withStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: theme.palette.grey[700]
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.grey[700]
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.grey[700],
        borderWidth: '1px'
      }
    }
  }
}))(TextField);

export default function AddNewColumn() {
  const classes = useStyles();
  const theme = useTheme();
  const [update] = useKanbanColumnCreate();
  const [helperText, setHelperText] = React.useState('');
  const [showInput, setInput] = React.useState(false);
  const [newColumnName, setColumnName] = React.useState('');

  function reset() {
    setInput(false);
    setHelperText('');
    setColumnName('');
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newColumnName) {
      setHelperText('Required');
      return;
    }
    update(newColumnName, {
      onSuccess: () => reset()
    });
  }
  return (
    <div className={classes.container}>
      {!showInput ? (
        <Button
          color="secondary"
          startIcon={<AddIcon />}
          fullWidth
          variant="contained"
          onClick={() => setInput(true)}
        >
          Add New Column
        </Button>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          p={1}
          border={1}
          borderRadius={3}
          borderColor={theme.palette.grey[300]}
        >
          <StyledTextField
            required
            autoFocus
            id="new-column-name"
            margin="dense"
            color="secondary"
            variant="outlined"
            value={newColumnName}
            onChange={(e) => setColumnName(e.target.value)}
            error={!!helperText}
            helperText={helperText}
          />
          <Button type="submit" variant="contained" color="secondary">
            Add
          </Button>
          <IconButton
            className={classes.cancelButton}
            onClick={() => reset()}
            aria-label="Cancel"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </div>
  );
}
