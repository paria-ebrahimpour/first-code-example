import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingSpinner = () => {
  return (
    <Box>
      <CircularProgress
        sx={{
          display: "center",
          margin: "auto",
        }}
        color="error"
      />
    </Box>
  );
};

export default LoadingSpinner;
