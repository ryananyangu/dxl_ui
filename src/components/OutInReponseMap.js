import { Button, Card, InputGroup, Row } from "react-bootstrap";
import CustomDropdown from "./CustomDropDown";
import { ListSelected } from "./ListSelected";
import { useState } from "react";

const MAP_TYPE = ["IN_REQUEST", "STATIC", "OUT_RESPONSE"];
export const OutInResponseMap = ({
  outres,
  inres,
  statics,
  inreq,
  lable,
  getIORequestMap,
}) => {
  const [selectedInData, setSelectedInData] = useState(0);
  const [selectedOutData, setSelectedOutData] = useState(0);
  const [selectedType, setSelectedType] = useState(0);
  const [listToDisplay, setListToDisplay] = useState(inreq);
  const [mapping, setMapping] = useState({});

  // useEffect(() => {

  // }, [selectedType, inreq, outres, statics]);
  const dynamicList = (data) => {
    setSelectedType(data);
    if (selectedType === 0) {
      setListToDisplay(inreq);
    } else if (selectedType === 1) {
      setListToDisplay(statics);
    } else {
      setListToDisplay(outres);
    }
    console.log("selected type changed", MAP_TYPE[selectedType], listToDisplay);
  };

  // FIXME: Update with third dropdown introduced.
  const handleAddMapping = (e) => {
    let indata = outres[selectedInData];
    let outdata = inres[selectedOutData];
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
              items={MAP_TYPE}
              func={dynamicList}
              lable={"Select list type"}
            />

            {/* shift input list based on selected type */}
            <CustomDropdown
              items={listToDisplay}
              func={setSelectedOutData}
              lable={"Input list"}
            />
            <CustomDropdown
              items={inres}
              func={setSelectedInData}
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
      </Card.Body>
      <Card.Footer>
        <Button onClick={onDoneHandler}>Done</Button>
      </Card.Footer>
    </Card>
  );
};
