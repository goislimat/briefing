import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

let uri;
let credentials;

if (process.env.NODE_ENV === 'production') {
  uri = 'https://superlua-deploy-graphql.herokuapp.com/graphql';
  credentials = 'same-origin';
} else {
  uri = 'http://localhost:3001/graphql';
  credentials = 'include';
}

const client = new ApolloClient({
  link: new HttpLink({ uri, credentials }),
  cache: new InMemoryCache(),
});

const Briefing = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Briefing />, document.getElementById('root'));
registerServiceWorker();
