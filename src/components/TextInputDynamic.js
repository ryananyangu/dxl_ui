import { Card, Col, Form, Row } from "react-bootstrap";

const TextInputDynamic = ({ name, value, getter }) => {
  //   const [inputValue, setInputValue] = useState("");
  return (
    <>
      <Row>
        <Col sm={2}>
          <Card.Text>{name}</Card.Text>
        </Col>
        <Col sm={8}>
          <Form.Control
            type="text"
            placeholder={name}
            value={value}
            onChange={(e) => {
              getter(e.target.value);
            }}
          />
        </Col>
      </Row>
      <hr />
    </>
  );
};

export default TextInputDynamic;
