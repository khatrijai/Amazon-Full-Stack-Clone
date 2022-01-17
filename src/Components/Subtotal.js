import React from "react";
import "./Subtotal.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStateValue } from "../StateProvider";
import CurrencyFormat from "react-currency-format"
import {Link} from "react-router-dom"

export default function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();

  function totalAmount() {
    let sum = 0;
    for (let i = 0; i < basket.length; i++) {
        
      sum = sum + parseFloat(basket[i].price);
    }

    return sum.toFixed(2);
  }

  return (
    <CurrencyFormat
      decimalScale={2}
      value={totalAmount()}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"₹"}
      renderText={(value) => (
        <div>
          <>
            <p className="checkout-subtotal">
              Subtotal ({basket.length}): <b>{value}</b>{" "}
            </p>
            <input type="checkbox" className="checkout-checkbox"></input>
            <span> This order contains a gift</span>
            <Link to="/payment">
            <div>
              <Button variant="warning" className="btn-add-to-basket">
                Proceed to Checkout
              </Button>
            </div>
            </Link>
          </>
        </div>
      )}
    />
  );
}
