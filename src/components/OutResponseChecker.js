import { Card, Button } from "react-bootstrap";
import TextInputDynamic from "./TextInputDynamic";

const OutResponseChecker = ({ data, lable }) => {
  let getInput = (name) => {
    console.log(name);
  };
  return (
    <>
      <Card>
        <Card.Header>{lable}</Card.Header>
        <Card.Body>
          {Object.keys(data).map((item, index) => {
            return (
              <TextInputDynamic
                key={index}
                name={item}
                value={data[item]}
                getter={getInput}
              />
            );
          })}
        </Card.Body>
        <Card.Footer>
          <Button>Done</Button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default OutResponseChecker;
