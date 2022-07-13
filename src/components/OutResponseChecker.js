import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { GlobalContext } from "../data/State";
import TextInputDynamic from "./TextInputDynamic";

const OutResponseChecker = observer(() => {
  const Config = useContext(GlobalContext);
  return (
    <>
      <Card>
        <Card.Header>{"Out to In Response Map"}</Card.Header>
        <Card.Body>
          <TextInputDynamic
            name={"Code"}
            value={Config.Success.Code}
            getter={(code) => {
              runInAction(() => {
                Config.Success.Code = code;
              });
            }}
          />
          <TextInputDynamic
            name={"Type"}
            value={Config.Success.Type}
            getter={(resType) => {
              runInAction(() => {
                Config.Success.Type = resType;
              });
            }}
          />
          <TextInputDynamic
            name={"Path"}
            value={Config.Success.Path}
            getter={(path) => {
              runInAction(() => {
                Config.Success.Path = path;
              });
            }}
          />
        </Card.Body>
        <Card.Footer>
          <Button>Done</Button>
        </Card.Footer>
      </Card>
    </>
  );
});

export default OutResponseChecker;
