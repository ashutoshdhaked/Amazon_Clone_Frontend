import {AiOutlineSearch} from 'react-icons/ai';
import {MdOutlineShoppingCart} from 'react-icons/md';
import {NavLink} from 'react-router-dom';
import './NavBar.css'; 
import { useEffect } from 'react';
function NavBar(){

    useEffect(()=>{
        localStorage.setItem('cartitem',JSON.stringify([]));
    },[])
    return(
        <header>
            <nav className='nav'>
                <div className="left">
                    <div className="navlogo">
                     <NavLink to="/"><img src="images/amazonelogo.png" alt="logo_image"/></NavLink>
                     </div>
                   <div className="nav_serchbar">
                    <input type="text" name=""  className='inputserach'/>
                    <div className="serach_icon">
                       <AiOutlineSearch id="serach"/>
                       </div>
                    </div> 
                </div>
                <div className="right">
                 <div className="nav_btn">
                 <NavLink to="/login">Log in</NavLink>
                 <NavLink to="/signup">Sign Up</NavLink>
                 </div>
                 <div className="cart_btn">
                       <div className='cart_icon'>
                        <p className='item_num'>4</p>
                         <MdOutlineShoppingCart id='cart'/>
                      </div>
                      <p>Cart</p>
                 </div>
                <div className='profileimage'>
                      <img src="images/defaultprofile.avif" alt="avtart_image"/>
                </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar;