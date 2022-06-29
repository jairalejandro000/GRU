import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import App from './App';
import { alertService } from './_services/alert.service';

import axios from 'axios';

const DEBUG = process.env.REACT_APP_NODE_ENV !== 'production';

axios.interceptors.request.use((request) => {
  request.headers.token = localStorage.getItem('token');;
  return request;
},(error) => {
  console.log(error);
  if (error?.status?.code === 401) {
    const navigate = useNavigate();
    localStorage.removeItem('token');
    navigate('/home');
  } else if (error?.status?.code === 200) {
    alertService.info('Revisa tu información',{ autoClose: true, keepAfterRouteChange: true });
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