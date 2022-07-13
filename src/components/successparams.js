import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { Card, Button, InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../data/State";
import CustomDropdown from "./CustomDropDown";

const SUCCESS_TYPES = ["PAYLOAD", "HTTP"];
const OutResponseChecker = observer(() => {
  const [selectedSuccess, setSelectedSuccess] = useState(0);
  const Config = useContext(GlobalContext);
  const navigate = useNavigate();
  return (
    <>
      <Card>
        <Card.Header>{"Out to In Response Map"}</Card.Header>
        <Card.Body>
          <InputGroup>
            <CustomDropdown
              func={(value) => {
                setSelectedSuccess(value);
              }}
              items={SUCCESS_TYPES}
            />
            <Form.Control
              // name={"Code"}
              value={Config.Success.Code}
              type="text"
              placeholder={"Success Code"}
              onChange={(e) => {
                runInAction(() => {
                  Config.Success.Code = e.currentTarget.value;
                });
              }}
            />
            {selectedSuccess === 0 && (
              <CustomDropdown
                items={Config.OutResponseKeys}
                func={(value) => {
                  runInAction(() => {
                    Config.Success.Path = Config.OutResponseKeys[value];
                  });
                }}
              />
            )}
          </InputGroup>
        </Card.Body>
        <Card.Footer>
          <Button
            onClick={() => {
              navigate("/complete");
            }}
          >
            Next
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
});

export default OutResponseChecker;
