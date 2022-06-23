import React from "react";

import Editor from "@monaco-editor/react";
import { Card, Button } from "react-bootstrap";

export default function CodeEditor() {
  return (
    <Card>
      <Card.Header>Sample Incomming request and outgoing</Card.Header>
      <Card.Body>
        <Editor
          height="50vh"
          defaultLanguage="json"
          defaultValue='{ "Name" :"John Doe"}'
          theme="vs-dark"
        />
        <Button variant="primary" type="submit">
          Send to Process or Convert to json
        </Button>
      </Card.Body>
    </Card>
  );
}
