import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.jsx";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "./Theme";
import GlobalStyles from "@mui/material/GlobalStyles";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline>
        {/* <GlobalStyles styles={{ div: { color: "blue" } }} /> */}
        <App />
      </CssBaseline>
    </CssVarsProvider>
  </React.StrictMode>
);
