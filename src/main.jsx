import React from "react";
import ReactDOM from "react-dom/client";
import "./server/server.js"; //mock server API for testing
import App from "./App.jsx";
import "./styles/style.css";
import { BrowserRouter } from "react-router-dom";
import { AllDataprovider } from "./hooks/Data.jsx";
import { FilterProvider } from "./hooks/Filter.jsx";
import { CartDataProvider } from "./hooks/Cart.jsx";
import { AuthProvider } from "./hooks/Auth.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/**    !ALLDATA PROVIDER HOOK TO GET THE PRODUICT FROM BACKEND/MIRAJ JS */}
      <AuthProvider>
        <AllDataprovider>
          <FilterProvider>
            <CartDataProvider>
              <App />
            </CartDataProvider>
          </FilterProvider>
        </AllDataprovider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
