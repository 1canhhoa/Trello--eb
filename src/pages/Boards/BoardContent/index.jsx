import Box from "@mui/material/Box";

function BoardContent() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.light",
        width: "100%",
        height: (theme) =>
          ` calc(100vh - ${theme.trello.headerHeight}  - ${theme.trello.boardbarHeight})`,
        display: "flex",
        alignItems: "center",
      }}
    >
      BOARD_CONTENT
    </Box>
  );
}

export default BoardContent;
