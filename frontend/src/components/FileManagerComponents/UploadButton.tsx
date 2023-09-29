import React, { ChangeEvent, FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { IUploadButtonProps } from "../../interface/IUploadButton";
const UploadButton: FC<IUploadButtonProps> = ({ onUpload, onCodeLoader }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = event.target.files![0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const fileContents = event.target!.result as string;
      onUpload(file, fileContents);
      onCodeLoader(fileContents);
    };

    reader.readAsText(file);
    setIsLoading(false);
  };

  return (
    <>
      <input
        type="file"
        id="file-input"
        onChange={handleFileInputChange}
        style={{ display: isLoading ? "none" : "block", color: "white" }}
      />
      <label htmlFor="file-input">
        {isLoading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            style={{ color: "white", marginLeft: "10px" }}
          />
        ) : (
          <FontAwesomeIcon
            icon="upload"
            style={{ color: "white", marginLeft: "10px" }}
          />
        )}
      </label>
    </>
  );
};

export default UploadButton;
