import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-markup-templating.js";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { CustomContainer } from "./customContainer";
import { useNavigate } from "react-router-dom";

const JSEditor = ({ code, onChange, header, next }) => {
  const navigate = useNavigate();
  return (
    <CustomContainer
      title={header}
      controls={
        <button
          onClick={() => {
            navigate(next);
          }}
        >
          Next
        </button>
      }
    >
      <Editor
        value={code}
        onValueChange={(code) => onChange(code)}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          width: "100%",
          height: "100%",
          // overflow: "scroll",
        }}
      />
    </CustomContainer>
  );
};

export default JSEditor;
