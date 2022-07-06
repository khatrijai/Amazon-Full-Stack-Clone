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
import { ToastProvider, useToasts } from "react-toast-notifications";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getDatabase, ref, child, get } from "firebase/database";

const stripePromise = loadStripe(
  "pk_test_51KJMLDSIc0aqDAg08SkhvidB8zJoTL7SwCGz1JaC4IQEMHn4RZ4QdHlfX0w3dTZ1IqoLPnaqyWZlFgn5GgI1pN7H000XQNyCQr"
);

function App() {
  const [{ basket, userEmail }, dispatch] = useStateValue();

  React.useEffect(() => {
    dispatch({
      type: "REFRESH",
      item: JSON.parse(localStorage.getItem("data")),
    });
  }, []);

  React.useEffect(() => {
    var auth = getAuth();
    var user = auth.currentUser;
    var uid = userEmail !== "Guest" ? user.uid : null;

    localStorage.setItem("data", JSON.stringify(basket));
    // if (user) {
    //   firebase.database().ref("/users/" + uid).set(basket);
    // } else {
    //
    // }
  }, [basket]);

  React.useEffect(() => {
    var auth = getAuth();
    

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `/users/${user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              dispatch({
                type: "USER_SIGN_IN",
                userInfo: user.email.split("@")[0],
                basket: snapshot.val()
              });
              
            } else {
              dispatch({
                type: "USER_SIGN_IN",
                userInfo: user.email.split("@")[0],
                basket: []
              });
              
            }
          })
          .catch((error) => {
            console.error(error);
          });

        localStorage.setItem(
          "userInfo",
          JSON.stringify(user.email.split("@")[0])
        );
        
        // ...
      } else {
        // User is signed out
        // ...
        dispatch({
          type: "USER_SIGN_OUT",
          basket: [],
          userInfo: "Guest",
        });
      }
    });
  }, []);

  return (
    <ToastProvider
      autoDismissTimeout={4000}
      autoDismiss={true}
      newestOnTop={true}
    >
      <Router>
        <>
          <Switch>
            <Route path="/payment">
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
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
