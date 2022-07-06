import React from "react";
import { useStateValue } from "../StateProvider";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BasketItem.css";
import ReactStarRating from "react-star-ratings-component";
import CurrencyFormat from "react-currency-format";
import Collapse from "@mui/material/Collapse";

export default function BasketItem({ item }) {
  const [state, setState] = React.useState(true);
  const [{ basket }, dispatch] = useStateValue();

  function RemoveFromBasket(id) {
    console.log(basket);
    setState(false);
    dispatch({
      type: "REMOVE_FROM_BASKET",
      item: id,
    });
    
  }

  return (
    <>
      <Collapse in={state}>
        <div className="basket-pdt">
          <div className="basket-image">
            <img src={item.image} />
          </div>
          <div className="basket-pdtinfo">
            <h3>{item.title}</h3>

            <CurrencyFormat
              decimalScale={2}
              value={item.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₹"}
              renderText={(value) => (
                <p className="product-price">
                  <h3>{value}</h3>
                </p>
              )}
            />

            <ReactStarRating
              numberOfStar={5}
              numberOfSelectedStar={parseInt(item.rating)}
              colorFilledStar="orange "
              colorEmptyStar="black"
              starSize="20px"
              spaceBetweenStar="10px"
              disableOnSelect={true}
              onSelectStar={(val) => {
                console.log(val);
              }}
            />
            <Button
              variant="warning"
              className="btn-add-to-basket"
              onClick={() => RemoveFromBasket(item.id)}
            >
              Remove from Basket
            </Button>
          </div>
        </div>
      </Collapse>
    </>
  );
}
