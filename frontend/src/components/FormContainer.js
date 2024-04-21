import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-lg-center ">
        <Col xs={12} md={5} className="login-container">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
