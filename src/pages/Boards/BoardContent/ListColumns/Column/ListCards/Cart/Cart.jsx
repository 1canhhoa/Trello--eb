import React from "react";
import { Card as MuiCard } from "@mui/material";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import AttachmentIcon from "@mui/icons-material/Attachment";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// dnd kit
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
function Card({ card }) {
  // dnd kit
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card._id, data: { ...card } });

  const dndkitCardStyles = {
    // touchAction: "none",//dành cho sensor default dạng poiter sensor
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "1px solid #2ecc71" : undefined,
  };
  const showCardAction = () =>
    !!card?.memberIds?.length ||
    !!card?.comments?.length ||
    !!card?.attachments?.length;
  return (
    <MuiCard
      ref={setNodeRef}
      style={dndkitCardStyles}
      {...attributes}
      {...listeners}
      sx={{
        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        width: "100%",
        cursor: "pointer",
        overflow: "unset",
      }}
    >
      {card?.cover && (
        <CardMedia
          sx={{ height: 140 }}
          image={card.cover}
          // title="green iguana"
        />
      )}
      <CardContent sx={{ p: "8px 4px 0px 8px" }}>
        <Typography variant="h8">{card.title}</Typography>
      </CardContent>
      {showCardAction() && (
        <CardActions sx={{ color: "red" }}>
          {!!card?.memberIds?.length && (
            <Button startIcon={<PeopleOutlineIcon />}>
              {card?.memberIds?.length}
            </Button>
          )}
          {!!card?.comments?.length && (
            <Button startIcon={<ChatBubbleOutlineIcon />}>
              {card?.comments?.length}
            </Button>
          )}
          {!!card?.attachments?.length && (
            <Button startIcon={<AttachmentIcon />}>
              {card?.attachments?.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  );
}

export default Card;
