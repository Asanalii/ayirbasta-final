import React from "react";
import Header from "../../components/Header";
import ProductsAndService from "../../components/ProductsAndService/ProductsAndService";
import Footer from "../../components/Footer";

function Products() {
  return (
    <div className="Products">
      <Header />
      <ProductsAndService />
      <Footer />
    </div>
  );
}

export default Products;
