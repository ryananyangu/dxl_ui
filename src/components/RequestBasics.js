import React, { useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { GlobalContext } from "../data/State";
import { observer } from "mobx-react";
import { runInAction } from "mobx";
export const RequestBasics = observer(({ lable }) => {
  const config = useContext(GlobalContext);

  return (
    <Card>
      <Card.Header>{lable}</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Out request method"
              value={config.HTTPMethod}
              onChange={(e) => {
                runInAction(() => {
                  config.HTTPMethod = e.currentTarget.value;
                });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="In request type"
              value={config.InRequestType}
              onChange={(e) => {
                runInAction(() => {
                  config.InRequestType = e.currentTarget.value;
                });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Out request type"
              value={config.OutRequestType}
              onChange={(e) => {
                runInAction(() => {
                  config.OutRequestType = e.currentTarget.value;
                });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Service code"
              value={config.ServiceCode}
              onChange={(e) => {
                runInAction(() => {
                  config.ServiceCode = e.currentTarget.value;
                });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Out request url"
              value={config.Endpoint}
              onChange={(e) => {
                runInAction(() => {
                  config.Endpoint = e.currentTarget.value;
                });
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
});
