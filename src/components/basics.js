import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { GlobalContext } from "../data/State";
import { observer } from "mobx-react";
import { runInAction } from "mobx";
import { useNavigate } from "react-router-dom";
import { ObjectID } from "bson";
import { CustomContainer } from "./customContainer";
export const RequestBasics = observer(() => {
  const config = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <CustomContainer title="Request Basics" controls={<button
      onClick={() => {
        runInAction(() => {
          const id = new ObjectID();
          config.ServiceCode = id.toString();
        });
        //FIXME: Validate the items above have been setup correctly
        navigate("/headers");
      }}
    >
      Next
    </button>}>
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
    </CustomContainer>
  );
});
