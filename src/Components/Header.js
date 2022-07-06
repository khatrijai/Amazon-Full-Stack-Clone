import React from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import "./Header.css";
import { useStateValue } from "../StateProvider";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default function Header() {
  const [{ basket, userEmail }, dispatch] = useStateValue();
  var auth = getAuth();
  var user = auth.currentUser;

  function handleUser() {
    if (userEmail !== "Guest") {

      const db = getDatabase();
      set(ref(db, "users/" + user.uid), basket)
      signOut(auth);
    }
  }

  return (
    <div className="header">
      <Link to="/">
        <img src={logo} className="header-logo" />
      </Link>

      <div className="header-search">
        <input type="text" className="header-searchbar" />
        <SearchIcon className="search-icon" />
      </div>

      <div className="header-nav">
        <Link to="/login">
          <div className="header-subnav" onClick={handleUser}>
            <span>Hello {userEmail}</span>
            <h4>{userEmail !== "Guest" ? "Sign Out" : "Sign In"}</h4>
          </div>
        </Link>
        <div className="header-subnav">
          <span>Returns</span>
          <h4>& Orders</h4>
        </div>
        <div className="header-subnav">
          <span>Your</span>
          <h4>Prime</h4>
        </div>

        <Link to="/checkout">
          <div className="header-cart">
            <ShoppingBasketIcon
              fontSize="large"
              className="nav-shopping-basket"
            />
            <span className="nav-shopping-text">{basket.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
