import React, { useCallback } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
const ExecBtn = ({ code, language, onOutput }) => {
  const executeCode = useCallback(async () => {
    const codeData = {
      code: code,
      language: language,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/code/exec",
        codeData
      );
      const result = response.data;
      onOutput(result.output || result.error);
    } catch (error) {
      onOutput("Error: " + error.message);
    }
  }, [code, language, onOutput]);

  return <Button onClick={executeCode} variant="contained" color="primary"> Run Code </Button>;
};

export default ExecBtn;
