import {
  blue,
  cyan,
  deepOrange,
  green,
  orange,
  red,
  teal,
  yellow,
} from "@mui/material/colors";

import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
// Create a theme instance.
const theme = extendTheme({
  trello: {
    headerHeight: "48px",
    boardbarHeight: "99px",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: blue,
      },
    },
  },
  dark: {
    palette: {
      primary: {
        main: red[200],
      },
      secondary: yellow,
      Text: {
        primary: red,
      },
    },
  },
});

export default theme;
