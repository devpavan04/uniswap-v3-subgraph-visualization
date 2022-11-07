import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';
import { GeistProvider, CssBaseline } from '@geist-ui/core';
import App from './App';
import './index';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GeistProvider>
        <CssBaseline />
        <App />
      </GeistProvider>
    </ApolloProvider>
  </React.StrictMode>
);
