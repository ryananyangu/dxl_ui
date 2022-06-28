import { Col, Row, Button } from "react-bootstrap";

export const SelectedItem = (props) => {
  return (
    <>
      <Row>
        <Col>
          <div>{props.itemName}</div>
        </Col>

        <Col>
          <div>{props.itemValue}</div>
        </Col>
        <Col md={2}>
          <Button
            variant="danger"
            onClick={() => {
              props.func(props.itemName);
            }}
          >
            -
          </Button>
        </Col>
      </Row>
      <hr />
    </>
  );
};
