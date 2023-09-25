import React from "react";
import FileItem from "./FileItem.js";

const FileList = ({ files, onDelete, onDownload, onSelect }) => {
  const selectFile = (file) => {
    onSelect(file);
  };
  const FileItemList = files.map((file) => (
    <FileItem
      key={file.id} // Unique key prop set to file.id
      file={file}
      onDelete={onDelete}
      onDownload={onDownload}
      onSelect={selectFile} // Pass down the selectFile function as a prop to FileItem
    />
  ));
  return (
    <div className="file-list">
      {" "}
      {FileItemList} {/* Render the array directly */}{" "}
    </div>
  );
};

export default FileList;
