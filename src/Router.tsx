import React from 'react';
import {
  BrowserRouter,
  Route
} from "react-router-dom";
import App from './App';
import Login from './components/login';
import UserProvider from './providers/userProvider';

function Router() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Route path="/" component={App} />
      <Route path="/login" component={Login} />
    </BrowserRouter>
    </UserProvider>
  );
}

export default Router;
