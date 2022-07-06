import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import { Card, Button } from "react-bootstrap";

export default function CodeEditor({ lang, header, data, getTransFormedData }) {
  const [value, setvalue] = useState(data);
  const convertCodeHandler = () => {
    getTransFormedData(value);
  };
  function handleEditorChange(value, event) {
    setvalue(value);
  }
  return (
    <Card>
      <Card.Header>{header}</Card.Header>
      <Card.Body>
        <Editor
          height="50vh"
          defaultLanguage={lang}
          defaultValue={data}
          theme="vs-dark"
          onChange={handleEditorChange}
        />
        <Button variant="primary" onClick={convertCodeHandler}>
          Convert code
        </Button>
      </Card.Body>
    </Card>
  );
}
