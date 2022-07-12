import { Container, Row, Col, Tab, Nav, ProgressBar } from "react-bootstrap";
import { RequestBasics } from "./components/RequestBasics";
import { CodeEditor } from "./components/CodeEditor";
import InOutRequestMap from "./components/InOutRequestMap";
import HeaderSetup from "./components/HeaderSetup";
import "bootstrap/dist/css/bootstrap.min.css";
import { StaticInput } from "./components/StaticsInput";
import OutResponseChecker from "./components/OutResponseChecker";
import { useState } from "react";
import { CustomAlert } from "./components/CustomAlert";
import { OutInResponseMap } from "./components/OutInReponseMap";
import { GlobalContext, GlobalConfig } from "./data/State";
import { observer } from "mobx-react";

const HTTP_SUCCESS = 200;
const FLATJSONURL = "http://0.0.0.0:8080/api/v1/process/jsonflatten";
const XML2FLATJSON = "http://0.0.0.0:8080/api/v1/process/xmltoflatjson";

const Config = new GlobalConfig();

const App = observer(() => {
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

  const [inRequest, setInRequest] = useState("");
  const [outRequest, setOutRequest] = useState("");
  // const [inRequestKeys, setInRequestKeys] = useState([]);
  const [outRequestValues, setOutRequestValues] = useState([]);
  const [outResponse, setOutResponse] = useState("");
  const [inResponse, setInResponse] = useState("");
  const [inResponseKeys, setInResponseKeys] = useState([]);
  const [outResponseValues, setOutResponseValues] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const sendPostRequest = async (payload, headers, url) => {
    let final_response = {};
    let err;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: payload,
        headers: headers,
      });
      console.log(url, response.status);
      if (response.status === HTTP_SUCCESS) {
        const result = await response.json();
        final_response = result;
      } else {
        const result = await response.text();
        err = result;
      }
    } catch (error) {
      err = error;
    }
    return { response: final_response, error: err };
  };

  const routRequest = async (data, type) => {
    let response = {};
    if (type === "json") {
      let process_header = { "Content-Type": "application/json" };
      response = await sendPostRequest(data, process_header, FLATJSONURL);
    } else if (type === "xml") {
      let process_header = { "Content-Type": "application/xml" };
      response = await sendPostRequest(data, process_header, XML2FLATJSON);
    } else {
      response.response = "";
      response.err = "Unknown type" + Config.InRequestType;
    }
    return response;
  };

  const inRequestProcess = async (data) => {
    const { response, error } = await routRequest(data, Config.InRequestType);

    if (error) {
      setErrMsg(error);
      return;
    }
    setInRequest(data);

    Config.RequestKeys = [...Object.keys(response)];
  };

  const outRequestProcess = async (data) => {
    const { response, error } = await routRequest(data, Config.OutRequestType);
    if (error) {
      setErrMsg(error);
      return;
    }

    setOutRequest(data);
    setOutRequestValues([...Object.values(response)]);
  };
  const outResponseProcess = async (data) => {
    const { response, error } = await routRequest(data, Config.OutRequestType);
    if (error) {
      setErrMsg(error);
      return;
    }

    setOutResponse(data);
    setOutResponseValues([...Object.keys(response)]);
  };
  const inResponseProcess = async (data) => {
    console.log(data, Config.InRequestType);
    const { response, error } = await routRequest(data, Config.InRequestType);
    if (error) {
      setErrMsg(error);
      return;
    }
    console.log(response);

    setInResponse(data);
    setInResponseKeys([...Object.values(response)]);
  };

  return (
    <GlobalContext.Provider value={Config}>
      <Container fluid>
        {errMsg && (
          <CustomAlert
            body={errMsg}
            variant={"danger"}
            onClose={() => {
              setErrMsg("");
            }}
          />
        )}
        <br />
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <ProgressBar>
              <ProgressBar variant="success" now={0} />
            </ProgressBar>
          </Row>
          <br />
          <Row>
            <Col sm={2}>
              <Nav variant="pills" className="flex-column" activeKey={"first"}>
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
                  <Nav.Link eventKey="nineth">Out Success Check</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="tenth">Out to In Response Map</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="eleventh">Complete setup</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <RequestBasics lable={"Request Basics"} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <HeaderSetup lable={"Headers Setup"} />
                </Tab.Pane>

                <Tab.Pane eventKey="third">
                  <CodeEditor
                    lang={Config.InRequestType}
                    header={"In Request"}
                    data={inRequest}
                    getTransFormedData={inRequestProcess}
                  />
                </Tab.Pane>

                <Tab.Pane eventKey="fourth">
                  <CodeEditor
                    lang={Config.OutRequestType}
                    header={"Out Request"}
                    data={Config.RequestTemplate}
                    getTransFormedData={outRequestProcess}
                  />
                </Tab.Pane>

                <Tab.Pane eventKey="fifth">
                  <InOutRequestMap
                    lable={"In to Out Request Map"}
                    inlist={Config.RequestKeys}
                    outlist={outRequestValues}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="sixth">
                  <StaticInput
                    data={outRequestValues}
                    lable={"Statics Setup"}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="seventh">
                  <CodeEditor
                    lang={Config.OutRequestType}
                    header={"Out Response"}
                    data={apiResponsestring}
                    getTransFormedData={outResponseProcess}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="eigth">
                  <CodeEditor
                    lang={Config.InRequestType}
                    header={"In Response"}
                    data={receivedReqTemplate}
                    getTransFormedData={inResponseProcess}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="nineth">
                  <OutResponseChecker lable={"Out to In Response Map"} />
                </Tab.Pane>
                <Tab.Pane eventKey={"tenth"}>
                  <OutInResponseMap
                    lable={"Out to in Response Map"}
                    inreq={inRequestKeys}
                    inres={inResponseKeys}
                    outres={outResponseValues}
                    statics={Object.keys(Config.Static)}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="eleventh">Comming soon !!!</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </GlobalContext.Provider>
  );
});

export default App;
