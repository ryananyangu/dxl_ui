import React from "react";

import Editor from "@monaco-editor/react";
import { Card, Button } from "react-bootstrap";

export default function CodeEditor({ lang, header, data, getTransFormedData }) {
  const convertCodeHandler = () => {
    getTransFormedData(data, lang);
  };
  return (
    <Card>
      <Card.Header>{header}</Card.Header>
      <Card.Body>
        <Editor
          height="50vh"
          defaultLanguage={lang}
          defaultValue={data}
          theme="vs-dark"
        />
        <Button variant="primary" onClick={convertCodeHandler}>
          Convert code
        </Button>
      </Card.Body>
    </Card>
  );
}
