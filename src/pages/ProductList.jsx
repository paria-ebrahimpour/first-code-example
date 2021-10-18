import React from "react";

import Products from "./../components/Products/Products";

const ProductList = (props) => {
  return (
    <React.Fragment>
      <Products onShowExitCart={props.onShowExitCart} />
    </React.Fragment>
  );
};

export default ProductList;
