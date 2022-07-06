import React from "react";
import "./Checkout.css";
import banner from "../images/bannerr.jpg";
import banner2 from "../images/bannerr2.jpg";
import banner3 from "../images/bannerr3.jpg";

import "bootstrap/dist/css/bootstrap.min.css";
import Subtotal from "./Subtotal";
import BasketItem from "./BasketItem";
import { TransitionGroup } from "react-transition-group";
import { useStateValue } from "../StateProvider";
import Carousel from "react-bootstrap/Carousel";

export default function Checkout() {
  const [{ basket }, dispatch] = useStateValue();

  const display = basket.map((item) => {
    return <BasketItem item={item} />;
  });

  return (
    <div className="checkout">
      <div className="checkout-container-left">
        <Carousel fade>
          <Carousel.Item>
            <div className="checkout-banner">
              <img src={banner} className="checkout-banner-img"></img>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="checkout-banner">
              <img src={banner2} className="checkout-banner-img"></img>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="checkout-banner">
              <img src={banner3} className="checkout-banner-img"></img>
            </div>
          </Carousel.Item>
        </Carousel>

        <h1>Your Shopping Basket</h1>
        <TransitionGroup>{display}</TransitionGroup>
      </div>
      <div className="checkout-container-right">
        <Subtotal />
      </div>
    </div>
  );
}
