import React from "react";
import IconButton from '@mui/material/IconButton';

import DeleteIcon from "@mui/icons-material/Delete";
import GetAppIcon from "@mui/icons-material/GetApp";
const FileItem = ({ file, onDelete, onDownload }) => {
  return (
    <div className="file-item">
      <span className="file-name"> {file.name} </span>{" "}
      <IconButton onClick={() => onDownload(file.id)}>
        <GetAppIcon />
      </IconButton>{" "}
      <IconButton onClick={() => onDelete(file.id)}>
        <DeleteIcon />
      </IconButton>{" "}
    </div>
  );
};

export default FileItem;
