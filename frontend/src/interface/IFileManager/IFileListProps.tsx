// Define prop types for FileList component
export interface IFileListProps {
    files: {
      id: number;
      name: string;
      filename: string;
      [key: string]: any;
    }[];
    onDelete: (file: any) => void;
    onDownload: (file: any) => void;
    onDoubleClick: (file: any) => void;
  }