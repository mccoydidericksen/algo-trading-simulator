import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NavBar from './components/NavBar';
import History from './pages/History';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [userId, setUserId] = React.useState(localStorage.getItem('user_id'));
  console.log(userId)
  const [loggedIn, setLoggedIn] = React.useState(
    localStorage.getItem('id_token') ? true : false
  );
  return (
    <ApolloProvider client={client}>
      <div className="flex flex-col justify-center items-center">
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Home setUserId={setUserId} userId={userId} />}
            />
            <Route
              path="/login"
              element={
                <Login
                  setUserId={setUserId}
                  userId={userId}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                />
              }
            />
                        <Route
              path="/signup"
              element={
                <SignUp
                  setUserId={setUserId}
                  userId={userId}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                />
              }
            />
            <Route path="/history" element={<History userId={userId} />} />
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
