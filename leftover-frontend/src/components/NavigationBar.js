import { Navbar, Nav, Container } from 'react-bootstrap';


export default function NavigationBar(props){

    return(
        <>
           <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href={props.homeLink}>LeftOver</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                
                    { props.links.map((link) => (
                        <Nav.Link key={link.index} href={link.link}>{link.name}</Nav.Link>
                    ))
                    }
                    
                    
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
};