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
import { HTTP_SUCCESS, PROCESS_ADD_URL } from "./utils/constants.js";
import { CustomContainer } from "./components/customContainer";
import JSEditor from "./components/JSEditor";

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
                  <JSEditor
                    header={"Pre send Script"}
                    next={"/response"}
                    code={Config.RequestBuildScript}
                    onChange={(code) => {
                      runInAction(() => {
                        Config.RequestBuildScript = code;
                      });
                    }}
                  />
                }
              />
              <Route
                exact
                path="/response"
                element={
                  <JSEditor
                    header={"Post Send Script"}
                    next={"/statics"}
                    code={Config.ResponseBuildScript}
                    onChange={(code) => {
                      runInAction(() => {
                        Config.ResponseBuildScript = code;
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
