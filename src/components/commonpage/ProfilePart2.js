import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
const ProfilePart2 = (props)=>{
    const user = props.userdata;


    function  submit(e){
        e.preventDefault();
        // logic for updateing the user profile data 

    }
    return(
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
     <Form.Group as={Col} md="6" controlId="validationCustom03" onSubmit={submit}>
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
   <Button type="submit">Submit </Button>
   </Card>
 </Form>
     </div>
    )
}

export default ProfilePart2;