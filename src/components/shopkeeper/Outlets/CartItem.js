import { useState ,useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Cartitem =()=>{
 const [data,setdata] = useState([]); 
 const Navigate = useNavigate();
 const userdataInStorage = sessionStorage.getItem('userdata');
   const userdata = JSON.parse(userdataInStorage);

async function getData(){
    const products = await  JSON.parse(localStorage.getItem('cartitem'));
        setdata( products); 
}
function aboutRedirect(id){
    const itemString = JSON.stringify(id);
    if(userdata.usertype==='shopkeeper'){
      Navigate(`/shopkeeper/aboutcard?data=${encodeURIComponent(itemString)}`);
    }
    else if(userdata.usertype==='normaluser') {
      Navigate(`/normaluser/aboutcard?data=${encodeURIComponent(itemString)}`);
    }  
    else{
        toast.error('Something Went to Wrong !!!');
    }
}

async function removeToCart(id){
    console.log('removed',id);
    const products = await  JSON.parse(localStorage.getItem('cartitem'));
     const newpro = products.filter(i => i._id !== id);
     localStorage.removeItem('cartitem');
     localStorage.setItem('cartitem',JSON.stringify(newpro));
     toast.success("Removed Your Item");
     setdata(newpro);
   }

  function oreder(){
    const id = 'cart1234';
    const itemString = JSON.stringify(id);
    if(userdata.usertype==='shopkeeper'){
    Navigate(`/shopkeeper/order?data=${encodeURIComponent(itemString)}`);
    }
    else if(userdata.usertype==='normaluser') {
        Navigate(`/normaluser/order?data=${encodeURIComponent(itemString)}`); 
    }
    else{
        toast.error('Something Went to Wrong !!!');
    }

   }

 useEffect(()=>{
    getData();
 },[])
   return(
    <div className="dis_productsss">
         <ToastContainer />
    <Row xs={1} md={4} className="g-4">
    {data.length > 0 ? data.map((item, index) => (
     <Col key={index}>
         <Card className="mb-4">
             <div className='image_box'>
                 <Card.Img variant="top" src={item.url} className='image_b' />
             </div>
             <Card.Body>
                 <Card.Title>{item.shorttitle}</Card.Title>
                 <Card.Text className="mb-4" style={{ height: '50px', overflow: 'hidden' }} >{item.longtitle}</Card.Text>
                 <div className="mb-4" style={{display :'flex',fontSize :'15px',color:'blue',alignItems:'center',gap:'5px', justifyContent:'space-around'}}>
                 <div style={{width :'70px', height:'auto'}}> MRP: <br></br><strike> {item.mrp}</strike></div>
                 <div style={{width :'70px', height:'auto'}}> Discount:<br></br>{item.discount}%</div>
                 <div style={{width :'70px', height:'auto'}}>cost:<br></br>{item.cost}</div>
                 </div>
                 <div className='buttons_b'>
                      <Button  onClick={()=>{aboutRedirect(item._id)}}>About More</Button> 
                      <Button  onClick={()=>{removeToCart(item._id)}}>Remove </Button> 
                 </div>
             </Card.Body>
             <Card.Footer>
                 <small className="text-muted">{item.updatedAt}</small>
             </Card.Footer>
         </Card>
     </Col>
 )):<h1 style={{ fontSize:'40px',textAlign:"center",color:"green", width:'100%'
 }}>No Product Avalilable</h1> }
</Row>
   { data.length > 0 ?<div style={{textAlign:"center"}}><Button  style={{width:'90vw'}}onClick={oreder}>Buy All Products</Button></div>:''}
</div>
   )
}

export default Cartitem;