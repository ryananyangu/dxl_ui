import { Container, Row, Col, Card } from "react-bootstrap";
import IncomeForm from "./components/basicform";
import CodeEditor from "./components/CodeEditor";
import DropDownPrepo from "./components/DropDownPrepo";
import MapInput from "./components/MapInputx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container fluid>
      <br />

      <Row>
        <Col>
          <IncomeForm />
        </Col>
        <Col>
          <DropDownPrepo lable={"Map Incoming to Outgoing"} />
        </Col>
        <Col>
          <MapInput />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Card>
            <CodeEditor />
          </Card>
        </Col>
        <Col>
          <Card>
            <CodeEditor />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
