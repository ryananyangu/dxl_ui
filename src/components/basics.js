import React, { useContext } from "react";
import { Form, InputGroup } from "react-bootstrap";
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
    <CustomContainer
      title="Basics setup"
      controls={
        <button
          onClick={() => {
            runInAction(() => {
              const id = new ObjectID();
              config.ServiceCode =
                "https://api/api/v1/process/post/" + id.toString();
            });
            navigate("/headers");
          }}
        >
          Next
        </button>
      }
    >
      <InputGroup>
        <Form.Select
          variant="outline-secondary"
          onChange={(e) => {
            console.log(parseInt(e.currentTarget.value));
          }}
        >
          {["POST", "GET"].map((item, index) => {
            return (
              <option value={index} key={index}>
                {item}
              </option>
            );
          })}
        </Form.Select>
        <Form.Control
          type="text"
          placeholder="API endpoint url"
          value={config.Endpoint}
          onChange={(e) => {
            runInAction(() => {
              config.Endpoint = e.currentTarget.value;
            });
          }}
        />
      </InputGroup>
    </CustomContainer>
  );
});
