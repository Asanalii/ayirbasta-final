import React, { useContext } from "react";
import map_image from "../../assets/img/map-image.svg";
import icon_search from "../../assets/img/icon-search-normal.svg";
import icon_map from "../../assets/img/icon-map.svg";
import icon_document from "../../assets/img/icon-document.svg";
import Button from "components/Button/Button";
import Map from "components/Map/Map";
import { AuthContext } from "context/AuthContext";
import { useNavigate } from "react-router-dom";

const OffersNearby = () => {
  const { contextData } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="offers-nearby">
      {/* <div className="wrapper"> */}
      {/* <div className="offers-nearby-container"> */}
      {/*  */}
      <div className="offers-nearby-title">
        <p>Offers nearby</p>
      </div>

      <div className="map-and-block-container">
        <div className="map-pic-geo">{/* <Map /> */}</div>

        <div className="right-block">
          <div className="right-block-header">
            <p>Change goods and services, negotiate with people.</p>
          </div>

          <div className="right-block-filter-container">
            <div className="search-bar">
              <img src={icon_search} alt="icon_search" />
              <input type="text" placeholder="Search something here" />
            </div>

            <div className="selecting-button">
              <img src={icon_map} alt="icon_map" />
              <select>
                <option value="" disabled selected>
                  Choose city
                </option>
                {/* <option>New York</option>
                <option>Pavlodar</option>
                <option>Astana</option> */}
                <option value="All">All</option>
                <option value="Vienna">Vienna</option>
              </select>
            </div>

            <div className="selecting-button">
              <img src={icon_document} alt="icon_document" />
              <select>
                <option value="" disabled selected>
                  Choose category
                </option>
                {/* <option>Category 1</option>
                <option>Category 2</option>
                <option>Category 3</option> */}
                <option value="All">All</option>
                <option value="Cosmetics">Cosmetics</option>
                <option value="Services">Services</option>
                <option value="Electronic">Electronic</option>
                <option value="Work">Work</option>
                <option value="Transport">Transport</option>
                <option value="Repair">Repair</option>
              </select>
            </div>
          </div>

          <div className="right-block-or-title">
            <p>OR</p>
          </div>

          <div className="right-block-add-barter-button">
            <button
              style={{ background: "#16AB19", height: 44, width: 253 }}
              onClick={() => {
                contextData.token ? navigate("/offers") : navigate("/login");
              }}
            >
              OFFER BARTER
            </button>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
    // </div>
    // </div>
  );
};

export default OffersNearby;
