// import { Button } from "bootstrap";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

const MapInput = () => {
  // let data = {
  //     "Content-Type": "text/xml;charset=UTF-8"
  // }

  return (
    <Card>
      <Card.Header>Out Request Headers And Statics</Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Form.Control type="text" placeholder="Header name" />
          </Col>
          <Col>
            <Form.Control type="text" placeholder="Header value" />
          </Col>
          <Col md={2}>
            <Button variant="success">+</Button>
          </Col>
        </Row>
        <hr />
        {/* FIXME: make sure to increase values in this everytime a click happens */}

        <Row>
          {/* FIXME: Extract this into a container of lists */}
          <Col>
            <div>Header Name</div>
          </Col>

          <Col>
            <div>Header Value</div>
          </Col>
          <Col md={2}>
            <Button variant="danger">-</Button>
          </Col>
        </Row>
        <hr />
      </Card.Body>
    </Card>
  );
};

export default MapInput;
