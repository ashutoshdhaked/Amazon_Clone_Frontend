import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useEffect ,useState} from 'react';
const DisplayOrder = ()=>{
   const [items,setitems]=useState([]);
   const [state,setstate] = useState('pending');
  async function fetchOrders(){
         const response = await fetch('http://localhost:8085/order/getpendingorder');
         if(response.status===200){
            const oreders = await response.json();
            setitems(oreders);
         }
         else{
            console.log("Internal server error !!");
         }
  }
   useEffect(()=>{
     fetchOrders();
   },[])
  
     function cancleOrder(id){
    // here we are cancle the order
    setstate('cancle');
    setStatus(id);     
   }

    function confirmOrder(id){
    // here we are confirm the order items
    setstate('confirm'); 
    setStatus(id);

   }

   async function setStatus(id){
   const response =  await fetch(`http://localhost:8085/order/updatestatus/${id}`);

   }



    return(
            <>
    { items.map((data,i)=>{  
      return (
        <div style={{margin:'20px', backgroundColor:'#000',padding:'20px',color:'#fff'}}>
            <div>
                <div style={{display:'flex' , alignItems:'center',justifyContent:'space-between'}}> 
                       <h5>Total Amount :&nbsp;&nbsp;&#8377;&nbsp;{data.amount}</h5>
                        <p>Status :&nbsp;&nbsp;<small className=''>{data.status}</small></p>
                       <div style={{display:'flex',gap:'10px'}}>
                       <Button variant="danger" onClick={()=>{cancleOrder(data._id)}}>Cancle Order</Button>
                       <Button variant="success" onClick={()=>{confirmOrder(data._id)}}>Confirm Order</Button>
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
)})}
        </>
    )
}

export default DisplayOrder;