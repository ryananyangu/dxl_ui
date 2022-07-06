import { useState } from "react";
import { Button, Card, Form, InputGroup, Row } from "react-bootstrap";
import CustomDropdown from "./CustomDropDown";
import { ListSelected } from "./ListSelected";

export const StaticInput = ({ data, lable, getStatics }) => {
  const [selectedInput, setSelectedInput] = useState(0);
  const [staticValue, setStaticValue] = useState("");
  const [isCustom, setCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const [mapping, setMapping] = useState(data);

  const handleAddMapping = (e) => {
    let mappped = mapping;
    let val = "";
    if (isCustom) {
      val = customValue;
    } else {
      val = selectedInput;
    }
    mappped[val] = staticValue;
    // mappped[selectedInput] = staticValue;
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
              <CustomDropdown
                items={Object.keys(data)}
                func={setSelectedInput}
                // lable={"Constant Input values"}
              />
            ) : (
              <Form.Control
                type="text"
                placeholder="Custom value"
                value={customValue}
                onChange={(e) => {
                  setCustomValue(e.target.value);
                }}
              />
            )}
            <Form.Control
              type="text"
              placeholder="Header value"
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
        <ListSelected items={data} func={handleRemove} />
      </Card.Body>
      <Card.Footer>
        <Button onClick={onDoneHandler}>Done</Button>
      </Card.Footer>
    </Card>
  );
};

// <InputGroup>
//   <DropdownButton
//     variant="outline-secondary"
//     title="Dropdown"
//     id="input-group-dropdown-3"
//   >
//     <Dropdown.Item href="#">Action</Dropdown.Item>
//     <Dropdown.Item href="#">Another action</Dropdown.Item>
//     <Dropdown.Item href="#">Something else here</Dropdown.Item>
//     <Dropdown.Divider />
//     <Dropdown.Item href="#">Separated link</Dropdown.Item>
//   </DropdownButton>
//   <FormControl aria-label="Text input with 2 dropdown buttons" />
//   <DropdownButton
//     variant="outline-secondary"
//     title="Dropdown"
//     id="input-group-dropdown-4"
//     align="end"
//   >
//     <Dropdown.Item href="#">Action</Dropdown.Item>
//     <Dropdown.Item href="#">Another action</Dropdown.Item>
//     <Dropdown.Item href="#">Something else here</Dropdown.Item>
//     <Dropdown.Divider />
//     <Dropdown.Item href="#">Separated link</Dropdown.Item>
//   </DropdownButton>
// </InputGroup>;
