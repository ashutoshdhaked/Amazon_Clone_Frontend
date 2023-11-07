import './Normaluser.css';
import { useEffect ,useState} from 'react';
import ErrorPage from '../ErrorPage';
import NormaluserNav from './NormalUserNav';
import { Outlet } from 'react-router-dom';
function Normaluser(){
  const [isError, setIsError] = useState(false);
    async function authanticate(){
        const token = sessionStorage.getItem('token');
        if (!token) {
            setIsError(true);
            return;
        }
        console.log("token is : "+token);
            const option2 = {
             method: 'POST',
             headers: {
          'Content-Type': 'application/json',
          'Authorization' :`Bearer ${token}`
             }
       }
    const response2 = await fetch('http://localhost:8085/userportal/home',option2);
    const usertype =  await response2.json();
      if(usertype!=='normaluser'){
        setIsError(true);
      }
    }

    useEffect(() => {
         authanticate();
      }, []);

      if (isError) {
        return <ErrorPage status="403" message="Access denied !! You are not a valid user to use this page" />;
         }
    return (
        <div>
            <NormaluserNav/>
            <Outlet />
        </div>
    )

}

export default Normaluser;