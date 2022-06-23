import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

export default function IncomeForm() {
  let data = {
    method: "POST",
    in_type: "JSON",
    out_type: "XML",
    url: "https://049b6cbd-12c2-4a3e-bdfe-bb1bbdd79603.mock.pstmn.io/api/v1/process/post/mock/1",
    serviceCode: "802002",
    requestTemplate:
      '<?xml version="1.0" encoding="UTF-8"?><SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://topupretail.com/"><SOAP-ENV:Body><ns1:AquaPayment><ns1:req><ns1:terminalMsgID>{terminalMsgID}</ns1:terminalMsgID><ns1:terminalID>{terminalID}</ns1:terminalID><ns1:msgID>{msgID}</ns1:msgID><ns1:authCred><ns1:opName>{opName}</ns1:opName><ns1:password>{password}</ns1:password></ns1:authCred><ns1:clientNumber>{clientNumber}</ns1:clientNumber><ns1:entityNumber>{entityNumber}</ns1:entityNumber><ns1:documentTypeID>{documentTypeID}</ns1:documentTypeID><ns1:documentYear>{documentYear}</ns1:documentYear><ns1:documentNumber>{documentNumber}</ns1:documentNumber><ns1:clientName>{clientName}</ns1:clientName><ns1:purchaseValue>{purchaseValue}</ns1:purchaseValue><ns1:receiptFormat>{receiptFormat}</ns1:receiptFormat><ns1:terminalLocation /><ns1:terminalChannel>{terminalChannel}</ns1:terminalChannel><ns1:terminalCompanyName>{terminalCompanyName}</ns1:terminalCompanyName><ns1:terminalOperator>{terminalOperator}</ns1:terminalOperator></ns1:req></ns1:AquaPayment></SOAP-ENV:Body></SOAP-ENV:Envelope>',
  };
  const [method, setMethod] = useState(data["method"]);
  const [in_type, setIn_type] = useState(data["in_type"]);
  const [out_type, setOut_type] = useState(data["out_type"]);
  const [url, setUrl] = useState(data["url"]);
  const [serviceCode, SetServiceCode] = useState(data["serviceCode"]);

  return (
    <Card>
      <Card.Header>Core Setup form</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Outgoing request http method"
              value={method}
              onChange={(e) => {
                setMethod(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Incoming request type"
              value={in_type}
              onChange={(e) => {
                setIn_type(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Out going request type"
              value={out_type}
              onChange={(e) => {
                setOut_type(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Request service code"
              value={serviceCode}
              onChange={(e) => {
                SetServiceCode(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              type="text"
              placeholder="Outgoing request url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </Form.Group>

          <Button>Next</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
