import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
const Profile = ()=>{
  const [user,setuser] = useState({});
  const data = sessionStorage.getItem('userdata');
  const userdata = JSON.parse(data);
  async function getDetails(){
      const userinfo = await fetch(`http://localhost:8085/user/getuserbyid/${userdata.id}`);
    const jsondata =  await userinfo.json();
      setuser(jsondata[0]);
  }

  useEffect(()=>{
     getDetails();
  },[])

    return(
   <div style={{padding:'2vw', display:'flex',alignItems:'center',justifyContent:'space-between',gap:'30px'}}>
           <div style={{width:"30%"}}>
           <Card>
            <div style={{textAlign:'center'}}>
        <Card.Img variant="top" src="/images/defaultprofile.avif"  style={{height:'auto',width:'20vw'}}/>
        </div>
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <Form.Group className="position-relative mb-3">
            <Form.Label>Choose Your Profile Image : </Form.Label>
            <Form.Control
              type="file"
              required
              name="file"
            />
          </Form.Group>
      </Card>
           </div>
        <div>
           <Form>
                <Card>
        <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control required  type="text" value={user.name} />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control type="text" value={user.username} aria-describedby="inputGroupPrepend"  required />
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" value={user.email} required />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" value={user.phone} required />
        </Form.Group>
        </Row>
      <Form.Group as={Col} md="12" controlId="validationCustom03">
        <Form.Label>About YourSelf </Form.Label>
        <Form.Control
          as="textarea"
          placeholder="about yourself "
          style={{ height: '100px' }}
          className='mb-4'
        />
        </Form.Group>
      <Button type="submit">Submit form</Button>
      </Card>
    </Form>
        </div>
        </div>
    )
}

export default Profile;