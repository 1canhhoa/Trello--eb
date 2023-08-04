import React from "react";
import Column from "./Column/Column";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button/";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import theme from "~/Theme";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
function ListColumn({ columns }) {
  return (
    <SortableContext
      items={columns.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}
        {/* ADD NEW COLUMN */}
        <Box
          sx={{
            mx: 2,
            display: "flex",
            minWidth: "200px",
            maxWidth: "200px",
            borderRadius: "6px",
            bgcolor: "#ffffff3d",
            height: "fit-content",
            justifyContent: "flex-start",
          }}
        >
          <Button
            sx={{
              px: 2,
              py: 1,
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              color: (theme) => theme._white,
            }}
            startIcon={<ViewColumnIcon />}
          >
            Add new column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  );
  S;
}

export default ListColumn;
