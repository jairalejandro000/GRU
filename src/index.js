import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { createBrowserHistory } from 'history';

import axios from 'axios';

const history = createBrowserHistory();
//const DEBUG = process.env.REACT_APP_NODE_ENV !== 'production';
axios.interceptors.request.use(request => {
  const token =  decodeURI(localStorage.getItem('token'));
  request.headers.common['Authorization']= `Bearer ${token}`;
  return request;
});

axios.interceptors.response.use(
  function(successRes) {
    return successRes;
  }, 
  function(error) {
    switch(error.response.status){
      case 401: 
        localStorage.clear();
        history.push('/auth/login')
      break;
      case 400:
        console.log(error);
      break;
      
      default:
        
      break;
    }
  }
);
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);