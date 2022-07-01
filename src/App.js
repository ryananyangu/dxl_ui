import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import RequestBasics from "./components/RequestBasics";
import CodeEditor from "./components/CodeEditor";
import InOutRequestMap from "./components/InOutRequestMap";
import HeaderSetup from "./components/HeaderSetup";
import "bootstrap/dist/css/bootstrap.min.css";
import { StaticInput } from "./components/StaticsInput";
import OutResponseChecker from "./components/OutResponseChecker";
import { useState } from "react";

const HTTP_SUCCESS = 200;
const FLATJSONURL = "http://0.0.0.0:8080/api/v1/process/jsonflatten";
const XML2FLATJSON = "http://0.0.0.0:8080/api/v1/process/xmltoflatjson";

function App() {
  // Schema
  let reqBasics = {
    method: "",
    in_type: "",
    out_type: "",
    url: "",
    serviceCode: "",
  };

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

  // schema
  let outSuccessDef = {
    type: "",
    code: "",
    path: "",
  };

  const [basics, setBasics] = useState(reqBasics);
  const [headers, setHeaders] = useState({});
  const [inRequest, setInRequest] = useState("");
  const [outRequest, setOutRequest] = useState("");
  const [staticData, setStaticData] = useState({});
  const [inRequestKeys, setInRequestKeys] = useState([]);
  const [outRequestValues, setOutRequestValues] = useState([]);
  const [IOReqMap, setIORequestMap] = useState({});

  const getBasics = (data) => {
    setBasics({ ...data });
  };

  const getHeaders = (data) => {
    setHeaders({ ...data });
  };

  const getStatics = (data) => {
    setStaticData({ ...data });
  };

  const getIORequestMap = (data) => {
    setIORequestMap(data);
    console.log(IOReqMap);
  };
  const sendPostRequest = (payload, headers, url) => {
    let completeresponse = {};
    try {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({ ...payload }),
        headers: {
          ...headers,
        },
      }).then((response) => {
        if (response.status === HTTP_SUCCESS) {
          response.json().then((result) => {
            console.log(result);
            completeresponse = result;
          });
        } else {
          response.text().then((result) => {
            console.log(result);
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
    console.log(completeresponse);
    return completeresponse;
  };
  const inRequestProcess = (data) => {
    let response;
    setInRequest(data);

    if (basics.in_type === "json") {
      let process_header = { "Content-Type": "application/json" };
      response = sendPostRequest(data, process_header, FLATJSONURL);
    } else if (basics.in_type === "xml") {
      let process_header = { "Content-Type": "application/xml" };
      response = sendPostRequest(data, process_header, XML2FLATJSON);
    } else {
      // FIXME: Unknown type
      console.error("Unknown type", basics.in_type);
    }
    if (response) {
      setInRequestKeys([...Object.keys(response)]);
    } else {
      // FIXME: Create an error displayer
      console.error("response empty");
    }
  };

  const outRequestProcess = (data) => {
    let response;
    setOutRequest(data);

    if (basics.out_type === "json") {
      let process_header = { "Content-Type": "application/json" };
      response = sendPostRequest(data, process_header, FLATJSONURL);
    } else if (basics.out_type === "xml") {
      let process_header = { "Content-Type": "application/xml" };
      response = sendPostRequest(data, process_header, XML2FLATJSON);
    } else {
      // FIXME: Unknown type
      console.error("Unknown type", basics);
      return;
    }
    if (response) {
      setOutRequestValues([...Object.values(response)]);
    } else {
      // FIXME: Create an error displayer
      console.error("response empty", basics);
      return;
    }

    // FIXME: update this using keys and values setInOutRequestMap

    console.log(outRequestValues);
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
              {basics.in_type && (
                <Nav.Item>
                  <Nav.Link eventKey="third">In Request</Nav.Link>
                </Nav.Item>
              )}
              {basics.out_type && (
                <Nav.Item>
                  <Nav.Link eventKey="fourth">Out request</Nav.Link>
                </Nav.Item>
              )}
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
                <RequestBasics
                  data={basics}
                  lable={"Request Basics"}
                  getBasics={getBasics}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <HeaderSetup
                  data={headers}
                  lable={"Headers Setup"}
                  getHeaders={getHeaders}
                />
              </Tab.Pane>
              {basics.in_type && (
                <Tab.Pane eventKey="third">
                  <CodeEditor
                    lang={basics.in_type}
                    header={"In Request"}
                    data={inRequest}
                    getTransFormedData={inRequestProcess}
                  />
                </Tab.Pane>
              )}
              {basics.out_type && (
                <Tab.Pane eventKey="fourth">
                  <CodeEditor
                    lang={basics.out_type}
                    header={"Out Request"}
                    data={outRequest}
                    getTransFormedData={outRequestProcess}
                  />
                </Tab.Pane>
              )}

              <Tab.Pane eventKey="fifth">
                <InOutRequestMap
                  lable={"In to Out Request Map"}
                  inlist={inRequestKeys}
                  outlist={outRequestValues}
                  getIORequestMap={getIORequestMap}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="sixth">
                <StaticInput
                  data={staticData}
                  lable={"Statics Setup"}
                  getStatics={getStatics}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="seventh">
                <CodeEditor
                  lang={basics.out_type}
                  header={"Out Response"}
                  data={apiResponsestring}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="eigth">
                <CodeEditor
                  lang={basics.in_type}
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
