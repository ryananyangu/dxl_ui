import { useEffect, useState } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import CustomDropdown from "./CustomDropDown";
import { ListSelected } from "./ListSelected";

const InOutRequestMap = ({ data, lable }) => {
  const [selectedInData, setSelectedInData] = useState(0);
  const [selectedOutData, setSelectedOutData] = useState(0);
  const [mapping, setMapping] = useState({});

  useEffect(() => {});

  let outdatalist = Object.keys(data);
  let indatalist = Object.values(data);

  const handleAddMapping = (e) => {
    let indata = indatalist[selectedInData];
    let outdata = outdatalist[selectedOutData];
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

  return (
    <Card>
      <Card.Header>{lable}</Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <CustomDropdown
              items={indatalist}
              func={setSelectedInData}
              lable={"Input list"}
            />
          </Col>
          <Col>
            <CustomDropdown
              items={outdatalist}
              func={setSelectedOutData}
              lable={"Output list"}
            />
          </Col>
          <Col md={2}>
            <Button
              variant="success"
              onClick={(e) => {
                handleAddMapping(e);
              }}
            >
              +
            </Button>
          </Col>
        </Row>
        <hr />
        <ListSelected items={mapping} func={handleRemove} />
        {/* FIXME: handle remove doesnt update the UI render */}
      </Card.Body>
      <Card.Footer>
        <Button>Done</Button>
      </Card.Footer>
    </Card>
  );
};

export default InOutRequestMap;
