import { useState } from "react";
import { Button, Row, InputGroup, Card } from "react-bootstrap";
import CustomDropdown from "./CustomDropDown";
import { ListSelected } from "./ListSelected";

const InOutRequestMap = ({ inlist, outlist, lable, getIORequestMap }) => {
  const [selectedInData, setSelectedInData] = useState(0);
  const [selectedOutData, setSelectedOutData] = useState(0);
  const [mapping, setMapping] = useState({});

  const handleAddMapping = (e) => {
    let indata = inlist[selectedInData];
    let outdata = outlist[selectedOutData];
    let mappped = mapping;
    mappped[indata] = outdata;
    setMapping(mappped);
    setSelectedInData(0);
    setSelectedOutData(0);
  };

  const handleRemove = (itemName) => {
    let tmp = { ...mapping };
    delete tmp[itemName];
    setMapping(tmp);
    setSelectedInData(0);
    setSelectedOutData(0);
  };

  const onDoneHandler = () => {
    getIORequestMap({ ...mapping });
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
        <ListSelected items={mapping} func={handleRemove} />
        {/* FIXME: handle remove doesnt update the UI render */}
      </Card.Body>
      <Card.Footer>
        <Button onClick={onDoneHandler}>Done</Button>
      </Card.Footer>
    </Card>
  );
};

export default InOutRequestMap;
