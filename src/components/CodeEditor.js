import Editor from "@monaco-editor/react";
import { Card, Button } from "react-bootstrap";
import { observer } from "mobx-react";
import { runInAction } from "mobx";
import { useNavigate } from "react-router-dom";

export const CodeEditor = observer(
  ({ lang, header, data, getTransFormedData, onChange, next }) => {
    const navigate = useNavigate();
    return (
      <Card>
        <Card.Header>{header}</Card.Header>
        <Card.Body>
          <Editor
            height="70vh"
            defaultLanguage={lang}
            defaultValue={data}
            theme="vs-dark"
            onChange={(value) => {
              onChange(value);
            }}
          />
          <Button
            variant="primary"
            onClick={() => {
              runInAction(() => {
                getTransFormedData();
                console.log(next);
                navigate(next);
              });
            }}
          >
            Convert
          </Button>
        </Card.Body>
      </Card>
    );
  }
);
