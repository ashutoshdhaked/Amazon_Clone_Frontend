import React, { useState,useEffect } from 'react';
import './Slide.css';
const Slide = ()=>{
    const [data,setdata] = useState([]);
    const [loading,setloading] = useState(true);
    const fetchData = async()=>{
      try{
        const response = await fetch('https://amazonebackend.onrender.com/product/getproducts');
        const responsedata = await response.json();
        const arr = new Array(5);
        arr.push(responsedata[0]);
        arr.push(responsedata[1]);
        arr.push(responsedata[2]);
        arr.push(responsedata[3]);
        arr.push(responsedata[4]);
        setdata(arr);
        setloading(false);
      }
      catch(e){
        console.log("Error whne fetching the data");
      }
     }
     useEffect(()=>{
        fetchData();
     },[])

    if(loading){
      return(
        <div>
           products are loading .....
        </div>
      )
    } 


    return(
        <div className='box'>
        <div className="products_section">
        <div className="products_deal">
            <h3>Products</h3>
            <button className="view_btn">View All</button>
        </div>
        <hr></hr>
        <div className='carousel_body'>
        <div className='carousel_item'> 
        { (data.length!== 0) ?data.map((item,index)=>{
            return(
              <div>{ item ?
         <div key={index} className='carousel_data'>
          <img src={item.url} alt={`image :+${item.url}`}/>
          <h4>{item.shorttitle}</h4>
          <p>{item.longtitle}</p>
         </div>
          : '' }
            </div>  
        )})
          :''}
        </div>
        </div>
        </div>
 

     <div className='image_view'>
        <img src="/images/grandfetival.jpeg" alt="amazon_fetival_image"/>
        <p>One of the most awaited Amazon Upcoming sales, The Amazon Great Indian Festival 2023 is going to start on 8th October 2023 and the Prime members will get 24-hour early access. Get ready to witness the Amazon sale 2023 that offers exclusive deals and discounts among all categories.</p>
     </div>



        </div>
    )
}

export default Slide;