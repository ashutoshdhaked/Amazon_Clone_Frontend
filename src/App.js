import Body from './components/body/Sectionbody.js';
import {Routes,Route} from 'react-router-dom';
import Login from './components/login_signup/Login'
import SignUp from './components/login_signup/SignUp';
import ResetPassword from './Resetpassword.js';
import Frontpage from './Frontpage';
import Shopkeeper  from './components/shopkeeper/Shopkeeper';
import Normaluser from './components/normaluser/Normaluser';
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
           {/* <Route path="/products" element={""}></Route>
          <Route path="/userproducts" element={""}></Route>
          <Route path="/shopprofile" element={""}></Route> 
          <Route path="/addProduct" element={""}></Route>
          <Route path="/productsrequest" element={""}></Route> */}
      </Route>
      <Route path="/normaluser" element={<Normaluser/>}>
          {/* <Route path="/products" element={""}></Route>
          <Route path="/normaluserprofile" element={""}></Route>
          <Route path="/aboutproduct" element={""}></Route>
          <Route path="/buyproduct" element={""}></Route> */}
      </Route>

      <Route path="/ResetPassword" element={<ResetPassword/>}></Route>

    </Routes>
    </div>
  );
}

export default App;
