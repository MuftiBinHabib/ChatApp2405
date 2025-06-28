import React, { useEffect, useState } from 'react';
import FriendListMsg from './FriendListMsg';
import { useSelector } from 'react-redux';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import moment from 'moment';


const Chats = () => {
  const db = getDatabase()
  const auth = getAuth()
  let [msg, setMsg] = useState(null)
  const [msglist, setMsglist] = useState([])
  const user = useSelector((state)=>state.chatInfo.value)
  let handleMsg = (e) =>{
    setMsg(e.target.value)

  }

  let handleSendMsg = () =>{
    set(push((ref(db, "msglist/"))), {
                               sendername : auth.currentUser.displayName,
                               senderid: auth.currentUser.uid,
                               receivername: user.name,
                               receiverid : user.id,
                               msg: msg,
                               date: `${new Date().getFullYear} - ${new Date().getMonth()+1} - ${new Date().getDate()}- ${new Date().getHours()} - ${new Date().getMinutes()}  `

                              }).then(() => {
                                setMsg("")
                                alert('msg sent successfully')
      
                            
                              })

  }

  useEffect(()=>{
 const requestlistRef = ref(db, "msglist/");
      onValue(requestlistRef, (snapshot) => {
        const array = []
        snapshot.forEach((item) =>{
          // if(item.key != auth.currentUser.uid){  condition if not match with uid
          // }
          
      
         
        if(auth.currentUser.uid == item.val().senderid || auth.currentUser.uid == item.val().receiverid  ){
    
            array.push({...item.val() , id : item.key})
        }
        })
        setMsglist(array)
      });
  },[])
  
  return (
    <div className="w-full">
  {/* This is an example component */}
  <div className=" w-[700px] h-screen shadow-lg rounded-lg">
    {/* headaer */}
    <div className=" py-5 flex justify-between items-center bg-white border-b-2 w-full">
      <div className="font-semibold text-2xl">GoingChat</div>
      <div className="w-1/2">
        <input
          type="text"
          name=""
          id=""
          placeholder="search IRL"
          className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
        />
      </div>
      <h2>{user?.name} </h2>
    </div>
    {/* end header */}
    {/* Chatting */}
    <div className="flex flex-row justify-between">
      {/* chat list */}
      
      <FriendListMsg />
     
      {/* end chat list */}
      {/* message */}
      <div className="w-2/4 px-5 flex flex-col justify-between">
        <div className="flex flex-col mt-5">
          {msglist.map((msgitem) => (
            msgitem.senderid == auth.currentUser.uid ? 
            <div className='flex justify-end bg-gray-500 text-white'>
            <h2>{msgitem.msg}</h2> <br />
            <p className='text-sm'>{moment().startOf('hour').fromNow()}; </p>
            </div>
            :
            <div className='justify-start bg-green-400'><h2>{msgitem.msg}</h2> <br />
            <p className='text-sm'>{moment().startOf('hour').fromNow()}; </p></div>
            
          ))}
           {/* <div className="flex justify-end mb-4">
            <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
              Welcome to group everyone !
            </div>
          </div> */}
          {/* <div className="flex justify-start mb-4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              at praesentium, aut ullam delectus odio error sit rem. Architecto
              nulla doloribus laborum illo rem enim dolor odio saepe,
              consequatur quas?
            </div>
          </div> */}
          {/* <div className="flex justify-end mb-4">
            <div>
              <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Magnam, repudiandae.
              </div>
              <div className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Debitis, reiciendis!
              </div>
            </div>
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-8 w-8 rounded-full"
              alt=""
            />
          </div>
          <div className="flex justify-start mb-4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
              happy holiday guys!
            </div>
          </div> */}
        </div>
        <div className="py-5">

          {user &&
           <input onChange={handleMsg}
            className="w-full bg-gray-300 py-5 px-3 rounded-xl"
            type="text"
            placeholder="type your message here..."
          /> 
          }
         
          <button onClick={handleSendMsg} className='bg-red-500 text-white px-2 py-1 rounded'>Send</button>
        </div>
      </div>
      {/* end message */}
      <div className="w-1/4 border-l-2 px-5">
        <div className="flex flex-col">
          <div className="font-semibold text-xl py-4">Mern Stack Group</div>
          <img
            src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
            className="object-cover rounded-xl h-64"
            alt=""
          />
          <div className="font-semibold py-4">Created 22 Sep 2021</div>
          <div className="font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            perspiciatis!
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Chats;
