import { useState } from "react";
import { Form, Button, Row, Card, InputGroup } from "react-bootstrap";
import { ListSelected } from "./ListSelected";

const HeaderSetup = ({ data, lable, getHeaders }) => {
  const [headerName, setHeaderName] = useState("");
  const [headerValue, setHeaderValue] = useState("");
  const [mapping, setMapping] = useState(data);

  const handleAddMapping = (e) => {
    let mappped = mapping;
    mappped[headerName] = headerValue;
    setMapping(mappped);
    setHeaderName("");
    setHeaderValue("");
  };

  const handleRemove = (itemName) => {
    let tmp = { ...mapping };
    delete tmp[itemName];
    setMapping(tmp);
    setHeaderName("");
    setHeaderValue("");
  };

  const onDoneHandler = () => {
    let tmp = { ...mapping };
    getHeaders(tmp);
  };

  return (
    <Card>
      <Card.Header>{lable}</Card.Header>
      <Card.Body>
        <Row>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Header name"
              value={headerName}
              onChange={(e) => {
                setHeaderName(e.target.value);
              }}
            />
            <Form.Control
              type="text"
              placeholder="Header value"
              value={headerValue}
              onChange={(e) => {
                setHeaderValue(e.target.value);
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

export default HeaderSetup;
