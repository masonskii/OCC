import CodeMirror from "@uiw/react-codemirror";
import React, { useState } from "react";
import { langs } from "@uiw/codemirror-extensions-langs";
import { duotoneDark } from "@uiw/codemirror-themes-all";
import "../static/Edtior.css";
import ExecBtn from "./ExecuteButton.js";

function TextAreaEditor() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("print('Hello,world!')");
  const [result, setResult] = useState("no output");
  const handleOutput = (output) => {
    setResult(output);
  };
  // Add a new function to handle onChange event
  const handleCodeChange = (editor, data, value) => {
    console.log(editor, data, value);
    setCode(value);
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
    console.log(selectedLanguage);
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
        <select
          id="language"
          className="language-select"
          defaultValue={language}
          onChange={(e) => updateCodeMirrorMode(e.target.value)}
        >
          <option value="python"> Python </option>{" "}
          <option value="cpp"> C++ </option>{" "}
          <option value="js"> JavaScript </option>{" "}
          <option value="c"> C </option>{" "}
          <option value="cs"> C#(.NET 7) </option>{" "}
          <option value="go"> Golang </option>{" "}
          <option value="ruby"> Ruby </option>{" "}
        </select>{" "}
        <ExecBtn code={[code]} language={language} onOutput={handleOutput} />{" "}
      </div>{" "}
      <CodeMirror
        value={getDefaultCode(language)}
        theme={duotoneDark}
        extensions={[getMode(language)]}
        onChange={handleCodeChange}
      />{" "}
      <div>
        <label> Output: </label> <pre id="output">{result}</pre>{" "}
      </div>{" "}
    </div>
  );
}

export default TextAreaEditor;
