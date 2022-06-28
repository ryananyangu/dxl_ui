import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

export default function IncomeForm({ data }) {
  const [method, setMethod] = useState(data["method"]);
  const [in_type, setIn_type] = useState(data["in_type"]);
  const [out_type, setOut_type] = useState(data["out_type"]);
  const [url, setUrl] = useState(data["url"]);
  const [serviceCode, SetServiceCode] = useState(data["serviceCode"]);

  return (
    <Card>
      <Card.Header>Core Setup form</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Outgoing request http method"
              value={method}
              onChange={(e) => {
                setMethod(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Incoming request type"
              value={in_type}
              onChange={(e) => {
                setIn_type(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Out going request type"
              value={out_type}
              onChange={(e) => {
                setOut_type(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Request service code"
              value={serviceCode}
              onChange={(e) => {
                SetServiceCode(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Outgoing request url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer>
        <Button>Done</Button>
      </Card.Footer>
    </Card>
  );
}
