import "./App.css";
import TextAreaEditor from "./components/CodeEditor/TextAreaEditor.js";

function App() {
  return (
    <div>
      <div className="container">
        <h1 className="title"> Online Code Editor </h1>{" "}
      </div>{" "}
      <div className="diplay-content-ctx">
        <TextAreaEditor />
      </div>{" "}
    </div>
  );
}
export default App;
