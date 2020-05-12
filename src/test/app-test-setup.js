/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Router } from 'react-router-dom';
import { render as rtlr } from '@testing-library/react';
import { ReactQueryConfigProvider } from 'react-query';
import { createMemoryHistory } from 'history';

const queryConfig = {
  retry: 0,
  useErrorBoundary: true,
  refetchAllOnWindowFocus: false,
};

function render(
  ui,
  {
    route = '/',
    initialEntries = [route],
    history = createMemoryHistory(initialEntries),
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <ReactQueryConfigProvider config={queryConfig}>
        <Router history={history}>{children}</Router>
      </ReactQueryConfigProvider>
    );
  }
  return {
    ...rtlr(ui, { wrapper: Wrapper }),
    history,
  };
}

export { default as userEvent } from '@testing-library/user-event';
export * from '@testing-library/react';
export { render };
