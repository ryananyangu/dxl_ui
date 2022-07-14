import { Button, Card, Container } from "react-bootstrap";
import { RequestBasics } from "./components/basics";
import InOutRequestMap from "./components/iomap";
import HeaderSetup from "./components/headers";
import "bootstrap/dist/css/bootstrap.min.css";
import { StaticInput } from "./components/statics";
import OutResponseChecker from "./components/successparams";
import { useState } from "react";
import { CustomAlert } from "./components/CustomAlert";
import { OutInResponseMap } from "./components/oimap";
import { GlobalContext, GlobalConfig } from "./data/State";
import { observer } from "mobx-react";
import { runInAction } from "mobx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CustomNavBar } from "./components/CustomNavBar";
import { CodeEditor } from "./components/CodeEditor";
import {
  FLATJSON_URL,
  HTTP_SUCCESS,
  PROCESS_ADD_URL,
  XML2FLATJSON_URL,
} from "./utils/constants.js";

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
      response = await sendPostRequest(data, process_header, FLATJSON_URL);
    } else if (type === "xml") {
      let process_header = { "Content-Type": "application/xml" };
      response = await sendPostRequest(data, process_header, XML2FLATJSON_URL);
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
    setInRequest("");
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
    <BrowserRouter>
      <GlobalContext.Provider value={Config}>
        <Container>
          {errMsg && (
            <CustomAlert
              body={errMsg}
              variant={"danger"}
              onClose={() => {
                setErrMsg("");
              }}
            />
          )}
          <CustomNavBar />
          <br />

          <Routes>
            <Route exact path="/" element={<RequestBasics />} />
            <Route exact path="/headers" element={<HeaderSetup />} />
            <Route
              exact
              path="/inrequest"
              element={
                <CodeEditor
                  lang={Config.InRequestType}
                  header={"In Request"}
                  data={inRequest}
                  onChange={(value) => {
                    setInRequest(value);
                  }}
                  next={"/outrequest"}
                  getTransFormedData={() => {
                    runInAction(async () => {
                      const response = await inRequestProcess();
                      Config.RequestKeys = [...Object.keys(response)];
                    });
                  }}
                />
              }
            />
            <Route
              exact
              path="/outrequest"
              element={
                <CodeEditor
                  lang={Config.OutRequestType}
                  header={"Out Request"}
                  data={Config.RequestTemplate}
                  onChange={(value) => {
                    runInAction(() => {
                      Config.RequestTemplate = value;
                    });
                  }}
                  next={"/requestmap"}
                  getTransFormedData={() => {
                    runInAction(() => {
                      outRequestProcess();
                    });
                  }}
                />
              }
            />
            <Route exact path="/requestmap" element={<InOutRequestMap />} />
            <Route exact path="/statics" element={<StaticInput />} />
            <Route
              exact
              path="/outresponse"
              element={
                <CodeEditor
                  lang={Config.OutRequestType}
                  header={"Out Response"}
                  data={outResponse}
                  onChange={(value) => {
                    setOutResponse(value);
                  }}
                  next={"/inreponse"}
                  getTransFormedData={() => {
                    runInAction(() => {
                      outResponseProcess();
                    });
                  }}
                />
              }
            />
            <Route
              exact
              path="/inreponse"
              element={
                <CodeEditor
                  lang={Config.InRequestType}
                  header={"Out Response"}
                  data={Config.ResponseTemplate}
                  onChange={(value) => {
                    Config.ResponseTemplate = value;
                  }}
                  next={"/responsemap"}
                  getTransFormedData={() => {
                    runInAction(() => {
                      inResponseProcess();
                    });
                  }}
                />
              }
            />
            <Route exact path="/responsemap" element={<OutInResponseMap />} />
            <Route exact path="/success" element={<OutResponseChecker />} />
            <Route
              exact
              path="/complete"
              element={
                <>
                  <Card>
                    Comming soon !!!
                    <Button
                      onClick={async () => {
                        let resp = await sendPostRequest(
                          JSON.stringify(Config),
                          { "Content-Type": "application/json" },
                          PROCESS_ADD_URL
                        );
                        console.log(resp);
                      }}
                    >
                      Check
                    </Button>
                  </Card>
                </>
              }
            />
          </Routes>
        </Container>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
});

export default App;
