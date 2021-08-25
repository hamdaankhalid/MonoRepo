
import { Navbar, NavbarBrand, Container } from 'react-bootstrap';

export default function AppFooter(){
    return(
            <div className="footer">  
                <Navbar >
                    <Container>
                        <NavbarBrand>© LeftOver</NavbarBrand>
                    </Container>
                </Navbar>
            </div>
    )
}