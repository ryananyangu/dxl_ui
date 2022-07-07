import { useState } from "react";
import { Button, Card, Form, InputGroup, Row } from "react-bootstrap";
import CustomDropdown from "./CustomDropDown";
import { ListSelected } from "./ListSelected";

export const StaticInput = ({ data, lable, getStatics }) => {
  const [selectedInput, setSelectedInput] = useState(0);
  const [staticValue, setStaticValue] = useState("");
  const [isCustom, setCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const [mapping, setMapping] = useState({});

  const handleAddMapping = (e) => {
    let mappped = mapping;
    let val = "";
    if (isCustom) {
      val = customValue;
    } else {
      val = data[selectedInput];
    }
    mappped[val] = staticValue;
    setMapping(mappped);
    setSelectedInput(0);
    setStaticValue("");
    setCustomValue("");
  };

  const handleRemove = (itemName) => {
    let tmp = { ...mapping };
    delete tmp[itemName];
    setMapping(tmp);
    setSelectedInput(0);
    setStaticValue("");
  };

  const onDoneHandler = () => {
    getStatics({ ...mapping });
  };
  return (
    <Card>
      <Card.Header>{lable}</Card.Header>
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
              <CustomDropdown items={data} func={setSelectedInput} />
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
        <ListSelected items={mapping} func={handleRemove} />
      </Card.Body>
      <Card.Footer>
        <Button onClick={onDoneHandler}>Done</Button>
      </Card.Footer>
    </Card>
  );
};
