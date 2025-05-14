import apiClient from "api/apiClient";
import React, { useEffect, useState } from "react";

import BarterStyled from "./Barter.styled";

import pic from "../../assets/img/02.png";

export const Offer = (props) => {
  const [myBarters, setMyBarters] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get(`/v1/items/${props.giveProductId}`).then((response) => {
      setMyBarters(response.data.item);
      setIsLoading(false);
    });
  }, []);

  return (
    props.status != "product deleted" &&
    !isLoading && (
      // <BarterStyled >
      <BarterStyled image={myBarters.image}>
        <h2></h2>
        <div className="image-cont"></div>
        <div className="info">
          <div className="barter-product">
            <h3>{myBarters.name}</h3>
            {/* <p>Category: {myBarters.product.category}</p> */}
            {/* <p>City: {props.city}</p> */}
          </div>
        </div>
      </BarterStyled>
    )
  );
};

export default Offer;
