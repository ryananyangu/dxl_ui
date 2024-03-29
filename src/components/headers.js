import { useState, useContext } from "react";
import { Form, Button, Row, InputGroup } from "react-bootstrap";
import { ListSelected } from "./ListSelected";
import { observer } from "mobx-react";
import { GlobalContext } from "../data/State";
import { runInAction } from "mobx";
import { useNavigate } from "react-router-dom";
import { CustomContainer } from "./customContainer";

const HeaderSetup = observer(() => {
  const Config = useContext(GlobalContext);
  const navigate = useNavigate();

  const [headerName, setHeaderName] = useState("");
  const [headerValue, setHeaderValue] = useState("");

  const handleAddMapping = (e) => {
    runInAction(() => {
      Config.Headers[headerName] = [headerValue];
    });
    setHeaderName("");
    setHeaderValue("");
  };

  return (
    <CustomContainer
      title="Headers Setup"
      controls={
        <button
          onClick={() => {
            navigate("/statics");
          }}
        >
          Next
        </button>
      }
    >
      <Row>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Header name"
            value={headerName}
            onChange={(e) => {
              setHeaderName(e.currentTarget.value);
            }}
          />
          <Form.Control
            type="text"
            placeholder="Header value"
            value={headerValue}
            onChange={(e) => {
              setHeaderValue(e.currentTarget.value);
            }}
          />
          <Button
            variant="success"
            onClick={(e) => {
              handleAddMapping(e);
            }}
          >
            +
          </Button>
        </InputGroup>
      </Row>
      <hr />
      <ListSelected
        items={Config.Headers}
        func={(itemName) => {
          delete Config.Headers[itemName];
        }}
      />
    </CustomContainer>
  );
});

export default HeaderSetup;
