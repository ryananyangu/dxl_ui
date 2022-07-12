import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { Button, Row, InputGroup, Card } from "react-bootstrap";
import { GlobalContext } from "../data/State";
import CustomDropdown from "./CustomDropDown";
import { ListSelected } from "./ListSelected";

const InOutRequestMap = observer(({ inlist, outlist, lable }) => {
  const Config = useContext(GlobalContext);
  const [selectedInData, setSelectedInData] = useState(0);
  const [selectedOutData, setSelectedOutData] = useState(0);

  const handleAddMapping = (e) => {
    let indata = inlist[selectedInData];
    let outdata = outlist[selectedOutData];

    Config.Dynamic[indata] = outdata;
    setSelectedInData(0);
    setSelectedOutData(0);
  };

  return (
    <Card>
      <Card.Header>{lable}</Card.Header>
      <Card.Body>
        <Row>
          <InputGroup className="mb-3">
            <CustomDropdown
              items={inlist}
              func={setSelectedInData}
              lable={"Input list"}
            />
            <CustomDropdown
              items={outlist}
              func={setSelectedOutData}
              lable={"Output list"}
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
        <Button>Done</Button>
      </Card.Footer>
    </Card>
  );
});

export default InOutRequestMap;
