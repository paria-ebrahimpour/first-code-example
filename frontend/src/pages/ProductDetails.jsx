import React, { useEffect, useState } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Comments from "./../components/comments/Comments";
import { Button } from "@mui/material/";
import ProductPage from "../components/Products/ProductPage";
import useHttp2 from "../hooks/use-http-cm-pd";
import { getSingleQuote } from "../lib/api";
import MealItemForm from './../components/Products/MealItem/MealItemForm';

const ProductDetails = (props) => {
  const match = useRouteMatch();
  const params = useParams();

  const { mealId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp2(getSingleQuote, true);

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
  // const [product, setProduct] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [httpError, setHttpError] = useState(false);
  // const match = useRouteMatch();
  // const params = useParams();

  // const { mealId } = params;
  // // mealId= props.match.params.mealId

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const response = await fetch(
  //       `https://first-pwa-4cb00-default-rtdb.firebaseio.com/foods/${params}.json`
  //     );

  //     if (!response.ok) {
  //       throw new Error("Something went wrong!");
  //     }
  //     const loadedProduct = [];
  //     // if (params === response.id) {
  //       const responseData = await response.json();
  //     // if (params === response.id) {
  //       for (const key in responseData) {
  //         loadedProduct.push({
  //           id: key,
  //           name: responseData[key].name,
  //           description: responseData[key].description,
  //           price: responseData[key].price,
  //           image: responseData[key].image,
  //         });
  //       }
  //       setProduct(loadedProduct);
  //       setIsLoading(false);
  //     // }
  //   };

  //   fetchProduct().catch((error) => {
  //     setIsLoading(false);
  //     setHttpError(error.message);
  //   });
  // }, [mealId]);

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }
  // if (httpError) {
  //   <section>
  //     <p>{httpError}</p>
  //   </section>;
  // }

  console.log(loadedQuote);

  return (
    <div>
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
        <Button href={`${match.url}/comments`}>
          نمایش نظرات کاربران
        </Button>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </div>
  );
};

export default ProductDetails;
