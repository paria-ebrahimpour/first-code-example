import React, { useEffect, useState } from "react";
// import Card from "../UI/Card";

import classes from "./Products.module.css";
import MealItem from "./MealItem/MealItem";
import SearchProduct from "./SearchProduct";
// import { Button } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import LoadingSpinner from "./../UI/LoadingSpinner";
// import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SortIcon from '@mui/icons-material/Sort';
// import { Card } from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const { search } = window.location;
  const query = new URLSearchParams(search).get("search");
  const [searchQuery, setSearchQuery] = useState(query || "");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://first-pwa-4cb00-default-rtdb.firebaseio.com//foods.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedProducts = [];

      for (const key in responseData) {
        loadedProducts.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          image:responseData[key].image
        });
      }

      setProducts(loadedProducts);
      setIsLoading(false);
    };

    fetchProducts().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (httpError) {
    <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>;
  }

  const filterProducts = (products, query) => {
    if (!query) {
      return products;
    }
    return products.filter((p) => {
      return p.name.includes(query);
    });
  };

  const filteredProducts = filterProducts(products, searchQuery);

  let allProducts;
  const sortQuotes = (products, ascending) => {
    if (filteredProducts) {
      allProducts = filteredProducts;
    } else {
      allProducts = products;
    }
    return allProducts.sort((pA, pB) => {
      if (ascending) {
        return pA.price > pB.price ? 1 : -1;
      } else {
        return pA.price < pB.price ? 1 : -1;
      }
    });
  };

  const productParams = new URLSearchParams(location.search);

  const isSortingAscending = productParams.get("sort") === "asc";

  const sortedQuotes = sortQuotes(products, isSortingAscending);

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
  };

  const productsList = (
    // <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  sortedQuotes.map((p) => (
      <MealItem
      key={p.id}
      id={p.id}
      image={p.image}
      name={p.name}
      description={p.description}
      price={p.price}
      image={p.image}
    />   
  ))
  // </Grid>)
  )

  return (
    <section className={classes.meals}>
      <Grid container >
      <Grid item  md={1}>
        <div  onClick={changeSortingHandler}>
          {/* <SortByAlphaIcon  variant="inherit"/> */}
          {isSortingAscending 
          ?  <SortIcon sx={{ transform: "scaleX(-1)" }}/>
          :  <SortIcon sx={{ transform: "rotate(-180deg)"}}/>
          }
        
        </div>
          {/* <Button variant="outlined" onClick={changeSortingHandler}>
            مرتب سازی بر اساس{" "}
            {isSortingAscending ? "بیشترین قیمت" : "کمترین قیمت"}
          </Button> */}
        </Grid>
        <Grid item md={8}>
          <SearchProduct
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ marginBottom: "9%"}} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
     { sortedQuotes.map((p) => (
      <Grid item xs={12} sm={4} md={4}>
      <MealItem
      key={p.id}
      id={p.id}
      image={p.image}
      name={p.name}
      description={p.description}
      price={p.price}
      image={p.image}
    />  
    </Grid> 
  ))}
    </Grid>
    </section>
  );
};

export default Products;
