import { Col, Container, Row } from 'react-bootstrap';

export function Footer() {
  return (
    <footer className="bg-dark text-light py-3">
      <Container fluid className="text-center">
        <Row className="text-center">
          <Col xs={12} md={4}>
            <h5 className="fw-bold">Weather City</h5>
            <p>© 2025 Weather City. All rights reserved.</p>
          </Col>
          <Col xs={12} md={4}>
            <h5 className="fw-bold">Contact</h5>
            <p>Email: contact@weathercity.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </Col>
          <Col xs={12} md={4}>
            <h5 className="fw-bold">Follow Us</h5>
            <p>
              <a href="#" className="text-light me-2">Facebook</a><span className='mx-2'>|</span>
              <a href="#" className="text-light me-2">Twitter</a><span className='mx-2'>|</span>
              <a href="#" className="text-light">Instagram</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
