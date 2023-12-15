import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const DisplayOrderToNormal = (props)=>{
    const data = props.data;
    const [status,setstatus] = useState();
    const [items,setitems] = useState([]);
    const userinfo = sessionStorage.getItem('userdata');
    const dataOfUser = JSON.parse(userinfo);

    function changeItem(type){
       if(type==='confirm'){
        setstatus('confirm');
        setitems(data.confirm);
       }
       else if(type==='cancel'){
        setstatus('cancel');
        setitems(data.cancel);
       }
       else{
        setstatus('pending');
        setitems(data.pending);
       }
    }


 async function storeRating(id,rating,sid){
    const senddata = {
      pid : id,
      userid : dataOfUser.id,
      shopid :sid,
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
    const response = await fetch('https://amazonebackend.onrender.com/rating/saveproductrating',options);
    if(response.status===200){
       toast.success("Sucessfully Stored Your Rating !!");
    }
    else{
      toast.error("Error in Storing You Rating !!");
    }
 }   

    function rateUser(id,sid){
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
            storeRating(id,rating,sid);
          } else {
             Swal.fire({
                title: 'Ok !',
                text: 'you are not rate user !!',
              });
          }
        });  
     }   



 useEffect(()=>{
    setitems(data.confirm);
    setstatus('confirm');
 },[])   

    return(
       <>
       <ToastContainer/>
           <div style={{backgroundColor:'black',padding:'1%'}}>
              <ul style={{display:'flex', listStyle:'none',justifyContent:'space-around' }}>
                <li><Button variant="secondary" onClick={()=>{changeItem('confirm')}}>Confirm Orders</Button></li>
                <li><Button variant="secondary"  onClick={()=>{changeItem('pending')}}>Pending Orders</Button></li>
                <li><Button variant="secondary" onClick={()=>{changeItem('cancel')}}>Cancel Orders</Button></li>
              </ul>
           </div>
        <div> 
     {items.length>0 ? items.map((data,i)=>{  
      return (
        <div style={{margin:'20px', backgroundColor:'#000',padding:'20px',color:'#fff'}}>
            <div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}> 
    <h5>Total Amount :&nbsp;&nbsp;&#8377;&nbsp;{data.amount}</h5>
    <p>Status :&nbsp;&nbsp;<small style={{color:'blue'}} >{status}</small></p>
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
          <th>Rating</th>
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
          <td><Button variant="secondary" onClick={()=>{rateUser(product.productid,product.shopid)}}>Rate product</Button></td>
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
        </>
    )
}

export default DisplayOrderToNormal;