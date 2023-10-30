import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useEffect ,useState} from "react";
import { useNavigate } from 'react-router-dom';
import './DisplayProducts.css';
 const  DisplayProducts =()=>{
   const[data,setdata] = useState([]);  
   const Navigate = useNavigate();
   async function getData(){
     const response = await fetch('http://localhost:8085/product/getproducts');
     const responsedata = await response.json();
    if(response.status===200){
        setdata(responsedata);
    }
   }

   function aboutRedirect(item){
    const itemString = JSON.stringify(item);
    alert("sending data like : "+item);
    Navigate(`/shopkeeper/aboutcard?data=${encodeURIComponent(itemString)}`);
   }

    useEffect(()=>{
        getData();
    },[])

    return(
        <div className="dis_productsss">
            <Row xs={1} md={4} className="g-4">
                { (data.length !== 0) ? data.map((item, index) => (
                    <Col key={index}>
                        <Card className="mb-4">
                            <div className='image_box'>
                                <Card.Img variant="top" src={item.url} className='image_b' />
                            </div>
                            <Card.Body>
                                <Card.Title>{item.shorttitle}</Card.Title>
                                <Card.Text>{item.longtitle}</Card.Text>
                                <Card.Text className='text_p'>
                                    <p>MRP: <strike> {item.mrp}</strike></p>
                                    <p>Discount: {item.discount}</p>
                                </Card.Text>
                                <p>cost : {item.cost}</p>
                                <div className='buttons_b'>
                                    <Button type="submit" className="mr-2">Buy Now</Button>
                                    <Button type="submit" onClick={()=>{aboutRedirect(item)}}>About More</Button>
                                </div>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">{item.updatedAt}</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                )) :'NO Products Available'}
            </Row>
        </div>
    )
 }

 export default DisplayProducts;