import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ReactNode } from "react";
import { Container } from "react-bootstrap";

interface Props {
  items: ReactNode[];
}

function HorizontalGroup(props: Props) {
  return (
    <Container fluid>
      <Row className="align-items-center">
        {props.items.map((item, index) => (
          <Col key={"horizontal group " + index}>{item}</Col>
        ))}
      </Row>
    </Container>
  );
}

export default HorizontalGroup;
