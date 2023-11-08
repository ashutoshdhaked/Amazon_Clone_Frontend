 import './NormalUserNav.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
const NormaluserNav = ()=>{
    return(
        <div> 
              {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-black mb-3 navbar navbar-dark">
          <Container fluid>
            <Navbar.Brand href="#"><img src="/images/amazonelogo.png" alt="logo_image" className='image_s'/></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                   <div className='p_section'>
                      <img src="/images/defaultprofile.avif" alt='profile_image'  className='image_p'/>
                          <NavDropdown title="Username" id="basic-nav-dropdown">
                            <Link to="/normaluser/profile">Profile</Link>
                           <Link to="/normaluser/logout">Logout</Link>
                         </NavDropdown>
                   </div>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 ">
                  <Link to="/normaluser" className='effect' style={{textDecoration:'none'}}>Home</Link>
                  <Link to="/normaluser/categories" className='effect' style={{textDecoration:'none'}}>Categories</Link>
                  <Link to="/normaluser/displayorder" className='effect'style={{textDecoration:'none'}}>Orders</Link>
                  <Link to="/normaluser/cart" className='effect' style={{textDecoration:'none'}}>CartItems</Link>
                  <Link to="#action2" className='effect' style={{textDecoration:'none'}}>Order History</Link>
                  <NavDropdown
                    title="Others"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action4" className='effect'>
                      Reviews 
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5" className='effect'>
                       Profile  
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
        </div>
    )
}
export default NormaluserNav;