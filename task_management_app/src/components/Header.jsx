import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 
function Header() {
    return (
        <>
         <Navbar className="bg-light">
            <Container>
                <Navbar.Brand>Task Management</Navbar.Brand>
            </Container>
        </Navbar>
        </>
    );
}
 
export default Header;