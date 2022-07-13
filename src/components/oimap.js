import { Button, Card, InputGroup, Row } from "react-bootstrap";
import CustomDropdown from "./CustomDropDown";
import { ListSelected } from "./ListSelected";
import { useContext, useState } from "react";
import { observer } from "mobx-react";
import { GlobalContext } from "../data/State";
import { runInAction } from "mobx";
import { useNavigate } from "react-router-dom";

const MAP_TYPE = ["IN_REQUEST", "STATIC", "OUT_RESPONSE"];
export const OutInResponseMap = observer(() => {
  const Config = useContext(GlobalContext);
  const navigate = useNavigate();

  const [selectedInData, setSelectedInData] = useState(0);
  const [selectedOutData, setSelectedOutData] = useState(0);
  const [selectedType, setSelectedType] = useState(0);

  const handleAddMapping = () => {
    console.log(selectedOutData, selectedInData);
    let val = "";
    if (selectedType === 0) {
      val = "in_request." + Config.RequestKeys[selectedOutData];
    } else if (selectedType === 1) {
      val = "static." + Object.keys(Config.Static)[selectedOutData];
    } else {
      val = Config.OutResponseKeys[selectedOutData];
    }

    let indata = Config.InResponseValues[selectedInData];
    Config.ResponseDynamic[indata] = val;
    setSelectedInData(0);
    setSelectedOutData(0);
  };

  return (
    <Card>
      <Card.Header>{"Out to in Response Map"}</Card.Header>
      <Card.Body>
        <Row>
          <InputGroup className="mb-3">
            <CustomDropdown
              items={MAP_TYPE}
              lable={"Select list type"}
              func={(selected) => {
                runInAction(() => {
                  setSelectedType(selected);
                });
              }}
            />
            {selectedType === 0 && (
              <CustomDropdown
                items={Config.RequestKeys}
                func={(selection) => {
                  setSelectedOutData(selection);
                }}
                lable={"Request keys list"}
              />
            )}

            {selectedType === 1 && (
              <CustomDropdown
                items={Object.keys(Config.Static)}
                func={(selection) => {
                  setSelectedOutData(selection);
                }}
                lable={"Static Keys list"}
              />
            )}

            {selectedType === 2 && (
              <CustomDropdown
                items={Config.OutResponseKeys}
                func={(selection) => {
                  setSelectedOutData(selection);
                }}
                lable={"Out Response values list"}
              />
            )}
            <CustomDropdown
              items={Config.InResponseValues}
              func={(selection) => {
                setSelectedInData(selection);
              }}
              lable={"In Response list"}
            />
            <Button
              variant="success"
              onClick={() => {
                runInAction(() => {
                  handleAddMapping();
                });
              }}
            >
              +
            </Button>
          </InputGroup>
        </Row>
        <hr />
        <ListSelected
          items={Config.ResponseDynamic}
          func={(itemName) => {
            runInAction(() => {
              delete Config.ResponseDynamic[itemName];
            });
          }}
        />
      </Card.Body>
      <Card.Footer>
        <Button
          onClick={() => {
            navigate("/success");
          }}
        >
          Next
        </Button>
      </Card.Footer>
    </Card>
  );
});
