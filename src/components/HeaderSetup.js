import { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { ListSelected } from "./ListSelected";

const HeaderSetup = ({ data, lable }) => {
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

  return (
    <Card>
      <Card.Header>{lable}</Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Header name"
              value={headerName}
              onChange={(e) => {
                setHeaderName(e.target.value);
              }}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Header value"
              value={headerValue}
              onChange={(e) => {
                setHeaderValue(e.target.value);
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
        <ListSelected items={mapping} func={handleRemove} />
      </Card.Body>
      <Card.Footer>
        <Button>Done</Button>
      </Card.Footer>
    </Card>
  );
};

export default HeaderSetup;
