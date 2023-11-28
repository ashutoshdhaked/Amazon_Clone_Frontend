import './Login.css';
import {useState} from 'react';
import {FcGoogle} from 'react-icons/fc';
import {SiFacebook} from 'react-icons/si';
import {useNavigate} from 'react-router-dom';

const Login = ()=>{
  const Navigate = useNavigate();

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
    const response = await fetch('http://localhost:8085/user/loginuser',option);
    const user = await response.json();
    if(response.status===200){
      console.log("ok");
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
                     {/* <div className='option'>
                     <a href="/forgotpassword" >forgot password</a>
                     <button>
                        <FcGoogle className='icon'/>
                         Sign Up With Google
                     </button>
                     <button>
                        <SiFacebook className='icon_f'/>
                         Sign Up With Facebook
                     </button>
                     </div> */}
                </div>
              </div>
              </div>
        </div>
    )

}

export default Login;