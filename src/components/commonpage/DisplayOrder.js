import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {useSelector,useDispatch} from 'react-redux';
import {cancelOrder,confirmOrder} from '../../features/OrderFeature/Cancel_ConfirmOreder';
import { ToastContainer, toast } from 'react-toastify';
import DisplayOrderToNormal from '../normaluser/DisplayOrderTONormal';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect ,useState} from 'react';
const DisplayOrder = ()=>{
   const [items,setitems]=useState([]);
   const [itemsOfNormal,setitemsOfNormal] = useState({});
   const [loading ,setLoading] = useState(true);
   let allOrderState =[];
   const dispatch = useDispatch();
   const orderstate = useSelector(state => state.orderfeature.condition);
   const userinfo = sessionStorage.getItem('userdata');
   const userdata = JSON.parse(userinfo);
    if(orderstate){
      allOrderState = orderstate;
    } 
     
  async function fetchOrders(){
        if(userdata.usertype==='shopkeeper'){
         const response = await fetch(`https://amazonebackend.onrender.com/order/getpendingorder/${userdata.id}`); 
         if(response.status===200){
          const oreders = await response.json();
          setitems(oreders);
          setLoading(false);
         }    
        }
      else if(userdata.usertype==='normaluser'){
        const response = await fetch(`https://amazonebackend.onrender.com/order/getuserorders/${userdata.id}`); 
        if(response.status===200){
         const oreders = await response.json();
           setitemsOfNormal(oreders);
           setLoading(false);
      } 
    }
  }

   useEffect(()=>{
     fetchOrders();
   },[])

     function cancle(id,index){
    const value = 'cancel';   
    dispatch(cancelOrder({ id:id,index:index,text:value}));
    setStatusDB(id, {status:"cancel"});
    const filteredItems = items.filter((i) => {
      return i._id !== id;
    });
    setitems(filteredItems);
   }

    function confirm(id,index){
    const value = 'confirm';   
     dispatch(confirmOrder({id:id, index:index ,text:value}));
    setStatusDB(id, {status:"confirm"});
    const filteredItems = items.filter((i) => {
      return i._id !== id;
    });
    setitems(filteredItems);
   }

   async function setStatusDB(id,statusValue){
    const option ={
      method :'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body : JSON.stringify(statusValue),
    }

    console.log("id and status : ",id ,statusValue);
   const response =  await fetch(`https://amazonebackend.onrender.com/order/updatestatus/${id}`,option);
   if(response.status===200){
     toast.success("your have confirm the oreder");
   }
   else{
    toast.error("You have cnacle the Order ");
   }
   }


   if(loading){
    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
    <div>
    <h2> please wait data is loading ...</h2>
    </div>
    </div>
    )
   }


   if(userdata.usertype==='normaluser'){
    console.log("itemsOfNormal :",itemsOfNormal);
     return (
         <div>
           <DisplayOrderToNormal  data={itemsOfNormal}/>
         </div>
     )
   }

    return( 
            <>
    {items.length>0?  items.map((data,i)=>{  
      return (
        <div style={{margin:'20px', backgroundColor:'#000',padding:'20px',color:'#fff'}}>
            <div>
              <ToastContainer/>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}> 
    <h5>Total Amount :&nbsp;&nbsp;&#8377;&nbsp;{data.amount}</h5>
    <p>Status :&nbsp;&nbsp;<small style={{color:'blue'}} >{allOrderState && allOrderState[i] && allOrderState[i].status ? allOrderState[i].status : 'pending' }</small></p>
    <div style={{display:'flex', gap:'10px'}}>
        <Button variant="danger" onClick={()=>{cancle(data._id,i)}} disabled={allOrderState && allOrderState[i] && allOrderState[i].status==='cancel' ? allOrderState[i].disabled : ''}>Cancel Order</Button>
        <Button variant="success" onClick={()=>{confirm(data._id,i)}} disabled={allOrderState && allOrderState[i] && allOrderState[i].status==='confirm' ? allOrderState[i].disabled : ''}>Confirm Order</Button>
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
 : <div style={{textAlign:'center', color:'gray',fontSize:'30px'}}>
   <div>
   No Any Ordered Item Is Available 
   </div>
   </div>
}
        </>
    )
}

export default DisplayOrder;