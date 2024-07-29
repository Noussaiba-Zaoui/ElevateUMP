import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './contexte/AuthProvider';
import { Routes, Route } from 'react-router-dom';
import reportWebVitals from "./reportWebVitals.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App/>} />
        </Routes>
      </AuthProvider>
   </BrowserRouter>

  </React.StrictMode>
);

reportWebVitals();
