import React, { ChangeEvent, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IUploadButtonProps } from "../../interface/IUploadButton";

const UploadButton: FC<IUploadButtonProps> = ({ onUpload, onCodeLoader }) => {
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const fileContents = event.target!.result as string;
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