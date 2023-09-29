export interface IExecBtnProps {
    code: string;
    language: string;
    onOutput: (output: string) => void;
}