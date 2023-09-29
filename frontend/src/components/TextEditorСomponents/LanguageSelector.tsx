import React, { useCallback } from "react";
import { FormControl, MenuItem, Select,SelectChangeEvent  } from "@mui/material";
import { ILanguageSelectorProps } from "../../interface/ITextEditor/ILanguageSelectorProps";


const LanguageSelection: React.FC<ILanguageSelectorProps> = ({
    onSelectionChange,
  }) => {
    const handleChange = useCallback(
      (event: SelectChangeEvent<string>) => {
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
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="cpp">C++</MenuItem>
          <MenuItem value="js">JavaScript</MenuItem>
          <MenuItem value="c">C</MenuItem>
          <MenuItem value="cs">C#(.NET 7)</MenuItem>
          <MenuItem value="go">Golang</MenuItem>
          <MenuItem value="ruby">Ruby</MenuItem>
          <MenuItem value="html">HTML (not compile language)</MenuItem>
          <MenuItem value="css">CSS (not compile language)</MenuItem>
        </Select>
      </FormControl>
    );
  };
  
  export default LanguageSelection;