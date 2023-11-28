import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
const ShopkeeperNav = ()=>{

     const userinfo = sessionStorage.getItem('userdata');
     const userdata = JSON.parse(userinfo);


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
                      <img src={userdata.profile} alt='profile_image'  className='image_p' style={{width:'50px',height:'50px'}}/>
                      <NavDropdown title={userdata.username} id="basic-nav-dropdown">
                           <Link style={{textDecoration:'none',padding:'10px'}} to="/shopkeeper/profile">Profile</Link>
                           <hr></hr>
                           <Link style={{textDecoration:'none',padding:'10px'}} to="/shopkeeper/logout">Logout</Link>
                         </NavDropdown>
                   </div>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              
                <Nav className="justify-content-end flex-grow-1 pe-3 ">
                  <Link to="/shopkeeper" className='effect' style={{textDecoration:'none'}}>Home</Link>
                  <Link to="/shopkeeper/shopproduts" className='effect' style={{textDecoration:'none'}}>Shop Products</Link>
                  <Link to="/shopkeeper/customers" className='effect' style={{textDecoration:'none'}}>Customers</Link>
                  <Link to="/shopkeeper/cart" className='effect' style={{textDecoration:'none'}}>Cart Items</Link>
                  <Link to="/shopkeeper/addproduct" className='effect'style={{textDecoration:'none'}}>Add Product</Link>
                  <Link to="/shopkeeper/displayorder" className='effect'style={{textDecoration:'none'}}>Orders</Link>
                  <Link to="/shopkeeper/addcategory" className='effect'style={{textDecoration:'none'}}>Add Category</Link>
                  <NavDropdown title="Others" id={`offcanvasNavbarDropdown-expand-${expand}`} >
                  <Link style={{textDecoration:'none',padding:'10px'}} to="/shopkeeper/reviews">Reviews</Link>
                    <NavDropdown.Divider />
                    <Link style={{textDecoration:'none',padding:'10px'}} to="/shopkeeper/profile">Profile</Link>
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