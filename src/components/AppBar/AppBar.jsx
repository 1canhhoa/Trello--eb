import Box from "@mui/material/Box";
import ModeSelect from "~/components/ModeSelect/ModeSelect";
import AppsIcon from "@mui/icons-material/Apps";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as TrelloIcon } from "~/assets/trello.svg";
import Typography from "@mui/material/Typography";
import Workspaces from "./Manu/Workspaces";
import Recents from "./Manu/Recents";
import Started from "./Manu/Started";
import Templates from "./Manu/Templates";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Profile from "./Manu/Profiles";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState, useRef } from "react";
import { red } from "@mui/material/colors";
import theme from "~/Theme";
function AppBar() {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef();
  const handleOnchange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleClose = (e) => {
    setSearchValue("");
    inputRef.current.focus();
  };
  return (
    <Box
      sx={{
        gap: 2,
        width: "100%",
        display: "flex",
        paddingX: "20px",
        overflowX: "auto",
        alignItems: "center",
        justifyContent: "space-between",
        height: (theme) => theme._headerbarHeight,
        backgroundColor: (theme) => theme.palette.primary,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2c3e50" : "#1565c0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {/* icon app */}
        <AppsIcon sx={{ color: (theme) => theme._white }} />
        {/* icon trello */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            sx={{ fontSize: "1.3rem", color: (theme) => theme._white }}
          />
          <Typography
            variant="span"
            sx={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: (theme) => theme._white,
            }}
          >
            Trello
          </Typography>
        </Box>
        {/* Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <Workspaces />
          <Recents />
          <Started />
          <Templates />
          <Button
            sx={{
              color: (theme) => theme._white,
            }}
            size="small"
            startIcon={<LibraryAddIcon />}
          >
            Create
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          inputRef={inputRef}
          id="outlined-search"
          label="Search field"
          type="text"
          size="small"
          value={searchValue}
          onChange={handleOnchange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{ color: (theme) => theme._white }}
                  fontSize="small"
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                <CloseIcon
                  onClick={handleClose}
                  fontSize="small"
                  sx={{
                    cursor: "pointer",
                    color: searchValue
                      ? (theme) => theme._white
                      : "transparent",
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: 120,
            maxWidth: 170,
          }}
        />
        <ModeSelect />
        <Tooltip arrow title="Notification">
          <Badge color="warning" variant="dot" sx={{ cursor: "pointer" }}>
            <NotificationsNoneIcon sx={{ color: (theme) => theme._white }} />
          </Badge>
        </Tooltip>
        <Tooltip arrow title="Help">
          <Badge
            color="secondary"
            variant=""
            sx={{ cursor: "pointer", color: (theme) => theme._white }}
          >
            <HelpOutlineIcon />
          </Badge>
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  );
}

export default AppBar;
