import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";

import hands from "assets/img/hands.png";
import Action from "components/Action/Action";
import RegistrationStyled from "./Registration.styled";
import apiClient from "api/apiClient";

function Registration() {
  const navigate = useNavigate();

  const { token, setToken } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    apiClient
      .post("/v1/users/sign-up", {
        firstname,
        lastname,
        email,
        password,
      })
      .then((response) => {
        if (response.status === 201) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (token) {
    navigate("/offers");
  }

  return (
    <RegistrationStyled>
      <div className="main-pic">
        <img alt="" src={hands} />
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <h1>Registration form</h1>
        <p>To continue using our platform, you need to register an account.</p>
        <div className="form__main-info">
          <p>Firstname</p>
          <input
            type="text"
            required
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>{" "}
        <div className="form__main-info">
          <p>Lastname</p>
          <input
            type="text"
            required
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="form__main-info">
          <p>Email</p>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form__main-info">
          <p>Password</p>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link>
          <span>Forgot password?</span>
        </Link>
        <Action action="REGISTRATION" nextAction="Login" width={"200px"} />
      </form>
    </RegistrationStyled>
  );
}

export default Registration;
