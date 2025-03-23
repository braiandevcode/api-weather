import { Col, Container, Row, Stack } from 'react-bootstrap';

export function Footer() {
  return (
    <footer className="bg-gradient bg-dark bg-light text-light text-light py-3">
      <Container fluid className="text-center">
        <Row className="text-center">
          <Col xs={12} md={6} xl={4}>
            <h5 className="fw-bold">Weather City</h5>
            <p>© 2025 Weather City. All rights reserved.</p>
          </Col>
          <Col xs={12} md={6} xl={4}>
            <h5 className="fw-bold">Contact</h5>
            <p>Email: contact@weathercity.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </Col>
          <Col xs={12} md={12} xl={4} className='w-sm-50 '>
            <h5 className="fw-bold fs-5">Follow Us</h5>
            <div className='d-flex flex-column flex-sm-row justify-content-center align-items-center g-2  w-100'>
              <Stack direction='horizontal' gap={1} className='justify-content-center'>
                <a href="#" className="align-self-start text-warning">Facebook</a>
                <span className='mx-2 d-none d-sm-block'>|</span>
              </Stack>
              <Stack direction='horizontal' gap={1} className='justify-content-center'>
                <a href="#" className="text-warning align-self-start">Twitter</a>
                <span className='mx-2 d-none d-sm-block'>|</span>
              </Stack>
              <Stack direction='horizontal' gap={1} className='justify-content-center'>
                <a href="#" className="text-warning">Instagram</a>
              </Stack>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
