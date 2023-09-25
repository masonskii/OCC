import React from "react";

const FileItem = ({ file, onDelete, onDownload }) => {
  return (
    <div className="file-item">
      <span className="file-name"> {file.name} </span>{" "}
      <button onClick={() => onDownload(file.id)}> Download </button>{" "}
      <button onClick={() => onDelete(file.id)}> Delete </button>{" "}
    </div>
  );
};

export default FileItem;
