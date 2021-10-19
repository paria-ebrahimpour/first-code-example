import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  root: {
    justifyContent: "center",
  },
  palette: {
    primary: {
      main: "#f54748",
      dark: "#343f56",
    },
    secondary: {
      main: "#fb9300",
      dark: "#f5e6ca",
    },
    error: {
      main: "#343f56",
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
