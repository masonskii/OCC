import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { vscodeDark } from "@uiw/codemirror-themes-all";
import { ICodeChangeHandler } from "../../interface/ITextEditor/ICodeChangeHandler";
import { IOutputHandler } from "../../interface/ITextEditor/IOutputHandler";
import LanguageSelection from "./LanguageSelector";
import ExecBtn from "./EditButton";
import FileListComponent from "../FileManagerComponents/FileListComponent";
import "../../static/css/Editor.css"
import "../../static/css/FileManager.css"

export const TextEditor: React.FC = () => {
    const [language, setLanguage] = useState<string>("python");
    const [code, setCode] = useState<string>("print('Hello,world!')");
    const [result, setResult] = useState<string>("no output");

    
    const handlerOutput: IOutputHandler = (output) =>{
        setResult(result);
    }

    const handlerCodeChange: ICodeChangeHandler = (editor) =>{
        setCode(editor);
    }
    const updateCodeMirrorMode = (selectedLanguage: string) => {
        setLanguage(selectedLanguage);
        setCode(getDefaultCode(selectedLanguage));
      };
      const getDefaultCode = (selectedLanguage: string): string => {
        switch (selectedLanguage) {
            case "python":
                return "print('Hello,world!')";
            case "c":
                return '#include <stdio.h>\n\nint main() {\n\nprintf("Hello world");\nreturn 0;\n}';
            case "cpp":
                return '#include <iostream>\n\nint main(){\n   std::cout << "hello,world!" << std::endl;\n  return 0;\n}';
            case "cs":
                return 'Console.WriteLine("Hello,world!");';
            case "js":
                return "console.log('Hello,world!')";
            case "ruby":
                return "puts 'hello, world!'";
            case "go":
                return "package main\nimport 'fmt'\nfunc main(){\nfmt.Println(\"Hello,world!\")\n}";
            case "html":
                return ""
            default:
                return "print('Hello,world!')";
        }
      }
      const getMode = (selectedLanguage: string) => {
        switch (selectedLanguage) {
            case "python":
                return langs.python();
            case "c":
                return langs.c();
            case "cpp":
                return langs.cpp();
            case "cs":
                return langs.csharp();
            case "js":
                return langs.javascript();
            case "ruby":
                return langs.ruby();
            case "go":
                return langs.go();
            default:
                return langs.python();
        }
    }
    return (
        <>
          <div className="display-content-flexgroup">
            <div className="section-runner">
              <div className="run_g2">
                <LanguageSelection onSelectionChange={updateCodeMirrorMode} />
                <ExecBtn code={code} language={language} onOutput={handlerOutput} />
              </div>
              <div className="title_section_files">
                <h1>Your files here</h1>
              </div>
            </div>
            <div className="editor_g3">
              <div className="g4">
                <CodeMirror
                  className="Editor"
                  value={code}
                  theme={vscodeDark}
                  extensions={[getMode(language)]}
                  onChange={handlerCodeChange}
                />
                <pre id="output">{result}</pre>
              </div>
              <FileListComponent onCodeLoaded={handlerCodeChange} />
            </div>
          </div>
        </>
      );
};