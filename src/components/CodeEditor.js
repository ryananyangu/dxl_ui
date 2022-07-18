import Editor from "@monaco-editor/react";
import { observer } from "mobx-react";
import { runInAction } from "mobx";
import { useNavigate } from "react-router-dom";
import { CustomContainer } from "./customContainer";

export const CodeEditor = observer(
  ({ lang, header, data, getTransFormedData, onChange, next }) => {
    const navigate = useNavigate();
    return (
      <CustomContainer title={header} controls={<button
        onClick={() => {
          runInAction(() => {
            getTransFormedData();
            console.log(next);
            navigate(next);
          });
        }}
      >
        Convert
      </button>}>
          <Editor
            height="70vh"
            defaultLanguage={lang}
            defaultValue={data}
            theme="light"
            onChange={(value) => {
              onChange(value.replace(/[\r\n\t]/gm, ""));
            }}
          />
      </CustomContainer>
    );
  }
);
