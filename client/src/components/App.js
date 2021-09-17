import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";

import { generateStore } from "@drizzle/store";
import { DrizzleProvider } from "@drizzle/react-plugin";
import { LoadingContainer } from "@drizzle/react-components";
// import { BrowserRouter as Router } from "react-router-dom";
import options from "./drizzleOptions";
import Home from "./Home";

// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import UploadProductPage from "./views/UploadProductPage/UploadProductPage.js";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage.js";
import CartPage from "./views/CartPage/CartPage.js";
import HistoryPage from "./views/HistoryPage/HistoryPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";

const store = {
  drizzleOptions: options,
};

const drizzleStore = generateStore(store);

// null   Anyone Can go inside
// true   only logged in user can go inside
// false  logged in user can't go inside

function App() {
  return (
    <DrizzleProvider options={options} store={drizzleStore}>
      <LoadingContainer>
        <Suspense fallback={<div>Loading...</div>}>
          <NavBar />
          <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
            <Switch>
              <Route exact path="/" component={Auth(LandingPage, null)} />
              <Route exact path="/login" component={Auth(LoginPage, false)} />
              <Route
                exact
                path="/register"
                component={Auth(RegisterPage, false)}
              />
              <Route
                exact
                path="/product/upload"
                component={Auth(UploadProductPage, true)}
              />
              <Route
                exact
                path="/product/:productId"
                component={Auth(DetailProductPage, null)}
              />
              <Route exact path="/user/cart" component={Auth(CartPage, true)} />
              <Route
                exact
                path="/history"
                component={Auth(HistoryPage, true)}
              />
            </Switch>
          </div>
          <Footer />
        </Suspense>
      </LoadingContainer>
    </DrizzleProvider>
  );
}

export default App;
