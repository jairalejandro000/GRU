import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import axios from 'axios';

const DEBUG = process.env.REACT_APP_NODE_ENV !== 'production';
axios.interceptors.request.use((request) => {
  const token =  decodeURI(localStorage.getItem('token'));
  request.headers.common['Authorization']= `Bearer ${token}`
  return request;
},(error) => {
  if (error?.status?.code === 401) {
    localStorage.removeItem('token');
  } else if (error?.request?.status === 200) {
    //Aqui mostrar la alerta de que algo trono
   //dispatch your error in a more user friendly manner
     /*if (DEBUG) {
       //Aqui mostrar la alerta de que algo trono
      //easier debugging
      console.group('Error');
      console.log(error);
      console.groupEnd();
    }*/
 }
});
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);