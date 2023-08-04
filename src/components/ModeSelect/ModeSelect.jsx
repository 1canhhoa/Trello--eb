import React from "react";
import { useColorScheme } from "@mui/material/styles";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import theme from "~/Theme";
function ModeSelect() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    setMode(event.target.value);
  };
  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel id="label-select-dark-light-mode">mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="dark-light-mode"
        value={mode}
        label="mode"
        onChange={handleChange}
        sx={{
          ".MuiSvgIcon-root": {
            color: (theme) => theme._white,
          },
        }}
      >
        <MenuItem value="light">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LightModeOutlinedIcon />
            light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DarkModeOutlinedIcon />
            dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SettingsBrightnessIcon />
            system
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
export default ModeSelect;
