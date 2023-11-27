import {useState} from 'react';
import './Resetpassword.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
function ResetPassword(){
    const Navigate = useNavigate();
    const [Password,setPassword] = useState('');
    const [Confirmpassword,setConfirmpassword] = useState('');
    const [Error,setError] = useState(false);
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get('token');
  
    async function savePassword(){
      const data = {
      password : Password,
      token : token
       };
      const option ={
        method : 'PATCH',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data), 
        };
        console.log("data is like : ",data);
        console.log("token : "+token);
        const user = await fetch('http://localhost:8085/user/updatepassword',option);
        if(user.status===200){
         toast.success("Your password is successfully changed");
         Navigate("/login");
        }
        else{
          toast.error("Invalid Access");
          Navigate("/signup");
        }
      }
    const handleSubmit = (e) => {
      e.preventDefault(); 
      if(Password!==Confirmpassword){
        setError(true);
      }
        savePassword();
    }

    return(
        <>
         <div className="containerpass">
         <ToastContainer />
      <div className="card">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleSubmit} className='from_r'>
          <label htmlFor="password">Password : </label>
          <input
            type="text"
            id="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmpassword">Confirm Password : </label>
           <input
            type="text"
            id="confirmpassword"
            value={Confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            required
          />
          {
            Error?<p style={{color:"red" , fontSize:"10px"}}>your password and confirm password dosen't match</p>:""
          }
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
        </>
    )
}
export default ResetPassword;