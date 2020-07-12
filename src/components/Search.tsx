import React from 'react';
import { Box, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

type props = {
  fetchSearch: ((term: string) => void) & _.Cancelable;
};
function Search({ fetchSearch }: props) {
  const [searchTerm, setSearchTerm] = React.useState('');

  function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();

    console.log('submit!!');
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        id="search"
        type="text"
        variant="outlined"
        size="small"
        value={searchTerm}
        onKeyUp={() => fetchSearch(searchTerm)}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
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
