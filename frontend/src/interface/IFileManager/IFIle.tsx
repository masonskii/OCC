export interface IFile {
    id: number;
    name: string;
    filename: string;
  }
  
export  interface IFileItemProps {
    file: IFile;
    onDelete: (id: number) => void;
    onDownload: (id: number) => void;
    onDoubleClick: (id: number) => void;
  }