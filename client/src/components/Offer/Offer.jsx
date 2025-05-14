import apiClient from "api/apiClient";
import { AuthContext } from "context/AuthContext";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

// import { BarterOffers as offers } from "../../assets/data/BarterOffers";
import BarterStyled from "./Offer.styled";

export const Offer = (props) => {
  const { contextData } = useContext(AuthContext);
  const image = props.image;

  const handleDelete = async (e) => {
    e.preventDefault();

    apiClient
      .delete(`/v1/items/${props.id}`, {
        headers: {
          Authorization: `Bearer ${contextData.token}`,
        },
      })
      .then(() => {
        window.location.reload();
      });
  };

  const encodedImage = image
    ? encodeURI(`http://localhost:8080${image}`)
    : null;

  return (
    props.status != "product deleted" && (
      <BarterStyled>
        <div>
          <div
            className="image-cont"
            style={{
              backgroundImage: encodedImage ? `url(${encodedImage})` : "none",
            }}
          ></div>
        </div>
        <div className="info">
          <div>
            <h3>{props.name}</h3>
            <p>Category: {props.category}</p>
            {/* <p>Address: Vienna, {props.address}</p> */}
            {/* <p>Address: {props.address}</p> */}
          </div>
          <div>
            <h3>Trade:</h3>
            {props.onRent ? (
              <div>
                <p>Services: {props.services}</p>
                <p>Products: {props.products}</p>
                <p>Coins: {props.coins}</p>
              </div>
            ) : (
              ""
            )}
          </div>

          <Link to={`/product/edit/${props.id}`}>
            <button>Edit Card</button>
          </Link>
          <button
            style={{ backgroundColor: "red", padding: "13px 80px" }}
            onClick={handleDelete}
          >
            Delete card
          </button>
        </div>
      </BarterStyled>
    )
  );
};

export default Offer;
