
const Showless = (props)=>{
   const msg = props.data;

   const parser = new DOMParser();
   const doc = parser.parseFromString(msg, 'text/html');
   const textContent = doc.body.textContent;
   let str = '';
   for(let i=0;i<250;i++){
     str += textContent[i];
   }
    return(
        <div> 
            {str}...
        </div>
    )
}

export default Showless;