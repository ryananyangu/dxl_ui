import { Col, Row, Button } from "react-bootstrap";

export const SelectedItem = ({ itemName, itemValue, func }) => {
  return (
    <>
      <Row>
        <Col>
          <div>{itemName}</div>
        </Col>

        <Col>
          <div>{itemValue}</div>
        </Col>
        <Col md={2}>
          <Button
            variant="danger"
            onClick={() => {
              func(itemName);
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
