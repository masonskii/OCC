import React from "react";

const UploadButton = ({ onUpload }) => {
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContents = event.target.result;
      onUpload(file, fileContents);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input
        type="file"
        id="file-input"
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />{" "}
      <label htmlFor="file-input"> Upload File </label>{" "}
    </div>
  );
};

export default UploadButton;
