import React from "react";
import Box from "@mui/material/Box";
import Card from "./Cart/Cart";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
function ListCard({ cards }) {
  return (
    <SortableContext
      items={cards.map((c) => c._id)}
      strategy={verticalListSortingStrategy}
    >
      <Box
        sx={{
          gap: 1,
          p: "0 5px",
          m: "0 5px",
          display: "flex",
          overflowY: "auto",
          overflowX: "hidden",
          alignItems: "center",
          flexDirection: "column",
          maxHeight: (theme) => theme._listcardHeight,
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ced0da",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#bfc2cf",
          },
        }}
      >
        {cards.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </Box>
    </SortableContext>
  );
}

export default ListCard;
