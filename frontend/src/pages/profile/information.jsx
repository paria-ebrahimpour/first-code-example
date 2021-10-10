// import React, { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// // import { useHistory } from "react-router";
// import "./information.css";
// import { auth, db, logout } from "../../firebase";
// import { useHistory } from 'react-router-dom';

// function UserInformation() {
//   const [user, loading, error] = useAuthState(auth);
//   const [name, setName] = useState("");
//   const history = useHistory();
//   const fetchUserName = async () => {
//     try {
//       const query = await db
//         .collection("users")
//         .where("uid", "==", user?.uid)
//         .get();
//       const data = await query.docs[0].data();
//       setName(data.name);
//     } catch (err) {
//       console.error(err);
//       alert("An error occured while fetching user data");
//     }
//   };
//   useEffect(() => {
//     if (loading) return;
//     if (!user) return history.replace("/");
//     fetchUserName();
//   }, [user, loading]);
//   return (
//     <div className="dashboard">
//       <div className="dashboard__container">
//         Logged in as
//         <div>{name}</div>
//         <div>{user?.email}</div>
//         <button className="dashboard__btn" onClick={logout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }
// export default UserInformation;


// src/views/external-api.js

// import React, { useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";

// const UserInformation = () => {
//   const [message, setMessage] = useState("");
//   const serverUrl = process.env.REACT_APP_SERVER_URL;

//   const { getAccessTokenSilently } = useAuth0();

//   const callApi = async () => {
//     try {
//       const response = await fetch(`${serverUrl}/api/messages/public-message`);

//       const responseData = await response.json();

//       setMessage(responseData.message);
//     } catch (error) {
//       setMessage(error.message);
//     }
//   };

//   const callSecureApi = async () => {
//     try {
//       const token = await getAccessTokenSilently();

//       const response = await fetch(
//         `${serverUrl}/api/messages/protected-message`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const responseData = await response.json();

//       setMessage(responseData.message);
//     } catch (error) {
//       setMessage(error.message);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>External API</h1>
//       <p>
//         Use these buttons to call an external API. The protected API call has an
//         access token in its authorization header. The API server will validate
//         the access token using the Auth0 Audience value.
//       </p>
//       <div
//         className="btn-group mt-5"
//         role="group"
//         aria-label="External API Requests Examples"
//       >
//         <button type="button" className="btn btn-primary" onClick={callApi}>
//           Get Public Message
//         </button>
//         <button
//           type="button"
//           className="btn btn-primary"
//           onClick={callSecureApi}
//         >
//           Get Protected Message
//         </button>
//       </div>
//       {message && (
//         <div className="mt-5">
//           <h6 className="muted">Result</h6>
//           <div className="container-fluid">
//             <div className="row">
//               <code className="col-12 text-light bg-dark p-4">{message}</code>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserInformation;
