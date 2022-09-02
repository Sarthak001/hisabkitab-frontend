import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </RecoilRoot>

);

