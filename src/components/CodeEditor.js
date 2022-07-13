import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import { Card, Button } from "react-bootstrap";
import { observer } from "mobx-react";
import { runInAction } from "mobx";

export const CodeEditor = observer(
  ({ lang, header, data, getTransFormedData }) => {
    const [value, setvalue] = useState(data);

    return (
      <Card>
        <Card.Header>{header}</Card.Header>
        <Card.Body>
          <Editor
            height="50vh"
            defaultLanguage={lang}
            defaultValue={data}
            theme="vs-dark"
            onChange={(value) => {
              setvalue(value);
            }}
          />
          <Button
            variant="primary"
            onClick={() => {
              runInAction(() => {
                getTransFormedData(value);
              });
            }}
          >
            Convert code
          </Button>
        </Card.Body>
      </Card>
    );
  }
);
