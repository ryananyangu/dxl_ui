import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

export default function RequestBasics({ data, lable, getBasics }) {
  const [method, setMethod] = useState(data["method"]);
  const [in_type, setIn_type] = useState(data["in_type"]);
  const [out_type, setOut_type] = useState(data["out_type"]);
  const [url, setUrl] = useState(data["url"]);
  const [serviceCode, SetServiceCode] = useState(data["serviceCode"]);

  const onDoneHandler = () => {
    let tmp = { ...data };
    tmp.method = method;
    tmp.in_type = in_type;
    tmp.out_type = out_type;
    tmp.url = url;
    tmp.serviceCode = serviceCode;
    getBasics(tmp);
  };

  return (
    <Card>
      <Card.Header>{lable}</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Out request method"
              value={method}
              onChange={(e) => {
                setMethod(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="In request type"
              value={in_type}
              onChange={(e) => {
                setIn_type(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Out request type"
              value={out_type}
              onChange={(e) => {
                setOut_type(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Service code"
              value={serviceCode}
              onChange={(e) => {
                SetServiceCode(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Out request url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer>
        <Button onClick={onDoneHandler}>Done</Button>
      </Card.Footer>
    </Card>
  );
}
