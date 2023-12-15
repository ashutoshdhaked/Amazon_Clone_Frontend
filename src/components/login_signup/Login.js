import './Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FcGoogle} from 'react-icons/fc';
import {SiFacebook} from 'react-icons/si';
import {useNavigate} from 'react-router-dom';

const Login = ()=>{
  const Navigate = useNavigate();
  const [showModel,setshowModel] = useState(false);
 const [Email,setEmail] = useState('');
 const [loading,setloading]=useState(false);
 const startingstate = {
    email:"",
    password:""
 }
 const [data , setdata] = useState(startingstate);
 const [error , seterror] = useState(false);
 function handleInputChange(e){
    const {name,value} = e.target;
    setdata(prestate=>({
      ...prestate,
      [name]:value
    }));
 }
  
 async function EmailCheck(){
  setloading(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const valid =  emailRegex.test(Email);
 if(!valid){
  toast.error("please Enter a valid email !!");
 }
 else{
     const option = {
      method : 'POST',
      headers :{
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({email : Email})
     }    
     const response = await fetch('https://amazonebackend.onrender.com/user/emailexist',option); 
     setloading(false); 
    if(response.status===200){
     setEmail('');
     setshowModel(false);
    toast.success("reset password email has been sent on your email ");
    }
    else{
    toast.error("you are not register user please register !!");
    Navigate("/signup");
    }
 }
 }

   function getEmail(){
     EmailCheck();  
  }

 function submit(e){
    e.preventDefault();
    authenticate();
    setdata(startingstate);
 }
 async function authenticate(){
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }
    const response = await fetch('https://amazonebackend.onrender.com/user/loginuser',option);
    const user = await response.json();
    if(response.status===200){
       const  token  = user.token;
       const userdata = user.data;
       sessionStorage.setItem('token', token);
       sessionStorage.setItem('userdata', JSON.stringify(userdata));
     if(user.data.usertype==="shopkeeper"){
         Navigate("/shopkeeper");        
     }
     else if(user.data.usertype==="normaluser"){
         Navigate("/normaluser"); 
     }
    }
   else{
         seterror(true);
     }        
  }

    return(
        <div>
           <ToastContainer/>
              <div className='formbody'>
                <div className='formblock boxbody'>
                    <div className='imges'>
                <img  src="/images/amazoneimg.png" alt="amazone_logo"/>
                </div>
                <hr></hr>
                <div className='formdata'>
                   {
                          error ? <div className='error_box'>
                          <h2 style={{color:"red"}}>Error !!</h2>
                          <p style={{color:"red"}}>Invalid email and password</p>
                        </div>:" "             
                       }
                     <form className='forminp' onSubmit={submit}>
                         <input type="email" placeholder='email' name="email" value={data.email} onChange={handleInputChange} className={error ? 'red_border':''} required/>
                         <input type="password" placeholder='password' name="password" value={data.password} onChange={handleInputChange} className={error ? 'red_border':''} required/>
                         <button className='loginbtn' type='submit'>Login</button>
                     </form>
                     <hr></hr>
                      <div className='option'>
                       <button style={{all:'unset',color:'blue',}} className='for_btn' onClick={()=>{setshowModel(true)}}>forgot password</button>
                     {/* <button>
                        <FcGoogle className='icon'/>
                         Sign Up With Google
                     </button>
                     <button>
                        <SiFacebook className='icon_f'/>
                         Sign Up With Facebook
                     </button> */}
                     </div> 
                </div>
              </div>
 
              <Modal size="lg" aria-labelledby="contained-modal-title-vcenter"  centered show={showModel} >
             <Modal.Header closeButton onClick={()=>{setshowModel(false)}}>
        <Modal.Title id="contained-modal-title-vcenter" >
          Enter Details For Generate New Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
         <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label><h4>Your Email</h4></Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' value={Email} onChange={(e)=>{ setEmail(e.target.value)}}/>
       </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={getEmail}>{loading ?'Submitting....':'Submit'}</Button>
        <Button onClick={()=>{setshowModel(false)}}>Close</Button>
      </Modal.Footer>
    </Modal>
              </div>
        </div>
    )

}

export default Login;