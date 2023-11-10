import ProfilePart2 from './ProfilePart2';
import ProfilePart1 from './ProfilePart1';
import ProfilePart3 from './ProfilePart3';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Cloudinary} from "@cloudinary/url-gen";
import { useEffect, useState } from 'react';
const Profile = ()=>{
  const [isEdit,setisEdit] = useState('flase');
  const [user,setuser] = useState({});
  const data = sessionStorage.getItem('userdata');
  const userdata = JSON.parse(data);
  const cld = new Cloudinary({cloud: {cloudName: 'dmekubcxz'}});
  async function getDetails(){
      const userinfo = await fetch(`http://localhost:8085/user/getuserbyid/${userdata.id}`);
    const jsondata =  await userinfo.json(); 
      setuser(jsondata[0]);
      // here we are having the data and now we update the  userdata here 

  }

  useEffect(()=>{
     getDetails();
  },[])

    return(
   <div style={{padding:'2vw', display:'flex',alignItems:'center',justifyContent:'space-between',gap:'30px'}}>
           <ProfilePart1/>
           <Card> 
            <Button className='m-4'onClick={()=>{isEdit?setisEdit(false):setisEdit(true)}}>{isEdit?'Cancel':'Edit'}</Button>
            { isEdit ?
           <ProfilePart2  userdata={user}/>
            :<ProfilePart3  userdata={user}/>
            }
           </Card>
        </div>
    )
}

export default Profile;