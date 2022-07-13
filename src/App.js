import { Container } from "react-bootstrap";
import { RequestBasics } from "./components/RequestBasics";
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
import { runInAction } from "mobx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CodeEditor } from "./components/CodeEditor";

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
          <Navbar />
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
                  getTransFormedData={(value) => {
                    runInAction(() => {
                      setInRequest(value);
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
                  getTransFormedData={(value) => {
                    runInAction(() => {
                      Config.RequestTemplate = value;
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
                    console.log(value);
                  }}
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
                  getTransFormedData={(value) => {
                    runInAction(() => {
                      inResponseProcess();
                    });
                  }}
                />
              }
            />
            <Route exact path="/responsemap" element={<OutInResponseMap />} />
            <Route exact path="/success" element={<OutResponseChecker />} />
            <Route exact path="/complete" element={<>Comming soon !!!</>} />
          </Routes>
        </Container>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
});

export default App;
