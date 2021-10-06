import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2a9d8f",
      dark: "#264653",
    },
    secomdary: {
      main: "#f4a261",
      dark: "#e9c46a",
    },
    error: {
      main: "#e76f51",
    },
  },
  typography: {
    fontFamily: ` "Vazir", Arial, sans-serif`,
    fontSize: 12.5,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    // button: {}
  },
});
export default theme;
