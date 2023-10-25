import {useState} from 'react';
import './Resetpassword.css';
function ResetPassword(){
    const [Password,setPassword] = useState('');
    const [Confirmpassword,setConfirmpassword] = useState('');
    const [Error,setError] = useState(false);
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get('token');
  
    async function savePassword(){
         const data = {
      Password : Password,
      token : token
       };
      const option ={
        method : 'post',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data), 
        };
        const user = await fetch('http://localhost:8085/user/updatepassword');
        if(user.status===200){
         alert()
        }
        else{
          console.log("no user is invalid user ");
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