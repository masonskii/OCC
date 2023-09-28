import React from "react";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import GetAppIcon from "@mui/icons-material/GetApp";
import CodeIcon from "@mui/icons-material/Code";
import HtmlIcon from "@mui/icons-material/Html";
import JavascriptIcon from "@mui/icons-material/Javascript";
import CssIcon from "@mui/icons-material/Css";
import PhpIcon from "@mui/icons-material/Php";
const FileItem = ({ file, onDelete, onDownload, onDoubleClick }) => {
  const getIcon = (filename) => {
    switch (filename) {
      case "html":
        return <HtmlIcon style={{ width: "30px" }} />;
      case "js":
        return <JavascriptIcon style={{ width: "30px" }} />;
      case "css":
        return <CssIcon style={{ width: "30px" }} />;
      case "php":
        return <PhpIcon style={{ width: "30px" }} />;
      default:
        return <CodeIcon style={{ width: "30px" }} />;
    }
  };
  return (
    <div className="file-item" onDoubleClick={() => onDoubleClick(file.id)}>
      <Stack direction="row" alignItems="center">
        {" "}
        {getIcon(file.filename)}{" "}
        <span className="file-name"> {file.name} </span>{" "}
        <IconButton
          onClick={() => onDownload(file.id)}
          style={{ color: "green" }}
        >
          <GetAppIcon />
        </IconButton>{" "}
        <IconButton onClick={() => onDelete(file.id)} style={{ color: "red" }}>
          <DeleteIcon />
        </IconButton>{" "}
      </Stack>{" "}
    </div>
  );
};

export default FileItem;
