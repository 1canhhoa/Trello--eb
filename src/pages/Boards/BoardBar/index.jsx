import Box from "@mui/material/Box";

function BoardBar() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        width: "100%",
        height: (theme) => theme.trello.boardbarHeight,
        display: "flex",
        alignItems: "center",
      }}
    >
      BOARD_BAR
    </Box>
  );
}

export default BoardBar;
