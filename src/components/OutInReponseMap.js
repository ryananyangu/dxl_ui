import { Button, Card, InputGroup, Row } from "react-bootstrap";
import CustomDropdown from "./CustomDropDown";
import { ListSelected } from "./ListSelected";
import { useContext, useState } from "react";
import { observer } from "mobx-react";
import { GlobalContext } from "../data/State";
import { runInAction } from "mobx";

const MAP_TYPE = ["IN_REQUEST", "STATIC", "OUT_RESPONSE"];
export const OutInResponseMap = observer(
  ({ outres, inres, statics, inreq, lable }) => {
    const Config = useContext(GlobalContext);

    const [selectedInData, setSelectedInData] = useState(0);
    const [selectedOutData, setSelectedOutData] = useState(0);
    // const [listToDisplay, setListToDisplay] = useState(inreq);
    let listToDisplay = [];

    // FIXME: Update with third dropdown introduced.
    const handleAddMapping = (e) => {
      let indata = outres[selectedInData];
      let outdata = inres[selectedOutData];
      Config.ResponseDynamic[indata] = outdata;
      setSelectedInData(0);
      setSelectedOutData(0);
    };

    return (
      <Card>
        <Card.Header>{lable}</Card.Header>
        <Card.Body>
          <Row>
            <InputGroup className="mb-3">
              <CustomDropdown
                items={MAP_TYPE}
                func={(selected) => {
                  runInAction(() => {
                    Config.ActiveList = selected;
                    if (Config.ActiveList === 0) {
                      listToDisplay = inreq;
                    } else if (Config.ActiveList === 1) {
                      listToDisplay = statics;
                    } else {
                      listToDisplay = outres;
                    }
                    console.log(Config.ActiveList, listToDisplay);
                  });
                }}
                lable={"Select list type"}
              />

              {/* shift input list based on selected type */}
              <CustomDropdown
                items={listToDisplay}
                func={setSelectedOutData}
                lable={"Input list"}
              />
              <CustomDropdown
                items={inres}
                func={setSelectedInData}
                lable={"Output list"}
              />
              <Button
                variant="success"
                onClick={(e) => {
                  handleAddMapping(e);
                }}
              >
                +
              </Button>
            </InputGroup>
          </Row>
          <hr />
          <ListSelected
            items={Config.ResponseDynamic}
            func={(itemName) => {
              runInAction(() => {
                delete Config.ResponseDynamic[itemName];
              });
            }}
          />
        </Card.Body>
        <Card.Footer>
          <Button>Done</Button>
        </Card.Footer>
      </Card>
    );
  }
);
