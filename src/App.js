import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";

// components
import CodeEditor from "./components/CodeEditor";
import LiveCodeView from "./components/LiveCodeView";
import Widget from "./components/HtmlWidget";
import {  loadFromLocal } from "./utils/saveLoadLocalStorage";

import { CodeContext } from "./contexts/CodeContext"; //

import "./styles.css";


export default function App() {
  const [code, setCode] = useState( loadFromLocal() ||
    "<div> <h3> hello world </h3> <p> Edit Me! </p> <div>y"
  ); // Initialize code state with an empty string
  const [htmlWidget, getWidget] = useState("");
  // Use useEffect to watch for changes in the code state
  useEffect(() => {
    // Update the HTML content in response to code changes
    const livePreviewElement = document.getElementById("live-preview");
    if (livePreviewElement) {
      livePreviewElement.innerHTML = code;
    }
  }, []);

  return (
      <CodeContext.Provider value={{ code, setCode }}>
        <Layout>
          <Widget getWidget={getWidget} />

          <div className="editor">
            <div className="item">
              <CodeEditor getCode={setCode} htmlInput={htmlWidget} />{" "}
              {/* Pass setCode function to update code */}
            </div>
            <div className="item">
              <LiveCodeView code={code} />
            </div>
          </div>
        </Layout>
      </CodeContext.Provider>
  );
}
