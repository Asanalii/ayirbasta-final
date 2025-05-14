import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/img/logo.svg";
import heart from "../../assets/img/heart.svg";
import bell from "../../assets/img/bell.svg";
import pic from "../../assets/img/person.png";
import camera from "../../assets/img/login.png";

import HeaderStyle from "./Header.styled";
import { AuthContext } from "context/AuthContext";

import apiClient from "api/apiClient";

function Header({ activePage }) {
  const { contextData } = useContext(AuthContext);

  return (
    <HeaderStyle>
      <div className="header">
        <div className="wrapper">
          <div className="container">
            <div className="header__logo">
              <Link to={"/"}>
                {/* <img src={logo} alt="" /> */}
                <h4>Ayirbasta</h4>
              </Link>
            </div>

            <div className="header__page">
              <ul>
                <Link to={"/"}>
                  <li
                    className={`${activePage == "chat" ? "" : "active-page"}`}
                  >
                    Main Page
                  </li>
                </Link>
                {/* <Link to={"/chat"}>
                  <li
                    className={`${activePage == "chat" ? "active-page" : ""}`}
                  >
                    Chat
                  </li>
                </Link> */}
              </ul>
            </div>

            <div className="header__action">
              <div className="button">
                <Link
                  to="/liked-items"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img src={heart} alt="" />
                </Link>
              </div>
              {/* <div className="button">
                <img src={bell} alt="" />
              </div>{" "} */}
              {contextData.token ? (
                <div className="button">
                  {
                    <Link to={"/trades"}>
                      <img src={camera} alt="" />
                    </Link>
                  }
                </div>
              ) : (
                <button>
                  <Link to={"/login"}>LOGIN</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </HeaderStyle>
  );
}

export default Header;
