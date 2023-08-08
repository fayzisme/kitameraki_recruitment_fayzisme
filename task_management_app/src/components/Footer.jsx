import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
  return (
    <Row>
        <Col className="mt-auto py-3 bg-light">
        <footer  style={{ marginLeft: '50px' }}>
            <small>&copy; Copyright 2023, fayzisme</small>
        </footer>
        </Col>
      </Row>
  );
}

export default Footer;