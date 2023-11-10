import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
const ProfilePart1 = ()=>{

    function changeImage(){
    // logic to change the image
    }

    return(
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
       <Button type="submit" onClick={changeImage}>Submit Image</Button>
   </Card>
        </div>
    )
}

export default ProfilePart1;