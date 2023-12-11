import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
const Searchbar = ({productdata,changeData})=>{
   const [products,setProducts] = useState(productdata);
   const [searchItem,setSearchItem] = useState();
   function handleOnchange(e){
    if(e.target.value){
     setSearchItem(e.target.value);
     const newproducts =  products.filter((item)=>{
         return item.shorttitle.toLowerCase().includes(e.target.value.toLowerCase());
     }) 
      changeData(newproducts);
   }
   else{
    changeData(products);
   }
   }
    
   function submit(e){
     e.preventDefault();
     if(searchItem){
        const newproducts =  products.filter((item)=>{
            return item.shorttitle.toLowerCase() === searchItem.toLowerCase();
        }) 
            changeData(newproducts);
      } 
      else{
            toast.error("you searched empty field !!");
            changeData(products);
      }
   }
    return (
         <div style={{width:'100%'}}>
            <ToastContainer/>
             <header>
                <form onSubmit={submit}>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:'2px'}}>
                <input type="search"
                   name ="search_input"
                  onChange={handleOnchange}
                   style={{height:'35px',width:'100%',paddingLeft:'15px'}}
                />
                <Button type="submit" variant="secondary">search</Button>
                </div>
                </form>
             </header>
        </div>
    )
}

export default Searchbar;