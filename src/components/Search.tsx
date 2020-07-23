import React from 'react';
import { Box, TextField, InputAdornment, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory, useLocation } from 'react-router-dom';

type props = {
  fetchSearch?: ((term: string) => void) & _.Cancelable;
};
type LocationState = {
  searchTerm: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fcfcfb'
  }
}));

function Search({ fetchSearch }: props) {
  const { pathname, state: locationState } = useLocation<LocationState>();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = React.useState(
    locationState?.searchTerm ?? ''
  );
  const classes = useStyles();
  function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    if (pathname === '/orders') return;
    history.push('/orders', {
      searchTerm
    });
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        id="search"
        type="text"
        variant="outlined"
        size="small"
        value={searchTerm}
        onKeyUp={() => fetchSearch && fetchSearch(searchTerm)}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          classes,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </Box>
  );
}

export default Search;
