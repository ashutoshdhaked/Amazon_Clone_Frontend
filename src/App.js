import Body from './components/body/Sectionbody.js';
import {Routes,Route} from 'react-router-dom';
import Login from './components/login_signup/Login'
import SignUp from './components/login_signup/SignUp';
import ResetPassword from './Resetpassword.js';
import Frontpage from './Frontpage';
import Shopkeeper  from './components/shopkeeper/Shopkeeper';
import Normaluser from './components/normaluser/Normaluser';
import DisplayProducts from './components/shopkeeper/Outlets/DisplayProducts.js';
import Logout from './components/commonpage/Logout.js';
import AboutCard from './components/shopkeeper/Outlets/AboutCard.js';
import ShopProducts from './components/shopkeeper/Outlets/ShopProducts.js';
import AddProduct from './components/shopkeeper/Outlets/AddProduct.js';
import Cartitem from './components/shopkeeper/Outlets/CartItem.js';
import Order from './components/shopkeeper/Outlets/Order.js';
import DisplayOrder from './components/commonpage/DisplayOrder.js';
import Profile from './components/commonpage/Profile.js';
import './App.css';

function App() {
  return (
    <div className='home'>
    <Routes>

      <Route path="/" element={<Frontpage/>} >
       <Route path='/' element={<Body/>}></Route>
       <Route path="/login" element={<Login/>}></Route>
       <Route path="/signup" element={<SignUp/>}></Route>
      </Route>

      <Route path="/shopkeeper" element={<Shopkeeper/>}>
          <Route index element={<DisplayProducts/>}></Route>
          <Route path="aboutcard" element={<AboutCard/>}></Route>
          <Route path="shopproduts" element={<ShopProducts/>}></Route> 
          <Route path="addproduct" element={<AddProduct/>}></Route>
          <Route path="cart" element={<Cartitem/>}></Route> 
          <Route path="order" element={<Order/>}></Route>
          <Route path="displayorder" element={<DisplayOrder/>}></Route> 
          <Route path="profile" element={<Profile/>}></Route>
         {/*<Route path="/userprofile" element={""}></Route> 
          <Route path="/addproduct" element={""}></Route> */}
          <Route path="logout" element={<Logout/>}></Route>  
      </Route>

      <Route path="/normaluser" element={<Normaluser/>}>
          <Route index element={<DisplayProducts/>}></Route>
          <Route path="aboutcard" element={<AboutCard/>}></Route>
          <Route path="cart" element={<Cartitem/>}></Route> 
          <Route path="order" element={<Order/>}></Route>
          <Route path="displayorder" element={<DisplayOrder/>}></Route>
          <Route path="profile" element={<Profile/>}></Route>
          {/* <Route path="/products" element={""}></Route>
          <Route path="/normaluserprofile" element={""}></Route>
          <Route path="/aboutproduct" element={""}></Route>
          <Route path="/buyproduct" element={""}></Route> */}
          <Route path="logout" element={<Logout/>}></Route>
      </Route>

      <Route path="/ResetPassword" element={<ResetPassword/>}></Route>

    </Routes>
    </div>
  );
}

export default App;
