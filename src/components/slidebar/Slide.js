import React, { useState,useEffect } from 'react';
import './Slide.css';
const Slide = ()=>{
    const [data,setdata] = useState([]);
    const fetchData = async()=>{
      try{
        const response = await fetch('http://localhost:8085/product/getproducts');
        const responsedata = await response.json();
        setdata(responsedata);
      }
      catch(e){
        console.log("Error whne fetching the data");
      }
     }
     useEffect(()=>{
        fetchData();
     },[])

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
        { data.map((item,index)=>{
            return(
         <div key={index} className='carousel_data'>
          <img src={item.url} alt={`image :+${item.url}`}/>
          <h3>{item.shorttitle}</h3>
          <p>{item.longtitle}</p>
         </div>
        )})
          }
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