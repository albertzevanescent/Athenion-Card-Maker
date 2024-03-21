import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ReactNode } from "react";
import { Container } from "react-bootstrap";

interface Props {
  items: ReactNode[];
}

function VerticalGroup(props: Props) {
  return (
    <Container fluid>
      <Col className="align-items-center">
        {props.items.map((item, index) => (
          <Row key={"vertical group " + index}>{item}</Row>
        ))}
      </Col>
    </Container>
  );
}

export default VerticalGroup;
