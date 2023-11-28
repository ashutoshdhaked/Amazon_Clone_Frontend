import Form from 'react-bootstrap/Form';
import JoditEditor from 'jodit-react';
import Button from 'react-bootstrap/Button';
import React, { useState, useRef} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from 'react-bootstrap/Card';
const AddCategory = ()=>{

    const [content, setContent] = useState('');
    const [data,setdata] = useState({});
    const [image,setimage] = useState('');
    const [loading,setloading] = useState(false);
    const editor = useRef(null);

    const userinfo = sessionStorage.getItem('userdata');
    const userdata = JSON.parse(userinfo);

    function  handleInputChange(e){
        const { name,value} = e.target;
        setdata(prevState => ({
            ...prevState,
            [name]: value,
        }));
}

function handleImage(e){
    const selectedFile = e.target.files[0];
    setimage(selectedFile);
}

 function submit(e){
  setloading(true);
  e.preventDefault();
  const formdata = new FormData();
  formdata.append('file',image);
  formdata.append('shopid',userdata.id);
  formdata.append('name',data.name);
  formdata.append('descryption',data.descryption);
  storeDb(formdata);
}

async function storeDb(formdata){
  const file = formdata.get('file');
  const name = formdata.get('name');
  const descryption = formdata.get('descryption');
  if(!file){
    toast.error("please choose a image !!");
    setloading(false);
  }
  else if(!name || !descryption){
    toast.error("Your fields are empty!!");
    setloading(false);
  }
  else{
   const option = {
      method:'POST',
      Headers :{
        'Content-Type':'application/json'
      },
      body:formdata,
  }
  const response = await fetch('http://localhost:8085/product/savecategory',option);
  if(response.status===200){
     toast.success("you have successfully added a new category");
     setloading(false);
     setimage('');
     setdata({
      data:'',
      descryption :''
     });
     setContent('');
  }
  else{
    toast.error("Error !! error is occure in adding new category");
    //  setimage('');
      setloading(false);
      setdata({
      data:'',
      descryption :''
     });
     setContent('');
  }
}
}
    return(
        <div>
            <ToastContainer/>
            <div style={{textAlign:'center'}}>
            <h2>Add New Category</h2>
            </div>
          <Card style={{textAlign:'left',margin:'2%',padding:'2%'}}>
          <Form onSubmit={submit}>
     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='text'> Tittle of your category :</Form.Label>
        <Form.Control type="text" name="name" placeholder="category" value={data.name} onChange={handleInputChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='text'> Select Your Category Image:</Form.Label>
        <Form.Control type="file" required name="file" onChange={handleImage}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>Enter Details About Product</Form.Label>
        <JoditEditor
			ref={editor}
			value={content}
			tabIndex={1} 
			onBlur={newContent => setContent(newContent)} 
			onChange={newContent => {handleInputChange({target: { name: 'descryption',value: newContent } })}}    
		/>
      </Form.Group>
      <hr></hr>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <div>
      <Button type='submit ' className='w-100'>{loading ? 'Submitting....':'Submit'}</Button>
      </div>
      </Form.Group>
    </Form>
          </Card>
        </div>
    )
}

export default AddCategory;