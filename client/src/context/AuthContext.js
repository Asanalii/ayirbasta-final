import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "api/apiClient";
import ProductsStore from "store/ProductsStore";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  // const updateTokens = async () => {
  //   // await apiClient
  //   //   .post("/auth/token/refresh/", {
  //   //     refresh: tokens.refresh,
  //   //   })
  //   //   .then((response) => {
  //   //     const role = jwtDecode(response.data.access).role;

  //   //     setTokens({
  //   //       access: response.data.access,
  //   //       refresh: response.data.refresh,
  //   //     });

  //   //     localStorage.setItem(
  //   //       "tokens",
  //   //       JSON.stringify({
  //   //         access: response.data.access,
  //   //         refresh: response.data.refresh,
  //   //         role: role,
  //   //       })
  //   //     );
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error(error);

  //   //     setTokens(null);

  //   navigate("/login");
  //   setTokens(null);
  // };

  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     updateTokens();
  //   }, 1000 * 60 * 15);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [tokens, navigate]);

  const contextData = useMemo(() => ({ token, setToken }), [token, setToken]);

  return (
    <AuthContext.Provider
      value={{ contextData: contextData, products: new ProductsStore() }}
    >
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
};
