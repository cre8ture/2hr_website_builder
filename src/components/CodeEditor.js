// CodeEditor.js
import React, { useEffect, useRef, useState } from "react";
import AceEditor from "react-ace";
import { saveToLocal, loadFromLocal } from "../utils/saveLoadLocalStorage";

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";

const CodeEditor = ({ getCode, htmlInput }) => {
  const [code, setCode] = useState(
    loadFromLocal("code") || "<div> <h3> hello world </h3> <p> Edit Me! </p> <div>"
  );
  const editorRef = useRef(null);

  const onChange = (newValue) => {
    setCode(newValue);
    getCode(newValue); // Pass the updated value, not the old 'code' variable
    saveToLocal("code", newValue);
  };

  useEffect(() => {
    if (htmlInput) {
      const editor = editorRef.current.editor;
      const cursorPosition = editor.getCursorPosition();
      const closingTag = `</${htmlInput.split(" ")[0].slice(1)}`;
      const insertedCode = `${htmlInput}${closingTag}`;
      editor.session.insert(cursorPosition, insertedCode);
      editor.moveCursorTo(
        cursorPosition.row,
        cursorPosition.column + htmlInput.length
      );
    }
  }, [htmlInput]);

  useEffect(() => {
    const editor = editorRef.current.editor;
    // Check if the current editor content is different from the state
    if (editor.getValue() !== code) {
      editor.setValue(code, -1); // -1 prevents resetting the cursor position
    }
  }, [code]);
  

  return (
    <div>
      <AceEditor
        mode="html"
        theme="monokai"
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        value={code}
        ref={editorRef}
        setOptions={{ 
          fontSize: "15pt",
          useWorker: false,
          wrap: true
        }}
      />
    </div>
  );
};

export default CodeEditor;
