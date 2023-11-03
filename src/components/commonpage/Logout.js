import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Logout = ()=>{
  const Navigate = useNavigate();
 useEffect(()=>{
    console.log('navigate');
    // sessionStorage.removeItem('token');
    // sessionStorage.removeItem('userdata');
    Navigate('/login');
 })   
    return(
        <div></div>
    )
}

export default Logout;