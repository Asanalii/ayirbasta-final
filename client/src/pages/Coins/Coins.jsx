import React from "react";

import BarterMenu from "../../components/BarterMenu/BarterMenu";
import Header from "../../components/Header";

import card from "../../assets/img/shoppingCartBig.svg";
import { Link, Navigate } from "react-router-dom";
import CoinsStyled from "./Coins.styled";

import arrows from "../../assets/img/swapCoins.svg";

const Profile = () => {
  return (
    <>
      <Header />
      <CoinsStyled>
        <BarterMenu linkActive="coins" />

        <div className="coins">
          <div className="action">
            <h3>Coins</h3>
            <div>
              <button>DEPOSIT</button>
              <button>WITHDRAW</button>
            </div>
          </div>
          <div className="info">
            <div>
              <div>
                <h3>Coins (1 Coin = 100 Euro)</h3>
                <div>
                  <h4>1500</h4>
                  <img src="" alt="" />
                </div>
              </div>
              <div>
                <h3>Euros (1 Euro = 0.01 coin)</h3>
                <div>
                  <h5>150000 </h5>
                  <img src="" alt="" />
                </div>
              </div>
            </div>
            <div className="change">
              <button>Coins</button>
              <div>
                <img src={arrows} alt="" />
              </div>
              <button>Euro</button>
            </div>
          </div>
        </div>
      </CoinsStyled>
    </>
  );
};

export default Profile;
