import './SignUp.css';
import SignupValidation from '../Validations/SignupValidation.js';
import {Navigate} from 'react-router-dom';
import React,{useState} from 'react';
const SignUp = ()=>{
    const startingState = {
        name:"",
        username:"",
        email:"",
        phone:"",
        usertype:""
    }
   const [data ,setdata] = useState(startingState);
   const [error,seterror] = useState('');
   const [redirect, setRedirect] = useState(false);
   const [path,setpath] = useState('');
   const [signerror,setsignerror] = useState('');
   const [show, setShow] = useState(true);
   function handleInputChange(e){
    const { name, value } = e.target;
    setdata(prevState => ({
        ...prevState,
        [name]: value
    }));
  }

  function submit(e){
    e.preventDefault(); 
     const getError = SignupValidation(data);
     if(JSON.stringify({}) !== JSON.stringify(getError)){
        seterror(getError);
     }
      else{
        saveUser();
        setdata(startingState);
      }
   } 

   
  async function saveUser(){
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data), 
      };
      const response = await fetch('http://localhost:8085/user/saveuser',options);
      if(response.status === 409){
        setsignerror(" User email is already exist !!");
        setShow(true);
      }
      if(response.status === 500){
        setsignerror("Internal Server Error !!");
        setShow(true);
      }
      if(response.status===400){
        setsignerror("Invalid Email : please use  valid email !! ");
        setShow(true);
      }
    
      const user = await response.json();
       if(user.usertype==='shopkeeper' || user.usertype==='normaluser'){
        setRedirect(true);
         setpath("/login");
       }
       else{
        setRedirect(false);
       }
    
   }
    return(
        <div>
               <div className='formbody'>
                <div className='formblock boxbody'>
                       {
                          signerror ? <div className='error_box' onClose={() => setShow(false)} dismissible>
                          <h2 style={{color:"red"}}>Error !!</h2>
                          <p style={{color:"red"}}>{signerror}</p>
                        </div>:" "
                       
                       }
                    <div className='imges'>
                <img  src="/images/amazoneimg.png" alt="amazone_logo"/>
                </div>
                <hr></hr>
                <div className='sineup_form'>
                    <form className='sineup_form'>
                   <input type="text" placeholder='name' name="name" value={data.name} onChange={handleInputChange} className={error.name ? 'error-border' : ''} required />
                    {error.name && <p>{error.name}</p>}
                    <input type="text" placeholder='username' name="username" value={data.username}  onChange={handleInputChange} className={error.username ? 'error-border' : ''} required/>
                    {error.username  && <p>{error.username}</p>}
                    <input type="email" placeholder='email' name="email" value={data.email} onChange={handleInputChange} className={error.email ? 'error-border' : ''} required />
                    {error.email  && <p>{error.email}</p>}
                    <input type="text" placeholder='phone no.' name="phone" value={data.phone} onChange={handleInputChange} className={error.phone ? 'error-border' : ''} required/>
                    {error.phone  && <p>{error.phone}</p>}
                     <select name="usertype" value={data.usertype} onChange={handleInputChange} className={error.usertype ? 'error-border' : ''}>
                     <option value="" > Select User Type</option>
                        <option value="shopkeeper" >Shopkeeper</option>
                        <option  value="normaluser" >Normal User</option>
                     </select>
                     {error.usertype  && <p>{error.usertype}</p>}
                  <button onClick={submit}>Submit</button>
                  </form>
                </div>
              </div>
              </div>
              {redirect && <Navigate to={path} />}
        </div>
    )

}

export default SignUp;