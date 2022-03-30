import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => {
    return (
        <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
            <Container>
              <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav class="mr-auto">
                  <Nav.Link href='/'> Tabell</Nav.Link>
                  <Nav.Link href={'/bobble'} >Bobblediagram</Nav.Link>
                  <Nav.Link href={'/flyt'} >Flytdiagram</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
    )
}

export default Navigation