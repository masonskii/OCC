import React from "react";
import FileItem from "./FileItem";
import { IFileListProps } from "../../interface/IFileManager/IFileListProps";

const FileList: React.FC<IFileListProps> = ({ files, onDelete, onDownload, onDoubleClick }) => {
  return (
    <div className="file-list">
      {files.map((file) => (
        <FileItem
          key={file.id} // Unique key prop set to file.id
          file={file}
          onDelete={onDelete}
          onDownload={onDownload}
          onDoubleClick={onDoubleClick} // Pass to FileItem
        />
      ))}
    </div>
  );
};

export default FileList;
