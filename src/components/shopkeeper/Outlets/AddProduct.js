import Form from 'react-bootstrap/Form';
import JoditEditor from 'jodit-react';
import Button from 'react-bootstrap/Button';
import React, { useState, useRef, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const AddProduct = ({ placeholder })=>{
    const Navigate = useNavigate();
    const editor = useRef(null);
  	const [content, setContent] = useState('');
    const [content2, setContent2] = useState('');
    const [data,setdata] = useState({});
    const [isUpdate,setisUpdate] = useState(false);
    const [loading,setloading] = useState(false);
    const [categories,setCategories] = useState([]);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const itemId = urlSearchParams.get('id');
    const usertoken = sessionStorage.getItem('token');

    async function getItemDataFromDb(){
       const option = {
          method :'GET',
          headers :{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usertoken}`
          }
       }
       const response =  await fetch(`http://localhost:8085/product/getproductbyid/${itemId}`,option); 
       if(response.status===200){
           const itemdata = await response.json();
          // seetting the data according to the fields : 
          setdata(itemdata[0]);
          setContent(itemdata[0].detail);
          setContent2(itemdata[0].description);
       }
    }

   async function getAllCategory(){
         const response = await fetch('http://localhost:8085/product/getallcategory');
          if(response.status===200){
            const iddata = await response.json();
            console.log("id and data is like as : ",iddata);
            setCategories(iddata);
          }      
     }

    useEffect(()=>{
      // fetching all the categories for adding in the product
      getAllCategory();
      if(itemId){
        setisUpdate(true);
        getItemDataFromDb();
      }
    },[])


  function handleInputChange(e){
    const { name, value } = e.target;
    setdata(prevState => ({
        ...prevState,
        [name]: value,
    }));
    }
    const token= sessionStorage.getItem('token'); 
    
   async function sendData(){
    const option ={
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body : JSON.stringify(data),  
    }
     const response = await fetch('http://localhost:8085/product/saveproducts',option);
     setloading(false);
       if(response.status===200){
         toast.success("Your Item is successfully saved");
         Navigate('/shopkeeper/shopproduts');
        }
     else{
           toast.error("your Product is not saved !!");
     }
    }

    async function updateData(){
      const option ={
          method : 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body : JSON.stringify(data),  
      }
      const response = await fetch(`http://localhost:8085/product/updateproduct/${itemId}`,option);
      setloading(false);
       if(response.status===200){
           toast.success("Your Item is successfully saved");
           Navigate('/shopkeeper/shopproduts');
       }
       else{
             toast.error("your Product is not saved !!");
       }
      }

    function submit(e){
        e.preventDefault();
        setloading(true);
      if(isUpdate){
      updateData(); 
      }
      else{
        sendData();
      }
    }


   
    return(
        <div className='p-5'>
              <ToastContainer />
               {isUpdate ? <div style={{textAlign:'center'}}><div><h2>Update Product Data</h2></div></div> :<div style={{textAlign:'center'}}><div><h2>Add New Product</h2></div></div>}
      <Form  onSubmit={submit}>
     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
        <Form.Label className='text'>Category of the Product :</Form.Label>
        {/* <Form.Control type="text">
        </Form.Control> */}
        <Form.Select name="category" placeholder="category" value={data.category} onChange={handleInputChange}>
         { categories.length>0 ? categories.map((item,index)=>{
              return(
                <option key={index} value={item._id}>{item.name}</option>
              )
         })
           :''
         }
      </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='text'>Prduct image url :</Form.Label>
        <Form.Control type="text" name="url"  placeholder="url" value={data.url} onChange={handleInputChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Short Title  :</Form.Label>
        <Form.Control type="text" name="shorttitle" placeholder="shorttitle" value={data.shorttitle} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Long Title :</Form.Label>
        <Form.Control type="text" name="longtitle" placeholder="longtitle" value={data.longtitle} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
        <Form.Label>Price :</Form.Label>
        <Form.Control type="number" name="mrp" placeholder="price" value={data.mrp} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3"   controlId="exampleForm.ControlInput5">
        <Form.Label>Discount :</Form.Label>
        <Form.Control type="number" placeholder="discount"  name="discount" value={data.discount} onChange={handleInputChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter Description About Product</Form.Label>
        <JoditEditor
			ref={editor}
			value={content}
			tabIndex={1} 
			onBlur={newContent => setContent(newContent)} 
			onChange={newContent => {handleInputChange({ target: { name: 'detail', value: newContent }})}}
          />
          </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>Enter Details About Product</Form.Label>
        <JoditEditor
			ref={editor}
			value={content2}
			tabIndex={1} 
			onBlur={newContent2 => setContent2(newContent2)} 
			onChange={newContent2 => {handleInputChange({ target: { name: 'description', value: newContent2 } })}}    
		/>
      </Form.Group>
      <hr></hr>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <div>
      <Button type='submit ' className='w-100'>{loading ? 'Submitting....':'Submit'}</Button>
      </div>
      </Form.Group>
    </Form>
        </div>
    )
}
export default AddProduct;