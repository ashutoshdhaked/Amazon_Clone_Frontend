import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosStar } from "react-icons/io";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const ShowCustomers =()=>{
 const [clients,setclients] = useState([{}]);
 const [Rstar,setRstar] = useState(0);
 const [loading,setloading] = useState(true);
 const userinfo = sessionStorage.getItem('userdata');
 const dataOfUser = JSON.parse(userinfo);
 const usersData =[];
  async function getDataFormDb(){
     const allCustomerIddata = await fetch('http://localhost:8085/order/getcustomerid');
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
         {   clients.map((items,index)=>{
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
                <Button variant="secondary" onClick={()=>{rateUser(items.data._id)}}>Rate user</Button>
                </div>
                </div>
             </Card>
             </div>
            )
         })}
          </Row>
        </div>
    )
}

export default ShowCustomers;