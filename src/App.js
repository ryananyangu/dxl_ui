import {
  Container,
  Row,
  Col,
  Tab,
  Nav,
  ProgressBar,
  Card,
  Button,
} from "react-bootstrap";
import { RequestBasics } from "./components/RequestBasics";
import InOutRequestMap from "./components/InOutRequestMap";
import Editor from "@monaco-editor/react";
import HeaderSetup from "./components/HeaderSetup";
import "bootstrap/dist/css/bootstrap.min.css";
import { StaticInput } from "./components/StaticsInput";
import OutResponseChecker from "./components/OutResponseChecker";
import { useState } from "react";
import { CustomAlert } from "./components/CustomAlert";
import { OutInResponseMap } from "./components/OutInReponseMap";
import { GlobalContext, GlobalConfig } from "./data/State";
import { observer } from "mobx-react";
import { runInAction } from "mobx";

const HTTP_SUCCESS = 200;
const FLATJSONURL = "http://0.0.0.0:8080/api/v1/process/jsonflatten";
const XML2FLATJSON = "http://0.0.0.0:8080/api/v1/process/xmltoflatjson";

const Config = new GlobalConfig();

const App = observer(() => {
  const [inRequest, setInRequest] = useState("");
  const [outResponse, setOutResponse] = useState("");
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

  const inRequestProcess = async () => {
    const { response, error } = await routRequest(
      inRequest,
      Config.InRequestType
    );

    if (error) {
      setErrMsg(error);
      return;
    }

    return response;
  };

  const outRequestProcess = async () => {
    const { response, error } = await routRequest(
      Config.RequestTemplate,
      Config.OutRequestType
    );
    if (error) {
      setErrMsg(error);
      return;
    }
    Config.OutRequestValues = [...Object.values(response)];
  };
  const outResponseProcess = async () => {
    const { response, error } = await routRequest(
      outResponse,
      Config.OutRequestType
    );
    if (error) {
      setErrMsg(error);
      return;
    }
    Config.OutResponseKeys = [...Object.keys(response)];
  };
  const inResponseProcess = async () => {
    const { response, error } = await routRequest(
      Config.ResponseTemplate,
      Config.InRequestType
    );
    if (error) {
      setErrMsg(error);
      return;
    }
    Config.InResponseValues = [...Object.values(response)];
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
              <Nav
                variant="pills"
                className="flex-column"
                activeKey={Config.ActiveMenu}
              >
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
                  <Card>
                    <Card.Header>{"In Request"}</Card.Header>
                    <Card.Body>
                      <Editor
                        height="50vh"
                        defaultLanguage={Config.InRequestType}
                        defaultValue={inRequest}
                        theme="vs-dark"
                        onChange={(value) => {
                          setInRequest(value);
                        }}
                      />
                      <Button
                        variant="primary"
                        onClick={() => {
                          runInAction(async () => {
                            const response = await inRequestProcess();
                            Config.RequestKeys = [...Object.keys(response)];
                          });
                        }}
                      >
                        Convert code
                      </Button>
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                <Tab.Pane eventKey="fourth">
                  <Card>
                    <Card.Header>{"Out Request"}</Card.Header>
                    <Card.Body>
                      <Editor
                        height="50vh"
                        defaultLanguage={Config.OutRequestType}
                        defaultValue={Config.RequestTemplate}
                        theme="vs-dark"
                        onChange={(value) => {
                          runInAction(() => {
                            Config.RequestTemplate = value;
                          });
                        }}
                      />
                      <Button
                        variant="primary"
                        onClick={() => {
                          runInAction(() => {
                            outRequestProcess();
                          });
                        }}
                      >
                        Convert code
                      </Button>
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                <Tab.Pane eventKey="fifth">
                  <InOutRequestMap
                    lable={"In to Out Request Map"}
                    inlist={Config.RequestKeys}
                    outlist={Config.OutRequestValues}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="sixth">
                  <StaticInput
                    data={Config.OutRequestValues}
                    lable={"Statics Setup"}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="seventh">
                  <Card>
                    <Card.Header>{"Out Response"}</Card.Header>
                    <Card.Body>
                      <Editor
                        height="50vh"
                        defaultLanguage={Config.OutRequestType}
                        defaultValue={outResponse}
                        theme="vs-dark"
                        onChange={(value) => {
                          runInAction(() => {
                            setOutResponse(value);
                          });
                        }}
                      />
                      <Button
                        variant="primary"
                        onClick={() => {
                          runInAction(() => {
                            outResponseProcess();
                          });
                        }}
                      >
                        Convert code
                      </Button>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="eigth">
                  <Card>
                    <Card.Header>{"In Response"}</Card.Header>
                    <Card.Body>
                      <Editor
                        height="50vh"
                        defaultLanguage={Config.InRequestType}
                        defaultValue={Config.ResponseTemplate}
                        theme="vs-dark"
                        onChange={(value) => {
                          runInAction(() => {
                            Config.ResponseTemplate = value;
                          });
                        }}
                      />
                      <Button
                        variant="primary"
                        onClick={() => {
                          runInAction(() => {
                            inResponseProcess();
                          });
                        }}
                      >
                        Convert code
                      </Button>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="nineth">
                  <OutResponseChecker lable={"Out to In Response Map"} />
                </Tab.Pane>
                <Tab.Pane eventKey={"tenth"}>
                  <OutInResponseMap />
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
