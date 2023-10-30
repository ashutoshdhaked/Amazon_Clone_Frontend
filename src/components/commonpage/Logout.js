import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Logout = ()=>{
  const Navigate = useNavigate();
 useEffect(()=>{
    sessionStorage.removeItem('token');
    Navigate('/login');
 })   
    return(
        <div></div>
    )
}

export default Logout;