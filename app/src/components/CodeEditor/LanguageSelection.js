import React, { useState, useCallback } from "react";

const LanguageSelection = ({ onSelectionChange }) => {
  const handleChange = useCallback(
    (event) => {
      const selectedValue = event.target.value;
      onSelectionChange(selectedValue);
    },
    [onSelectionChange]
  );

  return (
    <select
      id="language"
      className="language-select"
      defaultValue="python"
      onChange={handleChange}
    >
      <option value="python"> Python </option>{" "}
      <option value="cpp"> C++ </option>{" "}
      <option value="js"> JavaScript </option> <option value="c"> C </option>{" "}
      <option value="cs"> C#(.NET 7) </option>{" "}
      <option value="go"> Golang </option> <option value="ruby"> Ruby </option>{" "}
    </select>
  );
};

export default LanguageSelection;
