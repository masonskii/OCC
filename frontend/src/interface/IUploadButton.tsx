export interface IUploadButtonProps {
    onUpload: (file: File, fileContents: string) => void;
    onCodeLoader: (fileContents: string) => void;
}
  