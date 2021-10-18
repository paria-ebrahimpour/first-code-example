// import React from "react";

// const CategoryPages = (props) => {
//   const match = useRouteMatch();
//   const params = useParams();

//   const { catName } = params;

//   const {
//     sendRequest,
//     status,
//     data: loadedQuote,
//     error,
//   } = useHttp(getSingleQuote, true);

//   useEffect(() => {
//     sendRequest(mealId);
//   }, [sendRequest, mealId]);

//   if (status === "pending") {
//     return (
//       <div className="centered">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   if (error) {
//     return <p className="centered">{error}</p>;
//   }

//   if (!loadedQuote.name) {
//     return <p>غذا یافت نشد</p>;
//   }
//   return (
//     <React.Fragment>
//       <h2>{props.cat.name}</h2>
//     </React.Fragment>
//   );
// };

// export default CategoryPages;
