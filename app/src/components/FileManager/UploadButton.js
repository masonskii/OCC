import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const UploadButton = ({ onUpload, onCodeLoader }) => {
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContents = event.target.result;
      onUpload(file, fileContents);
      onCodeLoader(fileContents);
    };

    reader.readAsText(file);
  };
  return (
    <div>
      <input
        type="file"
        id="file-input"
        onChange={handleFileInputChange}
        style={{ display: "none", color: "white" }}
      />{" "}
      <label htmlFor="file-input">
        <FontAwesomeIcon
          icon="upload"
          style={{ color: "white", marginLeft: "10px" }}
        />{" "}
      </label>{" "}
    </div>
  );
};

export default UploadButton;
