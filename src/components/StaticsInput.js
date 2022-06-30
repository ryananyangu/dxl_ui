import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import CustomDropdown from "./CustomDropDown";
import { ListSelected } from "./ListSelected";

export const StaticInput = ({ data, lable }) => {
  const [selectedInput, setSelectedInput] = useState(0);
  const [staticValue, setStaticValue] = useState("");

  const [mapping, setMapping] = useState(data);

  const handleAddMapping = (e) => {
    let mappped = mapping;
    mappped[selectedInput] = staticValue;
    setMapping(mappped);
    setSelectedInput(0);
    setStaticValue("");
  };

  const handleRemove = (itemName) => {
    let tmp = { ...mapping };
    delete tmp[itemName];
    setMapping(tmp);
    setSelectedInput(0);
    setStaticValue("");
  };
  return (
    <Card>
      <Card.Header>{lable}</Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <CustomDropdown
              items={Object.keys(data)}
              func={setSelectedInput}
              lable={"Constant Input values"}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Header value"
              value={staticValue}
              onChange={(e) => {
                setStaticValue(e.target.value);
              }}
            />
          </Col>
          <Col md={2}>
            <Button
              variant="success"
              onClick={(e) => {
                handleAddMapping(e);
              }}
            >
              +
            </Button>
          </Col>
        </Row>
        <hr />
        <ListSelected items={data} func={handleRemove} />
      </Card.Body>
      <Card.Footer>
        <Button>Done</Button>
      </Card.Footer>
    </Card>
  );
};
