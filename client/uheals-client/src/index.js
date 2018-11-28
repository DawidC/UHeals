import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
//import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'
import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from './constants'
import 'bootstrap/dist/css/bootstrap.min.css';
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'


const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql'
  })

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    console.log(localStorage.getItem(AUTH_TOKEN))
    console.log('token',token);
    return {
      headers: {
        ...headers,
        //authorization: token ? `Bearer ${token}` : ''
        authorization: token ? `${token}` : ''
      }
    }
  })

  // const wsLink = new WebSocketLink({
  //   uri: `ws://localhost:3000`,
  //   options: {
  //     reconnect: true,
  //     connectionParams: {
  //       authToken: localStorage.getItem(AUTH_TOKEN),
  //     }
  //   }
  // })
  
  // const link = split(
  //   ({ query }) => {
  //     const { kind, operation } = getMainDefinition(query)
  //     return kind === 'OperationDefinition' && operation === 'subscription'
  //   },
  //   wsLink,
  //   authLink.concat(httpLink)
  // )
  
  // const client = new ApolloClient({
  //   link,
  //   cache: new InMemoryCache()
  // })

  const client = new ApolloClient({
//   link: httpLink,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(  
    <BrowserRouter>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root'));


   // registerServiceWorker()
serviceWorker.register();
