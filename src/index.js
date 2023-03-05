import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-48z3zpuvj0gen27d.us.auth0.com"
    clientId="ShnCf03kU4NCfohzyLFT1idIEwdN2Sel"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <UserProvider>
      <ProductsProvider>
        <CartProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </CartProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>
);
