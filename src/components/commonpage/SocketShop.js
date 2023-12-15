import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './chatfile.css';

const SocketShop = () =>{
  const [message,setmessage] = useState('');
  const urlSearchParams = new URLSearchParams(window.location.search);
  const  reId = urlSearchParams.get('id');
  const [reciverId,setreciverId] = useState(reId);
  const [currentsender,setcurrentsender] = useState({});
  const [allsender,setallsender] = useState([]);
  const [allmsg,setallmsg] = useState([]);
  const [currentChat ,setcurrentChat] = useState([]);
  const [check ,setCheck] = useState(0)
  const userinfo = sessionStorage.getItem('userdata');
  const userdata = JSON.parse(userinfo);
  const [senderId,setsenderId] = useState(userdata.id);
  const serverUrl = 'https://amazonebackend.onrender.com';
  const socket = io(serverUrl);

  useEffect(() => {
      socket.on('connect', () => {
        console.log('Connected to server');
      });
      socket.on('connect_error', (error) => {
        console.error('Error connecting to server:', error);
      });
      socket.on('disconnect', (reason) => {
        console.warn('Disconnected from server:', reason);
      });
      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });
      return () => {
        socket.disconnect();
      };
    }, []);

 
useEffect(()=>{
  getDataFromDb(reciverId);
  socket.on('message',(socketmsg) => {
  if(socketmsg.reciverId === senderId){   
    checkUserINAllMsg({reciver : socketmsg.reciverId , sender : socketmsg.senderId  , msg : { message : socketmsg.message, recId : socketmsg.reciverId, sendId :        socketmsg.senderId}}); 
    getDataFromDb(socketmsg.senderId);
  }
});
},[]);
useEffect(()=>{

},[check])

function getCurrentChatBtwSenderReciver(reciver_id,sender_id){ 
  const arrtemp = [];
  for(let i of allmsg){
     if(((i.reciver === reciver_id)||(i.reciver === sender_id)) && ((i.sender === sender_id)||(i.sender === reciver_id))){
      for (let item of i.msg){
         arrtemp.push(item);
      }
     }
  }
  setcurrentChat(arrtemp);
}

function checkexist(id){
  for(let i=0;i<allsender.length;i++){
   if(allsender[i].sender=== id){
     return true;
   }
  }
 return false;
} 

function increaseMsgNumber(id){
  for(let i=0;i<allsender.length;i++){
    if(allsender[i].sender=== id){
       allsender[i].number += 1;
    }
   } 
  
}

function checkUserINAllMsg(Msgdata){
  let checkvalue = true;
  if(allmsg.length>0) {
  for(let i=0 ;i<allmsg.length;i++){
   if(((allmsg[i].sender === Msgdata.sender) || (allmsg[i].sender === Msgdata.reciver)) && ((allmsg[i].reciver === Msgdata.sender) || (allmsg[i].reciver === Msgdata.reciver))){
    const customobj = {
      message : Msgdata.msg.message,
       recId  : Msgdata.msg.recId,
      sendId :  Msgdata.msg.sendId
    } 
       allmsg[i].msg.push(customobj);
       setallmsg(allmsg); 
       if( reciverId=== Msgdata.msg.sendId || reciverId === Msgdata.msg.recId){
       getCurrentChatBtwSenderReciver(Msgdata.msg.recId,Msgdata.msg.sendId);
       }
       else{
        increaseMsgNumber(Msgdata.msg.sendId);
       }
       checkvalue = false;
   }
  }
}
  if(checkvalue){
    const customobj = {
      message : Msgdata.msg.message,
      recId : Msgdata.msg.recId,
      sendId : Msgdata.msg.sendId
    }
      const temp = [];
      temp.push(customobj);
     const storeObject = {
       reciver : Msgdata.reciver ,
        sender : Msgdata.sender ,
        msg :  temp
     }
    allmsg.push(storeObject);
    setallmsg(allmsg);
    if(reciverId === Msgdata.msg.sendId || reciverId === Msgdata.msg.recId){
    getCurrentChatBtwSenderReciver(Msgdata.msg.recId,Msgdata.msg.sendId);
    }
    else{
      increaseMsgNumber(Msgdata.msg.sendId);
    }
  }
}

