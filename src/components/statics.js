import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { Button, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../data/State";
import { CustomContainer } from "./customContainer";
import { ListSelected } from "./ListSelected";

export const StaticInput = observer(() => {
  const Config = useContext(GlobalContext);
  const navigate = useNavigate();
  // const [selectedInput, setSelectedInput] = useState(0);
  const [staticValue, setStaticValue] = useState("");
  const [customValue, setCustomValue] = useState("");

  const handleAddMapping = (e) => {
    // let val = Config.OutRequestValues[selectedInput];
    Config.Statics[customValue] = staticValue;
    // setSelectedInput(0);
    setStaticValue("");
    setCustomValue("");
  };
  return (
    <CustomContainer
      title="Statics Setup"
      controls={
        <button
          onClick={() => {
            navigate("/request");
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
            placeholder="Custom name"
            value={customValue}
            onChange={(e) => {
              setCustomValue(e.target.value);
            }}
          />
          <Form.Control
            type="text"
            placeholder="Statics value"
            value={staticValue}
            onChange={(e) => {
              setStaticValue(e.target.value);
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
        items={Config.Statics}
        func={(staticVal) => {
          runInAction(() => {
            delete Config.Statics[staticVal];
          });
        }}
      />
    </CustomContainer>
  );
});
