import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AuthTokenProvider } from './AuthTokenContext';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
const requestedScopes = [
  "profile",
  "email",
  "read:todoitem",
  "read:user",
  "edit:todoitem",
  "edit:user",
  "delete:todoitem",
  "delete:user",
  "write:user",
  "write:todoitem",
];

root.render(
  <Provider store={store}>
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    //redirectUri={window.location.origin}
    authorizationParams={{
      redirect_uri: `${window.location.origin}/verify-user`,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: requestedScopes.join(" "),
    }}
    >
      <AuthTokenProvider>
        <BrowserRouter>
        <App/>
        </BrowserRouter>
      </AuthTokenProvider>
    </Auth0Provider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
