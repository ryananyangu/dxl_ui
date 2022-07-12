import { runInAction } from "mobx";
import { Row, Button, InputGroup, Form } from "react-bootstrap";

export const SelectedItem = ({ itemName, itemValue, func }) => {
  return (
    <>
      <Row>
        <InputGroup>
          <Form.Control disabled value={itemName} />
          <Form.Control disabled value={itemValue} />
          <Button
            variant="danger"
            onClick={() => {
              runInAction(() => {
                func(itemName);
              });
            }}
          >
            -
          </Button>
        </InputGroup>
      </Row>
      <hr />
    </>
  );
};
