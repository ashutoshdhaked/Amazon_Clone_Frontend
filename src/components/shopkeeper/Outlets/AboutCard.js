import {useEffect,useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './AboutCard.css';
 const AboutCard = ()=>{  
    const [item,setitem] = useState({});
    const Navigate = useNavigate();
    const urlSearchParams = new URLSearchParams(window.location.search);
    const data = urlSearchParams.get('data');
    const itemId = JSON.parse(decodeURIComponent(data));
    const token=sessionStorage.getItem('token');
// fetching the data according to the item id 
     
  async function fetchingData(){
    const option = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    const response = await fetch(`http://localhost:8085/product/getproductbyid/${itemId}`,option);
    const  product = await response.json();
    if(response.status===200){
    setitem(product[0]);
    }
    else{
    toast.error("Sorry Error in fetching product item");
    }
  }
 

 async function addCart(){
   const objectToFind = item; 
   let checkitemexist = false;
   const items = await JSON.parse(localStorage.getItem('cartitem'));
   console.log(items);
    items.findIndex( (i) => {
    if (i._id === objectToFind._id){
        checkitemexist = true;
        return checkitemexist;
    }
  });

  if(checkitemexist===true){
    toast.error('your item is already in your cart');
  }
  else if(checkitemexist===false){
   items.push(item);
  await localStorage.setItem('cartitem',JSON.stringify(items));
   toast.success("item successfully added in your cart !!");
  }

  }

  function order(id){
    const itemString = JSON.stringify(id);
    Navigate(`/shopkeeper/order?data=${encodeURIComponent(itemString)}`);
   }

   useEffect(()=>{
       fetchingData();
   },[])


    return(
        <div className="product-container">
             <ToastContainer />
        <div>
            <img src={item.url} alt="product_image" />
        </div>
        <div className="product-details">
            <div className="product-title">
                {item.shorttitle}
                <br></br>
                 {item.longtitle}
            </div>
            <div className="product-price">
               Mrp : &nbsp;&nbsp;<strike>{item.mrp}</strike><br></br>
               Discount :&nbsp;&nbsp; {item.discount} <br></br>
               Price :&nbsp;&nbsp;{item.cost}
            </div>
            <div dangerouslySetInnerHTML={{ __html: item.detail }}></div>
            <div className="product-description" dangerouslySetInnerHTML={{ __html: item.description }}></div>
            <div className='buy_btn'>
                <button onClick={()=>{order(item._id)}}>Buy Now</button>&nbsp;&nbsp;&nbsp;&nbsp;
                 <button onClick={addCart}>Add Cart</button>
            </div>
        </div>
    </div>
       
    )
}

export default AboutCard;