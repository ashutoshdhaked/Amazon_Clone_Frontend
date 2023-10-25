import './Login.css'
import {useState} from 'react';
import {FcGoogle} from 'react-icons/fc';
import {SiFacebook} from 'react-icons/si';
const Login = ()=>{
 const startingstate = {
    email:"",
    password:""
 }
 const [data , setdata] = useState(startingstate);
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
      body: JSON.stringify({data})
    }
    const user = await fetch('http://localhost:8085/user/loginuser',option);
    if(user.status===200){
       
      
    }
    if(user.status===404){
      console.log("incorrect password !!");
    }
    else{
      console.log("internal server error");
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
                     <form className='forminp' onSubmit={submit}>
                         <input type="email" placeholder='email' name="email" value={data.email} onChange={handleInputChange} required/>
                         <input type="password" placeholder='password' name="password" value={data.password} onChange={handleInputChange} required/>
                         <button className='loginbtn' type='submit'>Login</button>
                     </form>
                     <hr></hr>
                     <div className='option'>
                     <a href="/forgotpassword" >forgot password</a>
                     <button>
                        <FcGoogle className='icon'/>
                         Sign Up With Google
                     </button>
                     <button>
                        <SiFacebook className='icon_f'/>
                         Sign Up With Facebook
                     </button>
                     </div>
                </div>
              </div>
              </div>
        </div>
    )

}

export default Login;