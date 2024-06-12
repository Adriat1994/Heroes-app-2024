import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import HeoesApp from './HeoesApp';

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(  
  <React.StrictMode>
    <BrowserRouter>
      <HeoesApp />
    </BrowserRouter>
  </React.StrictMode>
)
