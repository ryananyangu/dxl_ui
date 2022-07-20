import { Container } from "react-bootstrap";
import { RequestBasics } from "./components/basics";
import HeaderSetup from "./components/headers";
import "bootstrap/dist/css/bootstrap.min.css";
import { StaticInput } from "./components/statics";
import { useState } from "react";
import { CustomAlert } from "./components/CustomAlert";
import { GlobalContext, GlobalConfig } from "./data/State";
import { observer } from "mobx-react";
import { runInAction } from "mobx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CustomNavBar } from "./components/CustomNavBar";
import { CodeEditor } from "./components/CodeEditor";
import { HTTP_SUCCESS, PROCESS_ADD_URL } from "./utils/constants.js";
import { CustomContainer } from "./components/customContainer";

const Config = new GlobalConfig();

const App = observer(() => {
  // const [inRequest, setInRequest] = useState("");
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
          <CustomNavBar>
            <Routes>
              <Route exact path="/" element={<RequestBasics />} />
              <Route exact path="/headers" element={<HeaderSetup />} />
              <Route
                exact
                path="/request"
                element={
                  <CodeEditor
                    header={"Request Build script panel"}
                    data={"inRequest"}
                    onChange={(value) => {
                      // FIXME:
                      // setInRequest(value);
                    }}
                    next={"/response"}
                    getTransFormedData={() => {
                      runInAction(async () => {
                        // FIXME:
                        console.log("FIXME");
                      });
                    }}
                  />
                }
              />
              <Route
                exact
                path="/response"
                element={
                  <CodeEditor
                    header={"Response build script panel"}
                    data={"//TODO: Your transformation here"}
                    onChange={(value) => {
                      runInAction(() => {
                        // FIXME:
                        // Config.RequestTemplate = value;
                      });
                    }}
                    next={"/statics"}
                    getTransFormedData={() => {
                      runInAction(() => {
                        // FIXME:
                        // outRequestProcess();
                      });
                    }}
                  />
                }
              />
              <Route exact path="/statics" element={<StaticInput />} />
              <Route
                exact
                path="/complete"
                element={
                  <>
                    <CustomContainer
                      controls={
                        <button
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
                        </button>
                      }
                    >
                      Comming soon !!!
                    </CustomContainer>
                  </>
                }
              />
            </Routes>
          </CustomNavBar>
        </Container>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
});

export default App;
