import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import motcanhhoa from "~/assets/images/1canhhoa.jpeg";
import fallbackLogo from "~/assets/images/fallbackLogo.jpg";
import noImage from "~/assets/images/no-image.jpeg";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import theme from "~/Theme";
import { capitalizeFirstLetter } from "~/utils/formatter";
const MenuCss = {
  color: (theme) => theme._white,
  backgroundColor: "white",
  border: "none",
  paddingX: "5px",
  backgroundColor: "transparent",
  borderRadius: "4px",
  "& .MuiSvgIcon-root": {
    color: (theme) => theme._white,
  },
  "&:hover": {
    bgcolor: "primary.100",
  },
};
function BoardBar({ board }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme._boardbarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingX: 4,
        gap: 2,
        overflowX: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Chip
          icon={<DashboardIcon />}
          label={board.title}
          clickable
          sx={MenuCss}
        />
        <Chip
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
          sx={MenuCss}
        />
        <Chip
          icon={<AddToDriveIcon />}
          label="Add to google drive"
          clickable
          sx={MenuCss}
        />
        <Chip icon={<BoltIcon />} label="Automation" clickable sx={MenuCss} />
        <Chip
          icon={<FilterListIcon />}
          label="Automation"
          clickable
          sx={MenuCss}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          sx={{
            color: (theme) => theme._white,
            borderColor: (theme) => theme._white,
          }}
          startIcon={<PersonAddIcon />}
          variant="outlined"
          size="small"
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          total={24}
          sx={{
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              fontSize: 12,
              border: "none",
              cursor: "pointer",
              color: (theme) => theme._white,
              "&:first-of-type": { bgcolor: "#a4b0be" },
            },
            gap: "5px",
          }}
        >
          <Tooltip title="1canhhoa" arrow>
            <Avatar alt="1canhhoaa" src={motcanhhoa} />
          </Tooltip>
          <Tooltip title="tohien" arrow>
            <Avatar alt="tohien" src={fallbackLogo} />
          </Tooltip>
          <Tooltip title="1canhhoa" arrow>
            <Avatar alt="1canhhoaa" src={motcanhhoa} />
          </Tooltip>
          <Tooltip title="tohien" arrow>
            <Avatar alt="tohien" src={fallbackLogo} />
          </Tooltip>
          <Tooltip title="1canhhoa" arrow>
            <Avatar alt="1canhhoaa" src={motcanhhoa} />
          </Tooltip>
          <Tooltip title="tohien" arrow>
            <Avatar alt="tohien" src={fallbackLogo} />
          </Tooltip>
          {/* <Avatar >+3</Avatar> */}
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
