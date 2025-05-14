import React from "react";

import BarterMenu from "components/BarterMenu";
import Header from "components/Header";

import profileImage from "../../assets/img/Profill.png";
import productImage from "../../assets/img/image.png";
import swapIcon from "../../assets/img/swapBarter.svg";
import BartersPageStyled from "./BartersPage.styled";
import card from "../../assets/img/shoppingCartBig.svg";

import { useEffect } from "react";
import apiClient from "api/apiClient";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import MyBarter from "components/Barter";
import { Link } from "react-router-dom";
import SecondBarter from "components/SecondBarter";

function BartersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { contextData } = useContext(AuthContext);
  const [tradesFromMe, setTradesFromMe] = useState([]);
  const [trades, SetTrades] = useState([]);
  const [tradesToMe, setTradesToMe] = useState([]);
  const [barters, setBarters] = useState([]);

  const [myBarters, setMyBarters] = useState([]);
  const [toMeBarters, setToMeBarters] = useState({});
  const [checkTrades, setCheckTrades] = useState(false);

  useEffect(() => {
    apiClient
      .get("/v1/users/trades", {
        headers: {
          Authorization: `Bearer ${contextData.token}`,
        },
      })
      .then(({ data }) => {
        var fromMe = [];
        var toMe = new Array();

        SetTrades(data.trade);
        for (let index = 0; index < data.trade.length; index++) {
          fromMe.push(data.trade[index].giver + `${data.trade[index]._id}`);
          toMe.push(data.trade[index].receiver);
        }

        setTradesFromMe(fromMe);
        setTradesToMe(toMe);

        setIsLoading(false);
      });
  }, []);

  return (
    !isLoading && (
      <div>
        <Header />
        <BartersPageStyled>
          <BarterMenu linkActive={"barters"} />
          <div className="barters">
            <h3>Active Barters</h3>

            {/* {false ? ( */}
            {tradesFromMe || tradesToMe ? (
              <div></div>
            ) : (
              <div className="empty">
                <img src={card} alt="" />
                <p>You still haven't added a product or service to exchange.</p>
              </div>
            )}

            {tradesFromMe && (
              <div className="cont">
                <h3>Trades from you</h3>
                <div>
                  {tradesFromMe
                    .filter((barter) => barter.status === "waiting_action")
                    .map((barter) => (
                      <div style={{ backgroundColor: "#ffffff" }}>
                        <MyBarter key={barter.id} giveProductId={barter.id} />
                        <button>Open</button>
                        <div className="swap">
                          <img
                            src={swapIcon}
                            alt=""
                            style={{ width: "40px" }}
                          />
                        </div>
                        <SecondBarter
                          key={barter.id}
                          wantProductId={barter.id}
                        />
                        <Link to={`/barters/${barter.id}`}>
                          <button>Barter info</button>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {tradesToMe && (
              <div className="cont">
                <h3>Trades to you</h3>
                <div>
                  {tradesToMe.map((barter) => (
                    <div style={{ backgroundColor: "#ffffff" }} key={barter.id}>
                      <MyBarter key={barter.id} giveProductId={barter.id} />
                      <button>Open</button>
                      <div className="swap">
                        <img src={swapIcon} alt="" style={{ width: "40px" }} />
                      </div>
                      <SecondBarter key={barter.id} wantProductId={barter.id} />
                      <Link to={`/trade/${barter.id}`}>
                        <button>Barter info</button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </BartersPageStyled>
      </div>
    )
  );
}

export default BartersPage;
