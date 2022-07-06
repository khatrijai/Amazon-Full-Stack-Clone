import React from "react";
import "./Product.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStateValue } from "../StateProvider";
import ReactStarRating from "react-star-ratings-component";
import CurrencyFormat from "react-currency-format";
import { ToastProvider, useToasts } from 'react-toast-notifications';



export default function Product({ id, title, image, price, rating }) {

  const { addToast } = useToasts();
  
  const [{ basket }, dispatch] = useStateValue();
  

  const addToBasket = (title) => {
    
    
    addToast(` ${title} has been successfully added to your cart`, { appearance: 'success' });
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product-effect">
    <div className="product">
      <div className="info-container">
        <p className="product-title">{title}</p>

        <CurrencyFormat
          decimalScale={2}
          value={price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₹"}
          renderText={(value) => <p className="product-price">{value}</p>}
        />

        <ReactStarRating
          numberOfStar={5}
          numberOfSelectedStar={parseInt(rating)}
          colorFilledStar="orange "
          colorEmptyStar="black"
          starSize="20px"
          spaceBetweenStar="10px"
          disableOnSelect={true}
          onSelectStar={(val) => {
            console.log(val);
          }}
        />

        {/* <p className="product-rating">{rating}</p> */}
      </div>
      <div className="image-container">
        <img src={image} className="product-image"></img>
      </div>
      <Button
        variant="warning"
        className="btn-add-to-basket"
        onClick={()=>addToBasket(title)}
      >
        Add to Basket
      </Button>
    </div>
    </div>
  );
}
