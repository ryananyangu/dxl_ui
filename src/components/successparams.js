import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../data/State";
import CustomDropdown from "./CustomDropDown";
import { SUCCESS_TYPES } from "../utils/constants";
import { CustomContainer } from "./customContainer";

const OutResponseChecker = observer(() => {
  const [selectedSuccess, setSelectedSuccess] = useState(0);
  const Config = useContext(GlobalContext);
  const navigate = useNavigate();
  return (
    <>
      <CustomContainer title="Out to In Response Map" controls={<button
            onClick={() => {
              navigate("/complete");
            }}
          >
            Next
          </button>}>
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
                    Config.Success.Path = SUCCESS_TYPES[value];
                  });
                }}
              />
            )}
          </InputGroup>
      </CustomContainer>
    </>
  );
});

export default OutResponseChecker;
