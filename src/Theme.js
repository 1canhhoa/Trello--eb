import {
  cyan,
  deepOrange,
  deepPurple,
  orange,
  red,
  teal,
  yellow,
} from "@mui/material/colors";

import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

// TRELLO
const BOARD_BAR_HEIGHT = "58px";
const HEADER_BAR_HEIGHT = "58px";
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${BOARD_BAR_HEIGHT}  - ${HEADER_BAR_HEIGHT})`;
// COLUMN
const HEADER_COLUMN_HEIGHT = "50px";
const FOOTER_COLUMN_HEIGHT = "50px";
const LIST_CARD_HEIGHT = `calc(${BOARD_CONTENT_HEIGHT}
    - 60px
    - ${HEADER_COLUMN_HEIGHT}
    - ${FOOTER_COLUMN_HEIGHT})`;
const theme = extendTheme({
  _white: "white",
  // TRELLO
  _headerbarHeight: HEADER_BAR_HEIGHT,
  _boardbarHeight: BOARD_BAR_HEIGHT,
  _boardcontentHeight: BOARD_CONTENT_HEIGHT,
  // COLUMN
  _headerColumnHeight: HEADER_COLUMN_HEIGHT,
  _footerColumnHeight: FOOTER_COLUMN_HEIGHT,
  _listcardHeight: LIST_CARD_HEIGHT,
  colorSchemes: {
    // light: {
    //   palette: {
    //     primary: teal,
    //     secondary: deepOrange,
    //   },
    // },
    // dark: {
    //   palette: {
    //     // primary: cyan,
    //     // secondary: orange,
    //   },
    // },
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": { padding: 12 },
          // overflowY: "auto",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#dcdde1",
            // backgroundColor: "red",
            borderRadius: "8px",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: (theme) => theme._white,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: "36px",
          color: theme._white, //color text
          fontSize: "0.875rem",
          // màu border ban đầu
          fieldset: {
            borderColor: theme._white,
          },
          "&.MuiOutlinedInput-root": {
            // khi hover vẫn giữ màu ban đầu và thêm borderWidth
            "&:hover fieldset": {
              borderColor: theme._white,
              borderWidth: "1.5px !important",
            },
            // khi bỏ hover  vẫn giữ màu
            "&.Mui-focused fieldset": {
              borderColor: theme._white,
            },
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme._white,
          fontSize: "0.875rem",
          "&.Mui-focused": {
            color: theme._white,
          },
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.MuiTypography-body1": {
            fontSize: "0.875rem",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: 0,
          color: theme.palette.primary,
          borderColor: theme._white,
          borderWidth: "0.5px",
          textTransform: "none",
          "&:hover": { borderColor: theme._white, borderWidth: "1px" },
        }),
      },
    },
  },
});

export default theme;
