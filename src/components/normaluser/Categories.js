import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Showless from './Categoryshowless';
import { useEffect, useState } from 'react';
const Categories =()=>{
    const [category,setcategory]=useState([]);
    const[loading,setloading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [msg,setmsg]= useState('');
   async function fetchCategory(){
    const response = await fetch('http://localhost:8085/product/getallcategory');
    if(response.status===200){
        const data = await response.json();
        setcategory(data);
        setloading(false);
    }
    else{
        setloading(false);
    }

   }
    useEffect(()=>{
       fetchCategory();
    },[])

     function showMore(message){
        setmsg(message);
     }

    if(loading){
        return (
            <div>
                please wait data is loading.....
            </div>
        )
    }

    console.log("msg : ",msg);
    return(
        <div>
            <Row>
         {category.length>0?category.map((items,index)=>{
            return(
                <div style={{padding:'2%'}} key={index}>
                <Card>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                 <div>
                    <img src={items.url} alt="userprofile_image" style={{height:'18vh',width:'auto'}}></img>
                    <div  style={{fontSize:'25px',color:'gray',marginTop:'10%'}}>
                      <p> &nbsp;{items.name}</p>
                    </div>
                 </div>
                <div style={{textAlign:'left',width:'60%',marginRight:'10%'}}>
                     <Showless  data={items.descryption}/>
                    <Button variant="secondary" onClick={() => {setModalShow(true);showMore(items.descryption);}}>Show More</Button>
                </div>
                </div>
             </Card>
             </div>
            )
         })
           :
           <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div>
              <h2>No Any Category Here</h2>
             </div>
            </div>
         }
          </Row>
   
          
          <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered  show={modalShow}>
         <Modal.Header closeButton onClick={()=>{setModalShow(false)}}>
        <Modal.Title id="contained-modal-title-vcenter">
          Category Descryption 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div dangerouslySetInnerHTML={{ __html: msg }}></div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>{setModalShow(false)}} >Close</Button>
      </Modal.Footer>
    </Modal>
        




        </div>
    )
}

export default Categories;