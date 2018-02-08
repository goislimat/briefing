import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { error as errorMessage } from './components/alerts';

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Mensagem: ${message}, Localização: ${locations}, Caminho: ${path}`));
  }
  if (networkError) errorMessage(`[Network error]: ${networkError}`);
});

let uri;
let credentials;

if (process.env.NODE_ENV === 'production') {
  uri = 'https://superlua-deploy-graphql.herokuapp.com/graphql';
  credentials = 'same-origin';
} else {
  uri = 'http://localhost:3001/graphql';
  credentials = 'include';
}

const httpLink = new HttpLink({ uri, credentials });

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const Briefing = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Briefing />, document.getElementById('root'));
registerServiceWorker();
