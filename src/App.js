import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import RequestBasics from "./components/RequestBasics";
import CodeEditor from "./components/CodeEditor";
import InOutRequestMap from "./components/InOutRequestMap";
import HeaderSetup from "./components/HeaderSetup";
import "bootstrap/dist/css/bootstrap.min.css";
import { StaticInput } from "./components/StaticsInput";
import OutResponseChecker from "./components/OutResponseChecker";

function App() {
  let dynamicAttrMap = {
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

  let headersMapping = {
    "Content-Type": "text/xml;charset=UTF-8",
  };

  let incomingData = `{
    "paymentOverallStatus":"200",
    "amount":100,
    "MSISDN":"254722000000",
    "serviceCode":"FLBDR_254722000000",
    "paymentMode":"ONLINE",
    "beepTransactionID":3037981,
    "payerTransactionID":"HJ87678JHS-01",
    "accountNumber":"12878345098",
    "payerClientCode":"FLBDR",
    "customerName":"John Doe",
    "datePaymentReceived":"2020-01-01 00:00:00",
    "statusDescription":"Client has pending payments for processing",
    "paymentExtraData":{
        "entityNumber":"1001",
        "documentTypeID":"1",
        "documentYear":"2020"
    },
    "invoiceExtraData":"",
    "payerClientID":1,
    "narration":"Bill payment",
    "hubCreationDate":"2020-01-01 16:30:48",
    "invoiceNumber":"",
    "serviceID":1,
    "currencyCode":"KES",
    "statusCode":200
}`;

  let reqDefaultVals = {
    method: "POST",
    in_type: "json",
    out_type: "xml",
    url: "https://049b6cbd-12c2-4a3e-bdfe-bb1bbdd79603.mock.pstmn.io/api/v1/process/post/mock/1",
    serviceCode: "802002",
  };

  let outReqTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://topupretail.com/">
   <SOAP-ENV:Body>
      <ns1:AquaPayment>
         <ns1:req>
            <ns1:terminalMsgID>{terminalMsgID}</ns1:terminalMsgID>
            <ns1:terminalID>{terminalID}</ns1:terminalID>
            <ns1:msgID>{msgID}</ns1:msgID>
            <ns1:authCred>
               <ns1:opName>{opName}</ns1:opName>
               <ns1:password>{password}</ns1:password>
            </ns1:authCred>
            <ns1:clientNumber>{clientNumber}</ns1:clientNumber>
            <ns1:entityNumber>{entityNumber}</ns1:entityNumber>
            <ns1:documentTypeID>{documentTypeID}</ns1:documentTypeID>
            <ns1:documentYear>{documentYear}</ns1:documentYear>
            <ns1:documentNumber>{documentNumber}</ns1:documentNumber>
            <ns1:clientName>{clientName}</ns1:clientName>
            <ns1:purchaseValue>{purchaseValue}</ns1:purchaseValue>
            <ns1:receiptFormat>{receiptFormat}</ns1:receiptFormat>
            <ns1:terminalLocation />
            <ns1:terminalChannel>{terminalChannel}</ns1:terminalChannel>
            <ns1:terminalCompanyName>{terminalCompanyName}</ns1:terminalCompanyName>
            <ns1:terminalOperator>{terminalOperator}</ns1:terminalOperator>
         </ns1:req>
      </ns1:AquaPayment>
   </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

  let receivedReqTemplate = `{
    "packet":[
        {
            "narration":"{narration}",
            "statusDescription":"{statusDescription}",
            "receiptNumber":"{receiptNumber}",
            "statusCode":"{statusCode}",
            "payerTransactionID":"{payerTransactionID}",
            "beepTransactionID":"{beepTransactionID}",
            "amountExpected":"{amountExpected}"
        }
    ],
    "credentials":{
        "username":"{username}",
        "password":"{password}"
    }
}`;

  let apiResponsestring = `
<?xml version="1.0" encoding="UTF-8"?>
<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
   <Header />
   <Body>
      <SubmitSMResponse xmlns="http://www.openmindnetworks.com/SoS" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <smResponse>
            <commandStatus>0</commandStatus>
			<statusDescription>success</statusDescription>
            <messageId>02940001</messageId>
			<transactionID>HJ87678JHS-01</transactionID>
			<tpTrxID>3037981</tpTrxID>
            <tlvData />
         </smResponse>
      </SubmitSMResponse>
   </Body>
</Envelope>
`;

  let staticData = {
    terminalID: "000000",
    opName: "ZohariTech",
    terminalChannel: "Web",
    receiptFormat: "EN_GB",
    terminalCompanyName: "Zohari Tech Systems",
    terminalOperator: "Zohari",
    password: "Qwerty$123",
    in_password: "Kenya213456",
    in_username: "Binaryward",
    in_success_code: "200",
  };

  let outSuccessDef = {
    // type can be payload or http status
    type: "payload",
    code: "0",
    path: "Envelope.Body.SubmitSMResponse.smResponse.commandStatus",
  };

  return (
    <Container fluid>
      <br />
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Requests Basics</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Headers Setup</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">In Request</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">Out request</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth">In to Out Request Map</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sixth">Statics Map</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="seventh">Out Response</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="eigth">In Response</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="nineth">Out to In Response Map</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tenth">Test Config</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <RequestBasics data={reqDefaultVals} lable={"Request Basics"} />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <HeaderSetup data={headersMapping} lable={"Headers Setup"} />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <CodeEditor
                  lang={reqDefaultVals.in_type}
                  header={"In Request"}
                  data={incomingData}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <CodeEditor
                  lang={reqDefaultVals.out_type}
                  header={"Out Request"}
                  data={outReqTemplate}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="fifth">
                <InOutRequestMap
                  lable={"In to Out Request Map"}
                  data={dynamicAttrMap}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="sixth">
                <StaticInput data={staticData} lable={"Statics Setup"} />
              </Tab.Pane>
              <Tab.Pane eventKey="seventh">
                <CodeEditor
                  lang={reqDefaultVals.out_type}
                  header={"Out Response"}
                  data={apiResponsestring}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="eigth">
                <CodeEditor
                  lang={reqDefaultVals.in_type}
                  header={"In Response"}
                  data={receivedReqTemplate}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="nineth">
                <OutResponseChecker
                  data={outSuccessDef}
                  lable={"Out to In Response Map"}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="tenth">Comming soon !!!</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default App;
