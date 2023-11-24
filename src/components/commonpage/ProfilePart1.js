import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
const ProfilePart1 = (props)=>{

    const user = props.userdata;
   const [UserProfile,setUserProfile] = useState('');
   const [image,setimage] = useState(null);
   const [loading, setLoading] = useState(false);
   const userinfo = sessionStorage.getItem('userdata');
   const userdata = JSON.parse(userinfo);

   const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setimage(selectedFile);
  };

  useEffect(()=>{
    setUserProfile(user.profile);
  },[user.profile])

 async function sendImage(){
  const data = new FormData();
   data.append('file',image);
  const options = {
    method:'POST',
   body : data,
   }
  try{
  setLoading(true);
  const response =  await fetch('http://localhost:8085/user/uploadimage',options);
  if(response.status===200){
    toast.success("successfully changed image");
    setLoading(false);
    setimage(null);
     const updateddata = await response.json();
    const option = {
     method:'PATCH',
     headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({profile:updateddata}),
   }
   const response2 = await fetch(`http://localhost:8085/user/updateimage/${userdata.id}`,option);
   if(response2.status===200){
      const updatedResponse = await response2.json();
      setUserProfile(updatedResponse.profile);
   }
   else{
    console.log("error in response 2");
   }
  }
  else{
    toast.error("Server Error In uploading your Image !!");
    setLoading(false);
  }
}
catch(error){
  toast.error("Server Error In uploading your Image !!");
  setLoading(false);
}
    
}

    function changeImage(){
    if(!image){ toast.error("Please Select A Image To Change Profile !! ") }
    else{sendImage();}
  }
    return(
        <div style={{width:"30%"}}>
          <ToastContainer/>
        <Card>
         <div style={{textAlign:'center'}}>
         <Card.Img variant="top" src={UserProfile}  style={{height:'auto',width:'20vw'}}/>
         </div>
     <Card.Body>
       <Card.Text> {user.about} </Card.Text>
     </Card.Body>
     <Form.Group className="position-relative mb-3">
         <Form.Label>Choose Your Profile Image : </Form.Label>
         <Form.Control
           type="file"
           required
           name="image"
           onChange={handleImageChange}
         />
       </Form.Group>
       <Button type="submit" onClick={changeImage}>
          {loading ? 'Submitting...' : 'Submit Image'}
        </Button>
   </Card>
        </div>
    )
}

export default ProfilePart1;