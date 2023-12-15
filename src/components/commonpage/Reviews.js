import { useState } from "react";
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { IoIosStar } from "react-icons/io";
const Reviews = ()=>{
   const userinfo = sessionStorage.getItem('userdata');
   const userdata = JSON.parse(userinfo);
   const [rate,setrate] = useState(0);
   const [loading,setloading] = useState(true);

 async function getInfo(){  
   if(userdata.usertype==='normaluser'){
     const response =  await fetch(`https://amazonebackend.onrender.com/rating/getrating/${userdata.id}`);
     if(response.status===200){
        const data = await response.json();
        await setrate(data.averageRating);
        setloading(false);
     }
   }
   else if(userdata.usertype==='shopkeeper'){
    const response =  await fetch(`https://amazonebackend.onrender.com/rating/getratingofshopkeeper/${userdata.id}`);
    if(response.status===200){
       const data = await response.json();
       console.log("data rating : ",data.shopRating);
       await setrate(data.shopRating);
       setloading(false);
    }
   }
}

   useState(()=>{
      getInfo();
   },[]);

   if(loading){
     return (
         <div>
           please wait data is loading....
         </div>
     )
   }

    return(
        <div>
           <div style={{display:"flex",justifyContent:"center"}}>
            <Card style={{maxWidth:'500px'}}>
                 <h2>Your Rating Stars </h2>
                 <div>
                    <IoIosStar style={{ color: 1 <= rate ? 'yellow' : '', fontSize:'10vh'}}/>
                    <IoIosStar style={{ color: 2 <= rate ? 'yellow' : '',  fontSize:'11vh'}}/>
                    <IoIosStar style={{ color: 3 <= rate ? 'yellow' : '', fontSize:'12vh'}}/>
                    <IoIosStar style={{ color: 4 <= rate ? 'yellow' : '', fontSize:'13vh'}}/>
                    <IoIosStar style={{ color: 5 <= rate ? 'yellow' : '', fontSize:'14vh'}}/>
                 </div>
            </Card>
           </div>
    
           <Row>
         {/* {   clients.map((items,index)=>{
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
                     given rating  - &nbsp;
                    <IoIosStar style={{ color: 1 <= items.rating ? 'yellow' : '',}}/>
                    <IoIosStar style={{ color: 2 <= items.rating ? 'yellow' : '',}}/>
                    <IoIosStar style={{ color: 3 <= items.rating ? 'yellow' : '',}}/>
                    <IoIosStar style={{ color: 4 <= items.rating ? 'yellow' : '',}}/>
                    <IoIosStar style={{ color: 5 <= items.rating ? 'yellow' : '',}}/>
                </div>
                <div>
               
                </div>
                </div>
             </Card>
             </div>
            )
         })} */}
          </Row>



        </div>
    )
}

export default Reviews;