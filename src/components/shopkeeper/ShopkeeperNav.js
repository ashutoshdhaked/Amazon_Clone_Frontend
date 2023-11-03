import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
const ShopkeeperNav = ()=>{

   return(
    <div>
               {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-black mb-3 navbar navbar-dark">
          <Container fluid>
            <img src="/images/amazonelogo.png" alt="logo_image" className='image_s'/>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <div className='p_section'>
                      <img src="/images/defaultprofile.avif" alt='profile_image'  className='image_p'/>
                      <NavDropdown title="Options" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/shopkeeper/profile">Profile</NavDropdown.Item>
                           <NavDropdown.Item href="/shopkeeper/logout">Logout</NavDropdown.Item>
                         </NavDropdown>
                   </div>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 ">
                  <Link to="/shopkeeper" className='effect' style={{color:'black', textDecoration:'none'}}>Home</Link>
                  <Link to="/shopkeeper/shopproduts" className='effect' style={{color:'black', textDecoration:'none'}}>Shop Products</Link>
                  <Link to="#action2" className='effect' style={{color:'black', textDecoration:'none'}}>Customers</Link>
                  <Link to="/shopkeeper/cart" className='effect' style={{color:'black', textDecoration:'none'}}>Cart Items</Link>
                  <Link to="/shopkeeper/addproduct" className='effect'style={{color:'black', textDecoration:'none'}}>Add Product</Link>
                  <Link to="/shopkeeper/displayorder" className='effect' style={{color:'black', textDecoration:'none'}}>Orders</Link>
                  <Link to="#action2" className='effect' style={{color:'black', textDecoration:'none'}}>Order History</Link>
                  <NavDropdown
                    title="Others"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3" className='effect'>Blocked Users</NavDropdown.Item>
                    <NavDropdown.Item href="#action4" className='effect'>
                      Reviews 
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5" className='effect'>
                      Shop Profile  
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
export default ShopkeeperNav;