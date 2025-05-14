import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// import Cookies from "js-cookie";

import hands from "assets/img/hands.png";
import Action from "components/Action/Action";

import LoginStyled from "./Login.styled";

import { AuthContext } from "../../context/AuthContext";

import apiClient from "api/apiClient";

export default function Login() {
  const { contextData } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (contextData.token) {
    navigate("/");
    return "";
  }

  // React.useEffect(() => {
  //   fetch("http://localhost:4000/v1/items").then((response) => {
  //     console.log(response);
  //   });
  // }, []);

  const enter = (e) => {
    e.preventDefault();

    apiClient
      .post("v1/users/sign-in", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);

        contextData.setToken(response.data.token);

        navigate("/items");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <LoginStyled>
      <div className="main-pic">
        <img alt="" src={hands} />
      </div>

      <form className="form" onSubmit={enter}>
        <h1>Login</h1>
        <p>To continue using our platform, you need to login an account.</p>

        <div className="form__main">
          <div className="form__main-info">
            <p>Email</p>
            <input
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="form__main-info">
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <span>Forgot password?</span>

        <Action nextAction="Registration" action="LOGIN" width={"248px"} />
      </form>
    </LoginStyled>
  );
}
