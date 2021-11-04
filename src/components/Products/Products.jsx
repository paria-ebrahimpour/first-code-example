import React, { useContext, useEffect, useState } from "react";
import classes from "./Products.module.css";
import MealItem from "./MealItem/MealItem";
import SearchProduct from "./SearchProduct";
import { useHistory, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import LoadingSpinner from "./../UI/LoadingSpinner";
// import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SortIcon from "@mui/icons-material/Sort";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const [selectedCat, setSelectedCat] = useState("");
  const history = useHistory();
  const location = useLocation();

  const { search } = window.location;
  const query = new URLSearchParams(search).get("search");
  const [searchQuery, setSearchQuery] = useState(query || "");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://paria-1993-default-rtdb.firebaseio.com/foods.json"
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
          image: responseData[key].image,
          cat: responseData[key].cat.name,
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

  const cats = ["پاستا", "سوخاری", "پیش غذا", "ساندویچ", "پیتزا"];

  const selectCatHandler = (event) => {
    setSelectedCat(event.target.value);
  };

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

  const selectProducts = (products, selectedCat) => {
    if (!selectedCat) {
      return products;
    }
    return products.filter((p) => {
      return p.cat === selectedCat;
    });
  };

  const selectedProducts = selectProducts(products, selectedCat);

  let allProducts;

  // if (selectedCat) {
  //   allProducts = products.filter((m) => m.cat === cats);
  // } else {
  //   allProducts = products;
  // }

  const sortQuotes = (products, ascending) => {
    if (filteredProducts) {
      allProducts = filteredProducts;
    }else if(selectedProducts) {
      allProducts = selectedProducts;
      console.log("fdj");
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

  return (
    <section className={classes.meals}>
      <Grid container>
        <Grid item md={1}>
          <div onClick={changeSortingHandler}>
            {/* <SortByAlphaIcon  variant="inherit"/> */}
            {isSortingAscending ? (
              <SortIcon sx={{ transform: "scaleX(-1)" }} />
            ) : (
              <SortIcon sx={{ transform: "rotate(-180deg)" }} />
            )}
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
        {/* <Grid item md={3}>
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 100, bottom: 3 }}
          >
            <Select
              displayEmpty
              id="select-cat"
              onChange={selectCatHandler}
              value={selectedCat}
              label="select-cat"
              type="submit"
              placeholder="دسته بندی"
            >
              {cats.map((p) => (
                <MenuItem value={p} key={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}
      </Grid>
      <Grid
        container
        sx={{ marginBottom: "9%" }}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {sortedQuotes.map((p) => (
          <Grid item xs={12} sm={4} md={4}>
            <MealItem
              key={p.id}
              id={p.id}
              image={p.image}
              name={p.name}
              description={p.description}
              price={p.price}
              onShowExitCart={props.onShowExitCart}
              cat={p.cat}
            />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default Products;
