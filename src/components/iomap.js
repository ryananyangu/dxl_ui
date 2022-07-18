import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { Button, Row, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../data/State";
import { CustomContainer } from "./customContainer";
import CustomDropdown from "./CustomDropDown";
import { ListSelected } from "./ListSelected";

const InOutRequestMap = observer(() => {
  const Config = useContext(GlobalContext);
  const navigate = useNavigate();
  const [selectedInData, setSelectedInData] = useState(0);
  const [selectedOutData, setSelectedOutData] = useState(0);

  const handleAddMapping = (e) => {
    let indata = Config.RequestKeys[selectedInData];
    let outdata = Config.OutRequestValues[selectedOutData];

    delete Config.OutRequestValues[selectedOutData];

    Config.Dynamic[outdata.replace(/[{}]/g, "")] = indata.replace(/[{}]/g, "");
    setSelectedInData(0);
    setSelectedOutData(0);
  };

  return (
    <CustomContainer title="In to Out Request Map" controls={<button
      onClick={() => {
        navigate("/statics");
      }}
    >
      Next
    </button>}>
        <Row>
          <InputGroup className="mb-3">
            <CustomDropdown
              items={Config.OutRequestValues}
              func={setSelectedOutData}
              lable={"Outgoing list"}
            />
            <CustomDropdown
              items={Config.RequestKeys}
              func={setSelectedInData}
              lable={"Recieved list"}
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
          items={Config.Dynamic}
          func={(item) => {
            runInAction(() => {
              // FIXME: On this we are not being updates on change
              Config.OutRequestValues.push(`{${item}}`);
              delete Config.Dynamic[item];
            });
          }}
        />
    </CustomContainer>
  );
});

export default InOutRequestMap;
