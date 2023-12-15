import { useState,useEffect } from "react";
import {IoIosRemoveCircle} from 'react-icons/io';
import {IoMdAddCircle} from 'react-icons/io';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Order (){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const data = urlSearchParams.get('data');
    const itemId = JSON.parse(decodeURIComponent(data));
    const [items ,setitems] = useState([]);
    const [value, setvalue] = useState([]);
    const [price ,setprice] = useState([]);
    const [userInfo,setUserInfo] = useState({
      email:'',
      phone:'',
      address:''
    });
    const  userdataInStorage  = sessionStorage.getItem('userdata');
    const  userdata = JSON.parse(userdataInStorage);
    const token=sessionStorage.getItem('token');

    async function fetchfromstorage() {
      const storedItems = localStorage.getItem('cartitem');
      if (storedItems) {
          const product = JSON.parse(storedItems);
          setitems(product);
      }
  }
   async function fetchfromdb(){
    const option = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    const response = await fetch(`https://amazonebackend.onrender.com/product/getproductbyid/${itemId}`,option);
    const product = await response.json();
    if(response.status===200){
       setitems(product);
    }
    else{
       console.log("error fetching product");
    }
   }
  
 function loaddata(){
    const initialQuantities  = Array(items.length).fill(1);
    setvalue(initialQuantities);
    const initialPrice = Array(items.length);
    for(let i=0 ; i<initialPrice.length;i++){
         initialPrice[i] = items[i].mrp; }
    setprice(initialPrice);
   }

useEffect(()=>{
  const fetchData =  () => {
    if (itemId === 'cart1234') {
        fetchfromstorage();
    } else {
       fetchfromdb();
    }
};
fetchData();
},[]);

useEffect(()=>{
  loaddata();
}, [items])

function handleInput(e){
  const {name,value} = e.target;
  setUserInfo({...userInfo,[name]:value});
} 

const arr = Array(items.length);   // storing all the order in this array and sending to the backend to save this order

  function makeOrder(){
  let totalprice = 0;
  for(let i=0;i<price.length;i++){
    totalprice = totalprice + price[i];
  }
  for(let i=0 ; i<items.length;i++){
    const orderedData ={};
    orderedData.productid = items[i]._id;
    orderedData.customerid = userdata.id;
    orderedData.shopid =items[i].shopid;
    orderedData.mrp = items[i].mrp;
    orderedData.quantity = value[i];
    orderedData.price = price[i];
    orderedData.title = items[i].shorttitle;
    orderedData.name = items[i].longtitle;
    orderedData.totalamout = totalprice;
    orderedData.email = userInfo.email;
    orderedData.phone = userInfo.phone;
    orderedData.address = userInfo.address;
     arr[i] =  orderedData;
  }
}

async function storeOrder(){
   const option ={
    method :'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(arr), 
   }
   const response = await fetch('https://amazonebackend.onrender.com/order/saveorder',option);
   if(response.status === 200){
       const responsedata = await response.json();
       toast.success("your have successfully Ordered !! "+responsedata.createdAt);
       setUserInfo('');
   }
   else{
      toast.error("Sorry Error in order process");
   }

}

function submit(e){
   e.preventDefault();
    makeOrder();
    // calling a function to send the order data to the database  
    storeOrder();

}

function decrease(index,mrp){
       const currentvalue = value[index];
       if(currentvalue>1){
        setvalue(value.map((item, i) => (i === index ? item - 1 : item)));
        setprice(price.map((item, i) => (i === index ? item - mrp : item)));
       }
}
function increase(index,mrp){
  setvalue(value.map((item, i) => (i === index ? item +1 : item)));
  setprice(price.map((item, i) => (i === index ? item + mrp : item)));
}

    // order with all Cards
    return(
        <div>
            <div style={{margin:'20px'}}>
              <ToastContainer/>
               <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>No.</th>
          <th>Product title</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th> 
          <th>Option</th>
        </tr>
      </thead>
      <tbody>
        {items.map((product,index)=>{
            return(
        <tr key={index}>
          <td>{index+1}</td>
          <td>{product.shorttitle}</td>
          <td>{product.longtitle}</td>
          <td>&#8377;&nbsp;{product.mrp}</td>
          <td>{value[index]}&nbsp;&nbsp;<sub>&#8377;{price[index]}</sub></td>
          <td><IoIosRemoveCircle style={{fontSize:'25px' , color:"red",cursor:'pointer'}} onClick={()=>{decrease(index,product.mrp)}}/>
          <IoMdAddCircle style={{fontSize:'25px' , color:"green",cursor:'pointer'}} onClick={()=>{increase(index,product.mrp)}}/></td>
        </tr>
      )})}
      </tbody>
    </Table>
    </div>
    <div style={{margin:'20px', backgroundColor:'#f0f3f7', padding:"20px"}}>
    <Form onSubmit={submit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email"  value={userInfo.email}  onChange={handleInput} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contact No.</Form.Label>
        <Form.Control type="text" placeholder="+91 ****" name="phone" value={userInfo.phone}  onChange={handleInput} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Address </Form.Label>
        <Form.Control type="text" placeholder="address to deliver product" name="address" value={userInfo.address}  onChange={handleInput} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
        </div>
    )
}

export default Order;