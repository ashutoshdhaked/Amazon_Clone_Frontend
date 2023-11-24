import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
const ProfilePart2 = ({userdata,updatefromChild})=>{
  const userinfo = sessionStorage.getItem('userdata');
   const loginuserdata = JSON.parse(userinfo);
    const user = userdata;
    const obj ={
      name:user.name,
      username:user.username,
      email: user.email,
      phone:user.phone,
      about:user.about
   }
   const [data,setdata] = useState({});

   function handleChange(e) {
    const { name, value } = e.target;
    setdata((prevData) => ({ ...prevData, [name]: value }));
  }

   useEffect(()=>{
    setdata(obj);
   },[])


   async function storeUpdatedData(){
     const option ={
      method:'PATCH',
      headers:{
        'Content-Type': 'application/json', 
      },
      body:JSON.stringify(data)
     } 
     const response = await fetch(`http://localhost:8085/user/updateuser/${loginuserdata.id}`,option);
     if(response.status===200){
       toast.success("you have successfully updated profile");
       const updatedinfo = await response.json();
       updatefromChild(updatedinfo);

     }
     else{
       toast.error("Error in updating your profile !!");
     }

   }
    function  submit(e){
        e.preventDefault();
        storeUpdatedData();
      
    }
    return(
        <div>
          <ToastContainer/>
        <Form onSubmit={submit}>
             <Card>
     <Row className="mb-3">
     <Form.Group as={Col} md="6" controlId="validationCustom01">
       <Form.Label>First name</Form.Label>
       <Form.Control required  type="text" value={data.name} name="name" onChange={handleChange}/>
     </Form.Group>
     <Form.Group as={Col} md="6" controlId="validationCustomUsername">
       <Form.Label>Username</Form.Label>
       <InputGroup hasValidation>
         <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
         <Form.Control type="text" name="username" value={data.username} onChange={handleChange} aria-describedby="inputGroupPrepend"  required />
       </InputGroup>
     </Form.Group>
   </Row>
   <Row className="mb-3">
     <Form.Group as={Col} md="6" controlId="validationCustom03">
       <Form.Label>Email</Form.Label>
       <Form.Control type="text" name="email" value={data.email}  onChange={handleChange} required />
     </Form.Group>
     <Form.Group as={Col} md="6" controlId="validationCustom03">
       <Form.Label>Phone</Form.Label>
       <Form.Control type="text"  name="phone" value={data.phone} onChange={handleChange}  required />
     </Form.Group>
     </Row>
   <Form.Group as={Col} md="12" controlId="validationCustom03">
     <Form.Label>About YourSelf </Form.Label>
     <Form.Control
       as="textarea"
       name="about"
       value={data.about}
       onChange={handleChange}
       style={{ height: '100px' }}
       className='mb-4'
     />
     </Form.Group>
   <Button type="submit">Submit </Button>
   </Card>
 </Form>
     </div>
    )
}

export default ProfilePart2;