import React from "react";

import SearchProduct from "../components/Products/SearchProduct";
import Products from "./../components/Products/Products";

const ProductList = (props) => {
  return (
    <React.Fragment>
      {/* <SearchProduct /> */}
      <Products onShowExitCart={props.onShowExitCart} />
    </React.Fragment>
  );
};

export default ProductList;
