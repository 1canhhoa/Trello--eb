import { useState } from "react";
import Box from "@mui/material/Box";
import ListCard from "./ListCards/ListCard";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Cloud from "@mui/icons-material/Cloud";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddCardIcon from "@mui/icons-material/AddCard";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentPaste from "@mui/icons-material/ContentPaste";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { MapOrder } from "~/utils/sort";
// dnd kit
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
function Column({ column }) {
  // dnd kit
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column._id, data: { ...column } });

  const dndkitColumnStyles = {
    // touchAction: "none",//dành cho sensor default dạng poiter sensor
    transform: CSS.Translate.toString(transform),
    transition,
  };
  // menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // ordercard
  const oderedCards = MapOrder(column?.cards, column?.cardOrderIds, "_id");
  return (
    <Box
      ref={setNodeRef}
      style={dndkitColumnStyles}
      {...attributes}
      {...listeners}
      sx={{
        ml: 2,
        minWidth: "250px",
        maxWidth: "300px",
        borderRadius: "6px",
        height: "fit-content",
        maxHeight: (theme) =>
          `calc(${theme._boardcontentHeight} - ${theme.spacing(5)})`,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
      }}
    >
      {/* <ListCard /> */}
      {/* HEADER_CARD */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          height: (theme) => theme._headerColumnHeight,
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "0.9rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {column.title}
        </Typography>
        <Box>
          <Tooltip title="more">
            <ExpandMoreIcon
              aria-haspopup="true"
              onClick={handleClick}
              id="basic-column-dropdown"
              sx={{ cursor: "pointer", color: "text.primary" }}
              aria-expanded={open ? "true" : undefined}
              aria-controls={open ? "basic-menu-column-dropdown" : undefined}
            />
          </Tooltip>
          <Menu
            id="basic-menu-workspace"
            aria-labelledby="basic-button-workspaces"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <AddCardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add new card</ListItemText>
              <Typography variant="body2" color="text.secondary">
                ⌘X
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCut fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cut</ListItemText>
              <Typography variant="body2" color="text.secondary">
                ⌘X
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCopy fontSize="small" />
              </ListItemIcon>
              <ListItemText>Copy</ListItemText>
              <Typography variant="body2" color="text.secondary">
                ⌘C
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentPaste fontSize="small" />
              </ListItemIcon>
              <ListItemText>Paste</ListItemText>
              <Typography variant="body2" color="text.secondary">
                ⌘V
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <DeleteForeverIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove this column</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Cloud fontSize="small" />
              </ListItemIcon>
              <ListItemText>Archive this column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      {/* LIST_CARD */}
      <ListCard cards={oderedCards} />
      {/* FOOTER_CARD */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: (theme) => theme._footerColumnHeight,
        }}
      >
        <Button sx={{ color: "text.primary" }} startIcon={<AddCardIcon />}>
          Add new card
        </Button>
        <Tooltip title="Drag item">
          <DragHandleIcon />
        </Tooltip>
      </Box>
    </Box>
  );
}

export default Column;
