import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { Button, Card, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../data/State";
import CustomDropdown from "./CustomDropDown";
import { ListSelected } from "./ListSelected";

export const StaticInput = observer(() => {
  const Config = useContext(GlobalContext);
  const navigate = useNavigate();
  const [selectedInput, setSelectedInput] = useState(0);
  const [staticValue, setStaticValue] = useState("");
  const [isCustom, setCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const handleAddMapping = (e) => {
    let val = "";
    if (isCustom) {
      val = customValue;
    } else {
      val = Config.OutRequestValues[selectedInput].replace(/[{}]/g, "");
    }
    Config.Static[val] = staticValue;
    setSelectedInput(0);
    setStaticValue("");
    setCustomValue("");
  };
  return (
    <Card>
      <Card.Header>{"Statics Setup"}</Card.Header>
      <Card.Body>
        <Row>
          <InputGroup>
            <InputGroup.Text>Custom</InputGroup.Text>
            <InputGroup.Checkbox
              onChange={(e) => {
                setCustom(e.target.checked);
              }}
            />
            {!isCustom ? (
              <CustomDropdown
                items={Config.OutRequestValues}
                func={setSelectedInput}
              />
            ) : (
              <Form.Control
                type="text"
                placeholder="Custom static"
                value={customValue}
                onChange={(e) => {
                  setCustomValue(e.target.value);
                }}
              />
            )}
            <Form.Control
              type="text"
              placeholder="Static value"
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
          items={Config.Static}
          func={(staticVal) => {
            runInAction(() => {
              delete Config.Static[staticVal];
            });
          }}
        />
      </Card.Body>
      <Card.Footer>
        <Button
          onClick={() => {
            navigate("/outresponse");
          }}
        >
          Next
        </Button>
      </Card.Footer>
    </Card>
  );
});
