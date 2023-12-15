import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect ,useState} from "react";
import { useNavigate } from 'react-router-dom';
import Searchbar from '../../commonpage/Searchbar';
import './DisplayProducts.css';
 const  DisplayProducts =()=>{
   const[data,setdata] = useState([]);  
   const[loading,setloading] = useState(true);
   const Navigate = useNavigate();
   const userdataInStorage = sessionStorage.getItem('userdata');
   const userdata = JSON.parse(userdataInStorage);
   async function getData(){
     const response = await fetch('https://amazonebackend.onrender.com/product/getproducts');
     const responsedata = await response.json();
     setloading(false);
    if(response.status===200){
        setdata(responsedata);
    }
   }
   function aboutRedirect(id){
    const itemString = JSON.stringify(id);
    if(userdata.usertype==='shopkeeper'){
    Navigate(`/shopkeeper/aboutcard?data=${encodeURIComponent(itemString)}`);
    }
    else if(userdata.usertype==='normaluser'){
        Navigate(`/normaluser/aboutcard?data=${encodeURIComponent(itemString)}`);
    }
    else{
      toast.error('Somethings went to Wrong !!!');
    }
   }
   function order(id){
    const itemString = JSON.stringify(id);
    if(userdata.usertype==='shopkeeper'){
    Navigate(`/shopkeeper/order?data=${encodeURIComponent(itemString)}`);
    }
    else if(userdata.usertype==='normaluser'){
        Navigate(`/normaluser/order?data=${encodeURIComponent(itemString)}`);
    }
    else{
        toast.error('Somethings went to Wrong !!!');
    }
   }
   const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

   function changedata(newdata){
    setdata(newdata);
   }

    useEffect(()=>{
        getData();
    },[])
    
   if(loading){
     return (
        <div>
        <ClipLoader
        color="#ffffff"
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>
     )
   }

    return(
        <div className="dis_productsss">
            <ToastContainer/>
            <div style={{margin:'2%', display:'flex',justifyContent:'center'}}>
            <Card style={{width:'50%'}}> 
            <Searchbar productdata={data}  changeData={changedata}/>
           </Card>
           </div>
            <Row xs={1} md={4} className="g-4">
                { (data.length >0) ? data.map((item, index) => (
                    <Col key={index}>
                        <Card className="mb-4">
                            <div className='image_box'>
                                <Card.Img variant="top" src={item.url} className='image_b' />
                            </div>
                            <Card.Body>
                            <Card.Title>{item.shorttitle}</Card.Title>
                            <Card.Text className="mb-4" style={{ height: '50px', overflow: 'hidden' }} >{item.longtitle}</Card.Text>
                            <div className="mb-4" style={{display :'flex',fontSize :'15px',color:'blue',alignItems:'center',gap:'5px', justifyContent:'space-around'}}>
                            <div style={{width :'70px', height:'auto'}}> MRP: <br></br><strike>{item.mrp}</strike></div>
                            <div style={{width :'70px', height:'auto'}}> Discount:<br></br>{item.discount}%</div>
                            <div style={{width :'70px', height:'auto'}}>cost:<br></br>{item.cost}</div>
                            </div>
                                <div className='buttons_b'>
                                    <Button type="submit" className="mr-2"  onClick={()=>{order(item._id)}}>Buy Now</Button>
                                    <Button type="submit" onClick={()=>{aboutRedirect(item._id)}}>About More</Button>
                                </div>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">{item.updatedAt}</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                )) :<h1 style={{ fontSize:'40px',textAlign:"center",color:"green", width:'100%'
            }}>No Product Avalilable</h1>}
            </Row>
        </div>
    )
 }

 export default DisplayProducts;