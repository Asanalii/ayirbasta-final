import React from "react";
import { Link } from "react-router-dom";

import FooterStyled from "./Footer.styled";

import logo from "../../assets/img/LogoWhite.svg";
import facebook from "../../assets/img/facebook.svg";
import twitter from "../../assets/img/twitter.svg";
import instagram from "../../assets/img/instagram.svg";

const Footer = () => {
  return (
    <FooterStyled>
      <div className="container">
        <div className="footer">
          <div className="offer">
            <div className="logo">
              <Link to={"#"}>
                {/* <img src={logo} alt="" /> */}
                <h4>Ayirbasta</h4>
              </Link>
            </div>
            <div className="offer-btn">
              <p>Ready to get started?</p>
              <button>OFFER BARTER</button>
            </div>
          </div>
          <hr />
          <div className="usefull">
            <div className="files">
              <a href="#" className="terms">
                Terms & Conditions
              </a>
              <a href="#" className="policy">
                Privacy Policy
              </a>
            </div>
            <div className="social">
              <a href="">
                <img src={facebook} alt="facebook" />
              </a>
              <a href="">
                <img src={twitter} alt="twitter" />
              </a>
              <a href="">
                <img src={instagram} alt="instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </FooterStyled>
  );
};

export default Footer;
