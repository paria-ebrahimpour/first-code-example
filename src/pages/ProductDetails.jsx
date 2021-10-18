import React, { useEffect, useState } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Comments from "./../components/comments/Comments";
import { Button } from "@mui/material/";
import ProductPage from "../components/Products/ProductPage";
import { getSingleQuote } from "../lib/api";
import MealItemForm from "./../components/Products/MealItem/MealItemForm";
import useHttp from "./../hooks/use-http";
import BreadCrumbs from "./../components/Breadcrumbs";

const ProductDetails = (props) => {
  const match = useRouteMatch();
  const params = useParams();

  const { mealId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(mealId);
  }, [sendRequest, mealId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.name) {
    return <p>غذا یافت نشد</p>;
  }

  return (
    <div>
      <BreadCrumbs name={loadedQuote.name} cat={loadedQuote.cat.name} />
      <ProductPage
        key={loadedQuote.id}
        id={loadedQuote.id}
        image={loadedQuote.image}
        name={loadedQuote.name}
        description={loadedQuote.description}
        price={loadedQuote.price}
        onShowExitCart={props.onShowExitCart}
      />
      <Route path={match.path} exact>
        <Button href={`${match.url}/comments`}>نمایش نظرات کاربران</Button>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </div>
  );
};

export default ProductDetails;
