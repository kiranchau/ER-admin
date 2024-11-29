import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';
import "../App.scss";

function RoutesArray() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default RoutesArray;
