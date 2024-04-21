import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className=" py-4">
      <Container>
        <hr />
        <Row className="text-center justify-content-center">
          <Col md={5}>
            <h5 style={{ color: "#121f16" }}>Quick Links</h5>
            <ul className="list-unstyled" style={{ color: "#121f16" }}>
              <li>
                <Link to="#">Home</Link>
              </li>
              <li>
                <Link to="#">Books</Link>
              </li>
              <li>
                <Link to="#">About Us</Link>
              </li>
              <li>
                <Link a="#">Contact</Link>
              </li>
            </ul>
          </Col>
          <Col md={5} style={{ color: "#121f16" }}>
            <h5>Contact Us</h5>
            <p>Email: bookstore@email.com</p>
            <p>Phone: +123-456-7890</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center" style={{ color: "#121f16" }}>
            <p>&copy; {new Date().getFullYear()} Bookstore</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
