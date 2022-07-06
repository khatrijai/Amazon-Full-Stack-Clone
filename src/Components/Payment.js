import React from "react";
import "./Payment.css";
import { useStateValue } from "../StateProvider";
import BasketItem from "./BasketItem";
import {Link} from "react-router-dom"
import { TransitionGroup } from "react-transition-group";
import {
    Elements,
    CardElement,
    useElements,
    useStripe
  } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";



export default function Payment() {






    function totalAmount() {
        let sum = 0;
        for (let i = 0; i < basket.length; i++) {
            
          sum = sum + parseFloat(basket[i].price);
        }
    
        return sum.toFixed(2);
      }


    const PaymentForm = () => {
        const stripe = useStripe();
        const elements = useElements();
      
        return (
          <>
            <CardElement />
            <CurrencyFormat
      decimalScale={2}
      value={totalAmount()}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"₹"}
      renderText={(value) => (
        <div>
            <p>
              <b>{value}</b>{" "}
            </p>
    
        </div>
      )}
    />

            <button onClick={handleSubmit(stripe, elements)}>Buy</button>
          </>
        );
      }



      const handleSubmit = (stripe, elements) => async () => {
        const cardElement = elements.getElement(CardElement);
      
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });
      
        if (error) {
          console.log('[error]', error);
        } else {
          console.log('[PaymentMethod]', paymentMethod);
           // ... POST: /api/charge/user  
        }
      };

    


  const [{ basket, userEmail }, dispatch] = useStateValue();

  const display = basket.map((item) => {
    return <BasketItem item={item} />;
  });

  return (
    <div class="payment-container">
      <header className="payment-header">

        <h2>Checkout (<Link className="no-of-items" to="./checkout">{basket.length} items</Link>) </h2>
      </header>
      <div className="payment-delivery-detail">
        <h5>Delivery Address</h5>
        <div className="payment-address-detail">
          <p>{userEmail}</p>
          <p>123Lane</p>
          <p>LosAngeles, California</p>
        </div>
      </div>
      <div className="payment-review-items">
        <h5>Review items and delivery</h5>
        <div className="payment-pdts">
        <TransitionGroup>
            {display}
            </TransitionGroup>
            </div>
      </div>
      <div className="payment-method">
      <h5>Payment Method</h5>
      <div>
      <PaymentForm/>
      </div>
      
      </div>
    </div>
  );
}
