import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App';

import axios from 'axios';


/*axios.interceptors.request.use((request) => {
  console.log(request);
  request.headers.channelName = '';
  return request;
});

axios.interceptors.request.use((request) => {
  console.log(request);
});*/

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);