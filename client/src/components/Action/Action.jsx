import React from "react";

import google from "assets/img/google.png";
import vk from "assets/img/vk.png";
import fb from "assets/img/facebook.png";
import ActionStyled from "./Action.styled";
import { Link, useNavigate } from "react-router-dom";

function Action({ action, nextAction, width }) {
  const navigate = useNavigate();

  return (
    <ActionStyled>
      <div className="action">
        <div
        // onClick={() => {
        //   Context._currentValue = !Context._currentValue;
        // }}
        >
          <button
            style={{ paddingLeft: width, paddingRight: width }}
            type="submit"
          >
            {action}
          </button>
        </div>

        <div className="action__info">
          {/* <p style={{ color: "#848484", fontFamily: "Montserrat" }}>OR</p>

          <div className="action__social">
            <img alt="" src={google} />
            <img alt="" src={vk} />
            <img alt="" src={fb} />
          </div> */}

          <p style={{ fontFamily: "Montserrat", fontWeight: "500" }}>
            {action == "REGISTRATION" ? (
              <> Do you have an account? </>
            ) : (
              <>Do you not have an account? </>
            )}
            <Link to={`/${nextAction}`}>
              <span>{nextAction}</span>
            </Link>
          </p>
        </div>
      </div>
    </ActionStyled>
  );
}

export default Action;
