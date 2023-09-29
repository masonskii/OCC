export interface IFileExtended extends File {
    id: number;
    filename: string;
    contents?: string;
}
  
export interface IFileListComponentProps {
    onCodeLoaded: (code: string) => void;
}