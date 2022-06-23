import { useState } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import CustomDropdown from "./CustomDropDown";
import { ListSelected } from "./ListSelected";

const DropDownPrepo = (props) => {
  const [selectedInData, setSelectedInData] = useState(0);
  const [selectedOutData, setSelectedOutData] = useState(0);
  // const [mapping, setMapping] = useState(["Name", "value"]);
  let mappped = [];

  let data = {
    terminalMsgID: "payerTransactionID",
    msgID: "payerTransactionID",
    documentTypeID: "paymentExtraData.documentTypeID",
    clientNumber: "accountNumber",
    entityNumber: "paymentExtraData.entityNumber",
    documentYear: "paymentExtraData.documentYear",
    documentNumber: "paymentExtraData.documentYear",
    clientName: "customerName",
    purchaseValue: "amount",
  };

  let outdatalist = Object.keys(data);
  let indatalist = Object.values(data);

  // const handleAddMapping = (e) => {
  //   SelectionList.push(mapping);
  // };

  return (
    <Card>
      <Card.Header>{props.lable}</Card.Header>
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
                mappped.push([
                  indatalist[selectedInData],
                  outdatalist[selectedOutData],
                ]);
                // console.log(mappped);
                // handleAddMapping(e);
              }}
            >
              +
            </Button>
          </Col>
        </Row>
        <hr />
        {/* <ListSelected items={SelectionList} /> */}
        {/* FIXME: make sure to increase values in this everytime a click happens */}
      </Card.Body>
    </Card>
  );
};

export default DropDownPrepo;
