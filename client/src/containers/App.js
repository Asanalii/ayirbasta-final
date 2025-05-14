import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../scss/app.scss";

import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "../utils/PrivateRoute";

// Lazy load components
const Offers = lazy(() => import("../pages/Offers"));
const Login = lazy(() => import("../pages/Login"));
const Registration = lazy(() => import("../pages/Registration"));
const AddOffer = lazy(() => import("pages/AddOffer"));
const Chat = lazy(() => import("pages/Chat"));
const LikedItems = lazy(() => import("pages/LikedItems/LikedItems"));
const Products = lazy(() => import("pages/Products/Product"));
const Settings = lazy(() => import("pages/Settings/Settings"));
const BartersPageInfo = lazy(() =>
  import("pages/BartersPageInfo/BartersPageInfo")
);
const ProductPage = lazy(() => import("../pages/ProductPage"));
const BartersPage = lazy(() => import("pages/BartersPage"));
const EditProduct = lazy(() => import("pages/EditProduct"));

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route
                path="/items"
                element={
                  <PrivateRoute>
                    <Offers />
                  </PrivateRoute>
                }
              />
              <Route path="/liked-items" element={<LikedItems />} />
              <Route
                path="/offers/add-offer"
                element={
                  <PrivateRoute>
                    <AddOffer />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/chat"
                element={
                  <PrivateRoute>
                    <Chat />
                  </PrivateRoute>
                }
              />
              <Route path="/registration" element={<Registration />} />
              <Route path={`/product/:id`} element={<ProductPage />} />
              <Route path={`/product/edit/:id`} element={<EditProduct />} />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/trades/:id"
                element={
                  <PrivateRoute>
                    <BartersPageInfo />
                  </PrivateRoute>
                }
              />
              <Route
                path="/trades"
                element={
                  <PrivateRoute>
                    <BartersPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
