import ProfilePart2 from './ProfilePart2';
import ProfilePart1 from './ProfilePart1';
import ProfilePart3 from './ProfilePart3';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
const Profile = ()=>{
  const [isEdit,setisEdit] = useState(false);
  const [user,setuser] = useState({});
  const data = sessionStorage.getItem('userdata');
  const userdata = JSON.parse(data);
  async function getDetails(){
      const userinfo = await fetch(`https://amazonebackend.onrender.com/user/getuserbyid/${userdata.id}`);
    const jsondata =  await userinfo.json(); 
      setuser(jsondata[0]);
  }

  function  updateDataFormChild(newdata){
    setuser(newdata);
  }

  useEffect(()=>{
     getDetails();
  },[])

    return(
   <div style={{padding:'2vw', display:'flex',alignItems:'center',justifyContent:'space-between',gap:'30px'}}>
           <ProfilePart1 userdata={user}/>
           <Card> 
            <Button className='m-4'onClick={()=>{isEdit?setisEdit(false):setisEdit(true)}}>{isEdit?'Cancel':'Edit'}</Button>
            { isEdit ?
            <ProfilePart2  userdata={user}  updatefromChild={updateDataFormChild}/>
            :<ProfilePart3  userdata={user}/>
            }
           </Card>
        </div>
    )
}

export default Profile;