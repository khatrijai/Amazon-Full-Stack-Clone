import "./App.css";
import Home from "./Components/Home";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Checkout from "./Components/Checkout";
import Payment from "./Components/Payment";
import { useStateValue } from "./StateProvider";
import Login from "./Components/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastProvider, useToasts } from 'react-toast-notifications';

function App() {
  const [{ basket }, dispatch] = useStateValue();

  React.useEffect(() => {
    dispatch({
      type: "REFRESH",
      item: JSON.parse(localStorage.getItem("data")),
    });
  }, []);

  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(basket));
  }, [basket]);

  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: "USER_SIGN_IN",
          userInfo: user.email.split("@")[0],
        });
        // ...
      } else {
        // User is signed out
        // ...
        dispatch({
          type: "USER_SIGN_OUT",
          userInfo: "Guest",
        });
      }
    });
  }, []);

  return (
    <ToastProvider autoDismissTimeout ={4000} autoDismiss={true} newestOnTop={true}>
    <Router>
      <>
        <Switch>
          <Route path="/payment">
            <Payment />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </>
    
    </Router>
    </ToastProvider>
  );
}

export default App;
