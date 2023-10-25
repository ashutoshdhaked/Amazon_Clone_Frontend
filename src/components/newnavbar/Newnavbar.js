import {MdOutlineShoppingCart} from 'react-icons/md';
import './Newnavbar.css';

function Newnavbar(){
    return(
        <div className="new_nav">
            <div className="nav_data">
                <div className="left_data">
                    <p><MdOutlineShoppingCart/> All</p>
                    <p>Mobiles</p>
                    <p>Best Sellers</p>
                    <p>Fashion</p>
                    <p>Customer Service</p>
                    <p>Electronics</p>
                    <p>Prime</p>
                    <p>Today's Deals</p>
                    <p>Amazon Pay</p>
                </div>
                <div className="right_data">
                    <img src="images/nav.jpg" alt="navdata" />
                </div>
            </div>
        </div>
    )
}

export default Newnavbar;