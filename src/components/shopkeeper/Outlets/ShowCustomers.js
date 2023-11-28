import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosStar } from "react-icons/io";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const ShowCustomers =()=>{
 const [clients,setclients] = useState([{}]);
 const [loading,setloading] = useState(true);
 const [orderloading , setorderloading] = useState(false);
 const [orderdata,setorderdata] = useState({});
 const [fullscreen, setFullscreen] = useState(true);
 const [show, setShow] = useState(false);

 const userinfo = sessionStorage.getItem('userdata');
 const dataOfUser = JSON.parse(userinfo);
 const usersData =[];
  async function getDataFormDb(){
     const allCustomerIddata = await fetch(`http://localhost:8085/order/getcustomerid/${dataOfUser.id}`);
     const allId = await allCustomerIddata.json();
     for(let i of allId){
         const AllUserData = await fetch(`http://localhost:8085/user/getuserbyid/${i}`);
         const getRates = await fetch(`http://localhost:8085/rating/getrating/${i}`);
         const rates = await getRates.json();
         const  rating = await rates;
         const data = await  AllUserData.json();
         usersData.push({ data : data[0], rating :rating.averageRating});
     }
     await setclients(usersData);
     setloading(false);
  }

 async function storeRatingInDb(id,rating){
    const senddata = {
      ratedid : id,
      ratingid : dataOfUser.id,
      star :rating
    }
    const options = {
      method:'POST',
      headers:{
         'Content-Type': 'application/json',
      },
      body : JSON.stringify(senddata),
    }
  console.log("sending data : ",senddata);
    const response = await fetch('http://localhost:8085/rating/saverating',options);
    if(response.status===200){
       toast.success("Sucessfully Stored Your Rating !!");
    }
    else{
      toast.error("Error in Storing You Rating !!");
    }
  }

   function rateUser(id){
    Swal.fire({
      title: 'Rate Us',
      icon: 'question',
      input: 'range',
      inputAttributes: {
        min: 1,
        max: 5,
        step: 1,
      },
      inputValue: 3, 
      showCancelButton: true,
      confirmButtonText: 'Submit',
    }).then((result) => {
      if (result.value) {
        const rating = result.value;
        Swal.fire({
          title: 'Thank You!',
          text: `You rated us ${rating} stars.`,
        });
        console.log("raintg ",rating);
         storeRatingInDb(id,rating);
      } else {
         Swal.fire({
            title: 'Ok !',
            text: 'you are not rate user !!',
          });
      }
    });
    
 }


async function viewOrders(userid){
// here we are fetching the order which is ordered by this userid 
setFullscreen(true);
setShow(true);
const response = await fetch(`http://localhost:8085/order/getuserorders/${userid}`);
if(response.status ===200){
   const responsedata = await response.json();
    const arr =[];
   for(let i of responsedata.confirm){
       arr.push(i);
   }
   for(let i of responsedata.cancel){
      arr.push(i);   
   }
   for(let i of responsedata.pending){
      arr.push(i);
   }


   setorderdata(arr);
   setorderloading(true);
}
else{
   setorderloading(true);
}

}


 useEffect(()=>{
    getDataFormDb();
 },[clients])

 if(loading){
   return(
      <div>
         <h2>Please Wait Data is Loading ........</h2>
      </div>
   )
 }
 
    return (
        <div>
         <ToastContainer/>
            <Row>
         { clients.length>0?clients.map((items,index)=>{
            return(
                <div style={{padding:'2%'}} key={index}>
                <Card>
                    <div style={{display:'flex',gap:'0.3%',justifyContent:'space-between',alignItems:'center'}}>
                 <div>
                    <img src={items.data.profile} alt="userprofile_image" style={{height:'18vh',width:'auto'}}></img>
                 </div>
                <div style={{textAlign:'left'}}>
                      name - &nbsp;{items.data.name}<br></br>
                      email - &nbsp;{items.data.email}<br></br>
                      phone - &nbsp;{items.data.phone}<br></br>
                </div>
                <div style={{textAlign:'left'}}>
                   rating - &nbsp;
                    <IoIosStar style={{ color: 1 <= items.rating ? 'yellow' : '',}}/>                   
                    <IoIosStar style={{ color: 2 <= items.rating ? 'yellow' : '',}}/>
                    <IoIosStar style={{ color: 3 <= items.rating ? 'yellow' : '',}}/>
                    <IoIosStar style={{ color: 4 <= items.rating ? 'yellow' : '',}}/>
                    <IoIosStar style={{ color: 5 <= items.rating ? 'yellow' : '',}}/>
                </div>
                <div>
                <Button variant="secondary" onClick={()=>{rateUser(items.data._id)}}>Rate user</Button>&nbsp;&nbsp;
                <Button variant="secondary" onClick={()=>{viewOrders(items.data._id)}}>View Orders</Button>
                </div>
                </div>
             </Card>
             </div>
            )
         })
           :
           <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div>
              <h2>No Any Customer Here</h2>
             </div>
            </div>
         }
          </Row>
          <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Orders History </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {orderloading ? 
         <div>
              {orderdata.length>0 ? orderdata.map((data,i)=>{  
      return (
        <div style={{margin:'20px', backgroundColor:'#000',padding:'20px',color:'#fff'}}>
            <div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}> 
    <h5>Total Amount :&nbsp;&nbsp;&#8377;&nbsp;{data.amount}</h5>
    <p>Status :&nbsp;&nbsp;<small style={{color:'blue'}} >{data.status}</small></p>
      <div>
        Ordered on : {data.createdAt}
       </div>
            </div>
                <div>
                    <p>Email : &nbsp;&nbsp;{data.email}</p>
                    <p>Address on : &nbsp;&nbsp;{data.address} </p>
                    <p>Contact No. :&nbsp;&nbsp;{data.phone} </p>
                </div>
            </div>
        <div>
        <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>No.</th>
          <th>Product title</th> 
          <th>Product Name</th>
          <th>MRP</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {data.objects.map((product,index)=>{
        return(
        <tr key={index}>
          <td>{index+1}</td>
          <td>{product.title}</td>
          <td>{product.name}</td>
          <td>&#8377;&nbsp;{product.mrp}</td>
          <td>{product.quantity}</td>
          <td>&#8377;&nbsp;{product.price}</td>
        </tr>
      )})}
      </tbody>
    </Table>
    </div>
        </div>
        
)})
:<div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
    <div>
    <h2> No Any Ordered Item Here</h2>
    </div>
</div>
}
         </div>
        :<div>
           data is loading .....
        </div>
        }
        </Modal.Body>
      </Modal>
        </div>
    )
}

export default ShowCustomers;