async function getDataFromDb(id){
  try{
 const response = await fetch(`https://amazonebackend.onrender.com/user/getuserbyid/${id}`);
 if(response.status===200){
  const  userdata = await response.json();
  const data = {profile : userdata[0].profile , name : userdata[0].name , email : userdata[0].email, id: userdata[0]._id };
  if(allsender.length < 1){
    setcurrentsender({sender : id, data : data});
    setCheck(allmsg.length+2);
   }
  const exist = checkexist(id);
  if(!exist){
  allsender.push({sender : id, data : data}); 
  setallsender(allsender);
  }
  setCheck(allmsg.length);
  }
  }
  catch(err){
    console.log("error in fetching user data");
  } 
 }   

 function findCurrentSender(id){
  for(let i of allsender){
   if(i.data.id === id){
     // set the currentsender 
     setcurrentsender({sender : i.sender , data : i.data})
   }
  }
}

function sendMessage(){
  socket.emit('sendMessage', { message ,reciverId, senderId});
  checkUserINAllMsg({reciver : reciverId , sender : senderId , msg : { message : message, recId : reciverId, sendId : senderId}});
  setmessage('');
}

function chatWith(id){
  setreciverId(id); 
  console.log("after setting reciver id is : ",reciverId," and coming id is : ",id);
  getCurrentChatBtwSenderReciver(senderId,id);
  findCurrentSender(id);
}

  return (
      <>
         <div style={{margin:'3%'}}>
         <div style={{display:'flex',justifyContent:'space-between'}}>
             <div style={{width:'60%'}}>
                <div style={{backgroundColor:'#08011c',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                   <img  src="/images/chatimagelogo.jpg" alt="chat_image_logo_amazone" style={{width:'20%'}}/>
                   { Object.keys(currentsender).length !== 0 ?
                  <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginRight:'20px'}}>
                    <img src={currentsender.data.profile} alt="Sender_Profile_Image" style={{width:'60px',height:'60px',borderRadius:'50%'}}/>
                     <strong>{currentsender.data.name}</strong>
                  </div>
                        :''  }
                </div>
                <div className='showMsg'>
                { currentChat.length>0 ? currentChat.map((item,index)=>{
                  return(
                     <div key={index} style={{display:'flex',flexDirection:'column',margin:'1%'}} className={item.sendId===senderId ?'rightMove':'leftMove'}>
                        <div className={item.sendId===senderId ?'sendMsg':'reciveMsg'}>
                        {item.message} 
                        </div>
                     </div>   
                  )
              }): <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>No Chat Available</div>
              }
                </div> 
                <Card>
                <div style={{display:'flex',alignItems:'center',gap:'2%',width:'100%'}}>
                <input type="text" onChange={(e)=>{setmessage(e.target.value)}} placeholder='write meassage here..' value={message} style={{width:'83%',border:'none',height:'30px',padding:'10px'}}></input>
                <Button  variant='secondary' onClick={sendMessage}>send</Button>
                </div>
                </Card>
             </div>
             <Card style={{width:'30%', height: '42.5em'}}>
                <div> 
                  <img src="/images/clientsimages.webp" alt='clients_imaeg_logo' style={{height:'60%'}}/>
               </div>
               <div className='showUser'>

               { allsender.length > 0 ? allsender.map((user,index)=>{
                    return(
                      <Card className='displaycontent' key={index} style={{backgroundColor: user.data.id === currentsender.data.id ? '#7888c4' : ''}}>
                      <div style={{width:'20%'}}>
                        <img src={user.data.profile}  alt="user_profile_image" className='displayuserimage'/>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'60%',paddingLeft:'5%'}}>
                          <div style={{fontSize:'15px',color:'#2e1f8c'}}>{user.data.name}</div>
                          <div style={{fontSize:'10px',color:'#0f083b'}}>{user.data.email}</div>
                      </div>
                      <div style={{width:'30%'}}>
                        <Button className='btn_hover' onClick={()=>{chatWith(user.data.id)}}>chat</Button>
                        {/* {user.number} */}
                      </div>
                   </Card>
                    )
                  })   
                 :'' }
                
               </div>
             </Card>
         </div>
         </div>
      </>
  )
}

export default SocketShop;