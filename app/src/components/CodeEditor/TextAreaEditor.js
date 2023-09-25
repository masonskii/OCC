import CodeMirror from "@uiw/react-codemirror";
import React, { useState } from "react";
import { langs } from "@uiw/codemirror-extensions-langs";
import { duotoneDark } from "@uiw/codemirror-themes-all";
import "../../static/Edtior.css";
import ExecBtn from "./ExecuteButton.js";
import LanguageSelection from "./LanguageSelection";
import FileListComponent from "../FileManager/FileListComponent.js";

function TextAreaEditor() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("print('Hello,world!')");
  const [result, setResult] = useState("no output");
  const handleOutput = (output) => {
    setResult(output);
  };

  const handleCodeChange = (editor) => {
    setCode(editor);
  };
  const handleFileSelect = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      TextAreaEditor.setCode(e.target.result);
    };
    reader.readAsText(file);
  };
  const updateCodeMirrorMode = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setCode(getDefaultCode(selectedLanguage));
  };

  const getDefaultCode = (selectedLanguage) => {
    switch (selectedLanguage) {
      case "python":
        return "print('Hello,world!')";
      case "c":
        return "#include <stdio.h>\n\nint main() {\n\nprintf('Hello world');\nreturn 0;\n}";
      case "cpp":
        return "#include <iostream>\n\nint main(){\n   std::cout << 'hello,world!' << std::endl;\n  return 0;\n}";
      case "cs":
        return 'Console.WriteLine("Hello,world!");';
      case "js":
        return "console.log('Hello,world!')";
      case "ruby":
        return "puts 'hello, world!'";
      case "go":
        return "package main";
      default:
        return "print('Hello,world!')";
    }
  };

  const getMode = (selectedLanguage) => {
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
  };
  return (
    <div>
      <div>
        <LanguageSelection onSelectionChange={updateCodeMirrorMode} />{" "}
        <ExecBtn code={code} language={language} onOutput={handleOutput} />{" "}
        <CodeMirror
          value={getDefaultCode(language)}
          theme={duotoneDark}
          extensions={[getMode(language)]}
          onChange={handleCodeChange}
        />{" "}
        <div>
          <label> Output: </label> <pre id="output"> {result} </pre>{" "}
        </div>{" "}
      </div>{" "}
      <FileListComponent onFileSelect={handleFileSelect} />{" "}
    </div>
  );
}

export default TextAreaEditor;
