import apiClient from "api/apiClient";
import { AuthContext } from "context/AuthContext";
import React, { useContext, useEffect, useState } from "react";

import OffersStyled from "./Offers.styled";

export const Barter = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState({});

  useEffect(() => {
    apiClient.get(`/product/${props.giveProductId}`).then((response) => {
      setOffers(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    !isLoading && (
      <OffersStyled>
        <div className="info">
          <div>
            <img src={props.pic} alt="" />
          </div>
          <div>
            <h3>{props.giveProductId}</h3>
            <p>{props.city}</p>
            <p>{props.category}</p>
          </div>
        </div>
        <div className="barter">
          <h3>Barter to:</h3>
          {/* {offers.map((barter) => (
          <p>{barter.name}</p>
        ))} */}
          <p>{offers.product.name}</p>
          <p>{offers.product.coinsTrade} coins</p>
        </div>
        {/* <div className="buttons">
        <button>ACCEPT</button>
      </div> */}
      </OffersStyled>
    )
  );
};

export default Barter;
