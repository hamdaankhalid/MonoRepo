import { Navbar, Nav, Container } from 'react-bootstrap';
import auth from '../wrappers/auth';


export default function NavigationBar(props){
    const handleLogout = () => auth.logout( () => { props.history.push("/")} )
    console.log(props.logoutGroup);
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
                    
                    {
                        (props?.logoutGroup === 'food_bank') && 
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        
                    }   
                    
                    
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
};