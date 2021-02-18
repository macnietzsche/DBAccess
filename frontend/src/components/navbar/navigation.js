import {Navbar, Nav, Container} from 'react-bootstrap'
import {Link,useLocation} from 'react-router-dom'

function Navigation(){

    const currentPath=useLocation().pathname

    return(
        <Container fluid className='px-0'> 
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container className='d-flex justify-content-between'>
                    <Navbar.Brand className='mr-5'>DBAccess Demo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto w-100 d-flex justify-content-end">
                                <Link className={`nav-link ${currentPath=='/teachers'?'active':''}`} role='button' to='/teachers'>Teachers</Link>
                                <Link className={`nav-link ${currentPath=='/courses'?'active':''}`} role='button' to='/courses'>Courses</Link>
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>       
        </Container>
        
    )
}

export default Navigation;