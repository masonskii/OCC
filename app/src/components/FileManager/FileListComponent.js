import React, { useState } from "react";
import FileList from "./FileList.js";
import UploadButton from "./UploadButton.js";

function FileListComponent({ onCodeLoaded }) {
  const [files, setFiles] = useState([]);
  const handleUpload = async (uploadedFile) => {
    const fileExtension = uploadedFile.name.split(".").pop().toLowerCase();
    setFiles([
      ...files,
      {
        ...uploadedFile,
        id: Math.floor(Math.random() * (99999 - 1 + 1)) + 99999,
        name: uploadedFile.name,
        filename: fileExtension,
      },
    ]);
  };
  const handleDoubleClick = (fileId) => {
    console.log(fileId);
    const selectedFile = files.find((file) => file.id === fileId);
    console.log(selectedFile.content);
    if (selectedFile && selectedFile.contents) {
      onCodeLoaded(selectedFile.contents);
    }
  };

  const handleDelete = async (fileId) => {
    console.log(fileId);
    setFiles(files.filter((f) => f.id !== fileId));
  };

  const handleDownload = async (fileId) => {};

  return (
    <div className="App">
      <UploadButton onUpload={handleUpload} onCodeLoader={onCodeLoaded} />{" "}
      <FileList
        files={files}
        onDelete={handleDelete}
        onDownload={handleDownload}
        onDoubleClick={handleDoubleClick}
      />{" "}
    </div>
  );
}
export default FileListComponent;
