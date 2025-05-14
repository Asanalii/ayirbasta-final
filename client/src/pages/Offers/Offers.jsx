import React, { useEffect, useState } from "react";

import { barterOffers } from "../../assets/data/barterOffers";
import { AuthContext } from "context/AuthContext";
import BarterMenu from "../../components/BarterMenu/BarterMenu";
import Header from "../../components/Header";

import card from "../../assets/img/shoppingCartBig.svg";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import OffersStyled from "./Offers.styled";
import Offer from "components/Offer";

import apiClient from "api/apiClient";
const Profile = () => {
  const [offers, setOffers] = useState([]);

  const { contextData } = useContext(AuthContext);

  useEffect(() => {
    apiClient
      .get("/v1/users/items", {
        headers: {
          Authorization: `Bearer ${contextData.token}`,
        },
      })
      .then(({ data }) => {
        setOffers(data.items);
      });
  }, []);

  return (
    <>
      <Header />
      <OffersStyled>
        <BarterMenu linkActive="items" />
        <div className="offers">
          <div className="info">
            <h2>Active Offers</h2>
            <Link to={"/offers/add-offer"}>
              <button>ADD OFFER</button>
            </Link>
          </div>
          {offers.length !== 0 ? (
            <div className="cont">
              {offers.map((barter) => (
                <Offer
                  key={barter.id}
                  id={barter.id}
                  name={barter.name}
                  category={barter.category}
                  // address={barter.address}
                  // services={barter.serviceTrade}
                  image={barter.image}
                  status={barter.status}
                />
              ))}
            </div>
          ) : (
            <div className="empty">
              <img src={card} alt="" />
              <p>You still haven't added a product to exchange.</p>
              <div className="button">ADD OFFER</div>
            </div>
          )}
        </div>
      </OffersStyled>
    </>
  );
};

export default Profile;
