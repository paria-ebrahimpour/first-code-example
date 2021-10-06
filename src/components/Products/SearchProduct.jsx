import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ListGroup from "../common/listgroup";
// import _ from "lodash";

// const SearchProduct = ({ value, onChange }) => {
//   state = {
//     movies: [],
//     genres: [],
//     searchQuery: "",
//     selectedGenre: null,
//     sortColumn: { path: "title", order: "asc" },
//   };

//   genreSelectHandler = (genre) => {
//     setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
//   };

//   searchHandler = (query) => {
//     setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
//   };

//   sortHandler = (sortColumn) => {
//     setState({ sortColumn });
//   };

//   getPagedData = () => {
//     const { sortColumn, selectedGenre, searchQuery, movies: allMovies } = state;

//     let filtered = allMovies;
//     if (searchQuery)
//       filtered = allMovies.filter((m) =>
//         m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
//       );
//     else if (selectedGenre && selectedGenre._id)
//       filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

//     const movies = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

//     // const movies = paginate(sorted, currentPage, pageSize);

//     return { totalCount: filtered.length, data: movies };
//   };

//   const { length: count } = state.movies;
//   const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

//   if (count === 0) return <p>there are no movies in the database</p>;

// const { totalCount, data: movies } = getPagedData();
// return (
//   <div>
// {
/* <ListGroup
      items={genres}
      selectedItem={selectedGenre}
      onItemSelect={genreSelectHandler}
      /> */
// }
// <input
//   type="text"
//   name="query"
//   className="form-control my-3"
//   placeholder="Search..."
//   // value={searchQuery}
//   // onChange={searchHandler}
// />
// {
/* <Products
      products={products}
      sortColumn={sortColumn}
      onSort={sortHandler}
      /> */
// }
//     </div>
//   );
// };

//   );
// };

// export default SearchProduct;

const SearchProduct = ({ searchQuery, setSearchQuery }) => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  return (
    <Search method="get">
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        name="search"
        id="productSearch"
        placeholder="جست و جو ..."
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default SearchProduct;
