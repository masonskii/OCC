import React, { useCallback } from "react";
import axios from "axios";

const ExecBtn = ({ code, language, onOutput }) => {
  const executeCode = useCallback(async () => {
    const codeData = {
      code: code,
      language: language,
    };
    console.log(codeData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/runcode",
        codeData
      );
      const result = response.data;
      onOutput(result.output || result.error || "No output");
    } catch (error) {
      onOutput("Error: " + error.message);
    }
  }, [code, language, onOutput]);

  return <button onClick={executeCode}> Run Code </button>;
};

export default ExecBtn;
