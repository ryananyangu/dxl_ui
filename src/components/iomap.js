import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { Button, Row, InputGroup, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../data/State";
import CustomDropdown from "./CustomDropDown";
import { ListSelected } from "./ListSelected";

const InOutRequestMap = observer(() => {
  const Config = useContext(GlobalContext);
  const navigate = useNavigate();
  const [selectedInData, setSelectedInData] = useState(0);
  const [selectedOutData, setSelectedOutData] = useState(0);

  const handleAddMapping = (e) => {
    let indata = Config.RequestKeys[selectedInData];
    let outdata = Config.OutRequestValues[selectedOutData];

    Config.Dynamic[outdata] = indata;
    setSelectedInData(0);
    setSelectedOutData(0);
  };

  return (
    <Card>
      <Card.Header>{"In to Out Request Map"}</Card.Header>
      <Card.Body>
        <Row>
          <InputGroup className="mb-3">
            <CustomDropdown
              items={Config.OutRequestValues}
              func={setSelectedOutData}
              lable={"Outgoing list"}
            />
            <CustomDropdown
              items={Config.RequestKeys}
              func={setSelectedInData}
              lable={"Recieved list"}
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
        <ListSelected
          items={Config.Dynamic}
          func={(item) => {
            runInAction(() => {
              delete Config.Dynamic[item];
            });
          }}
        />
      </Card.Body>
      <Card.Footer>
        <Button
          onClick={() => {
            navigate("/statics");
          }}
        >
          Next
        </Button>
      </Card.Footer>
    </Card>
  );
});

export default InOutRequestMap;
