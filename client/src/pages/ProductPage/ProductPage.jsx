import React, { useEffect, useState } from "react";

import Header from "components/Header";
import Item from "components/Item/Item";
import Footer from "components/Footer";

import { barterOffers } from "assets/data/barterOffers";

import ProductOffers from "components/ProductOffers";

import { reviews } from "assets/data/reviews";
import Reviews from "components/Reviews";

import openIcon from "../../assets/img/open.svg";
import ProductStyled from "./Product.styled";
import apiClient from "api/apiClient";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import { useParams } from "react-router-dom";

function CardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [showAll, setShowAll] = React.useState(3);

  const { products } = useContext(AuthContext);

  const param = useParams();

  useEffect(() => {
    apiClient
      .get(`/v1/items/${param.id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    !isLoading && (
      <>
        <Header />
        <ProductStyled>
          <Item
            product={product.item}
            // product={barterOffers}
            // trades={product.trades}
            // rents={product.rents}
          />
          {/* {product.trades == null ? ( */}
          {true ? (
            ""
          ) : (
            <>
              {/* <h2>Offers ({1})</h2>
              <div className="cardOffers">
                {product.trades.map((trade) => (
                  <ProductOffers
                    key={product.trades.id}
                    pic={trade.pic}
                    name={trade.name}
                    category={trade.category}
                    giveProductId={trade.giveProductId}
                  />
                ))}
              </div> */}
            </>
          )}

          {/* <div className="cardOffers">
            {product.trades.map((trade) => (
              <ProductOffers
                key={product.trades.id}
                // pic={offer.pic}
                giveProductId={trade.giveProductId}
              />
            ))}
          </div> */}
          {/* <h2>Profile Reviews ({reviews.length})</h2> */}

          {/* <div className="reviews">
            {reviews.map((review, index) => (
              <Reviews
                key={review.id}
                pic={review.pic}
                name={review.name}
                city={review.address}
                text={review.text}
                date={review.date}
                stars={review.stars}
                index={index}
                show={showAll}
              />
            ))}
            <div className="reviews__btn">
              <p
                onClick={() => {
                  setShowAll(showAll + 3);
                }}
              >
                SHOW ALL {"                                "}
                <img src={openIcon} alt="openIcon" />
              </p>
            </div>
          </div> */}
        </ProductStyled>
        <Footer />
      </>
    )
  );
}

export default CardPage;
