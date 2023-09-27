import React, { useCallback } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
const LanguageSelection = ({ onSelectionChange }) => {
  const handleChange = useCallback(
    (event) => {
      const selectedValue = event.target.value;
      onSelectionChange(selectedValue);
    },
    [onSelectionChange]
  );

  return (
    <FormControl fullWidth>
      <Select
        id="language"
        className="language-select"
        defaultValue="python"
        onChange={handleChange}
        sx={{ color: "#FB961FFF" }}
      >
        <MenuItem value="python"> Python </MenuItem>{" "}
        <MenuItem value="cpp"> C++ </MenuItem>{" "}
        <MenuItem value="js"> JavaScript </MenuItem>{" "}
        <MenuItem value="c"> C </MenuItem>{" "}
        <MenuItem value="cs"> C#(.NET 7) </MenuItem>{" "}
        <MenuItem value="go"> Golang </MenuItem>{" "}
        <MenuItem value="ruby"> Ruby </MenuItem>{" "}
      </Select>{" "}
    </FormControl>
  );
};

export default LanguageSelection;
