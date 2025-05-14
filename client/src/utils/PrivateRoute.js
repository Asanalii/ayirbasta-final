import { useContext, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { contextData } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!contextData.token) {
      navigate("/login");
    }
  }, [navigate]);

  return children;
}
