import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import BarterMenu from "components/BarterMenu";
import Header from "components/Header";
import MyBarter from "components/Barter";
import SecondBarter from "components/SecondBarter";
import apiClient from "api/apiClient";
import { AuthContext } from "context/AuthContext";
import swapIcon from "../../assets/img/swapBarter.svg";
import card from "../../assets/img/shoppingCartBig.svg";
import BartersPageStyled from "./BartersPage.styled";

function BartersPage() {
  const { contextData } = useContext(AuthContext);
  const [trades, setTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/v1/users/trades", {
        headers: {
          Authorization: `Bearer ${contextData.token}`,
        },
      })
      .then(({ data }) => {
        setTrades(data.trades || []); // Set trades or an empty array if no trades
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trades:", error);
        setIsLoading(false);
      });
  }, [contextData.token]);

  return (
    !isLoading && (
      <div>
        <Header />
        <BartersPageStyled>
          <BarterMenu linkActive="trades" />
          <div className="barters">
            <h3>Active Barters</h3>

            {trades.length > 0 ? (
              <div className="cont">
                {/* Waiting for Action */}
                <h4>
                  Trades which{" "}
                  <span style={{ color: "#001" }}>waiting for action</span>
                </h4>
                <div>
                  {trades
                    .filter((trade) => trade.status === "waiting_action")
                    .map((trade) => (
                      <div
                        style={{ backgroundColor: "#ffffff", width: "300px" }}
                        key={trade.id}
                      >
                        <MyBarter
                          key={trade.giver._id}
                          giveProductId={trade.giver.id}
                        />
                        <div className="swap">
                          <img
                            src={swapIcon}
                            alt="swap icon"
                            style={{ width: "40px" }}
                          />
                        </div>
                        <SecondBarter
                          key={trade.receiver._id}
                          wantProductId={trade.receiver.id}
                        />
                        <Link to={`/trades/${trade.id}`}>
                          <button>Barter info</button>
                        </Link>
                      </div>
                    ))}
                </div>

                {/* Accepted Trades */}
                <h4>
                  Trades which were{" "}
                  <span style={{ color: "#001" }}>accepted</span>
                </h4>
                <div>
                  {trades
                    .filter((trade) => trade.status === "confirmed_trade")
                    .map((trade) => (
                      <div
                        style={{ backgroundColor: "#ffffff", width: "300px" }}
                        key={trade.id}
                      >
                        <MyBarter
                          key={trade.giver._id}
                          giveProductId={trade.giver.id}
                        />
                        <div className="swap">
                          <img
                            src={swapIcon}
                            alt="swap icon"
                            style={{ width: "40px" }}
                          />
                        </div>
                        <SecondBarter
                          key={trade.receiver._id}
                          wantProductId={trade.receiver.id}
                        />
                        <Link to={`/trades/${trade.id}`}>
                          <button>Barter info</button>
                        </Link>
                      </div>
                    ))}
                </div>

                {/* Declined Trades */}
                <h4>
                  Trades which were{" "}
                  <span style={{ color: "#001" }}>declined</span>
                </h4>
                <div>
                  {trades
                    .filter((trade) => trade.status === "canceled_trade")
                    .map((trade) => (
                      <div
                        style={{ backgroundColor: "#ffffff", width: "300px" }}
                        key={trade.id}
                      >
                        <MyBarter
                          key={trade.giver._id}
                          giveProductId={trade.giver.id}
                        />
                        <div className="swap">
                          <img
                            src={swapIcon}
                            alt="swap icon"
                            style={{ width: "40px" }}
                          />
                        </div>
                        <SecondBarter
                          key={trade.receiver._id}
                          wantProductId={trade.receiver.id}
                        />
                        <Link to={`/trades/${trade.id}`}>
                          <button>Barter info</button>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="empty">
                <img src={card} alt="No items to exchange" />
                <p>You still haven't added an item to exchange.</p>
              </div>
            )}
          </div>
        </BartersPageStyled>
      </div>
    )
  );
}

export default BartersPage;
