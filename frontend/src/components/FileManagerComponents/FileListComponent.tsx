import React, { useState } from "react";
import FileList from "./FileList";
import { IFileExtended, IFileListComponentProps } from "../../interface/IFileManager/IFIleListComponents";
import UploadButton from "./UploadButton";



const FileListComponent: React.FC<IFileListComponentProps> = ({ onCodeLoaded }) => {
  const [files, setFiles] = useState<IFileExtended[]>([]);
  const handleUpload = async (uploadedFile?: File) => {
    if (!uploadedFile || !uploadedFile.name) {
      return;
    }
    const fileExtension = (uploadedFile && uploadedFile.name) 
  ? uploadedFile.name.slice((Math.max(0, uploadedFile.name.lastIndexOf(".")) || Infinity) + 1).toLowerCase()
  : '';
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
  const handleDoubleClick = (fileId: number) => {
    console.log(fileId);
    const selectedFile = files.find((file) => file.id === fileId);
    console.log(selectedFile?.contents);
    if (selectedFile && selectedFile.contents) {
      onCodeLoaded(selectedFile.contents);
    }
  };

  const handleDelete = async (fileId: number) => {
    console.log(fileId);
    setFiles(files.filter((f) => f.id !== fileId));
  };

  const handleDownload = async (fileId: number) => {};

  return (
    <div className="App">
      <UploadButton onUpload={handleUpload} onCodeLoader={onCodeLoaded} />
      <FileList
        files={files}
        onDelete={handleDelete}
        onDownload={handleDownload}
        onDoubleClick={handleDoubleClick}
      />
    </div>
  );
};

export default FileListComponent;