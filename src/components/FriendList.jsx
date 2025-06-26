import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { getAuth } from 'firebase/auth';


const FriendList = () => {
    const[reqlist,setrequestlist] = useState([])
  const auth = getAuth()
  const [userList,setuserlist] = useState([])
  const db = getDatabase();

   useEffect(() =>{
      const requestlistRef = ref(db, "friendlist/");
  onValue(requestlistRef, (snapshot) => {
    const array = []
    snapshot.forEach((item) =>{
      // if(item.key != auth.currentUser.uid){  condition if not match with uid
      // }
      
  
     
    if( auth.currentUser.uid == item.val().senderid || auth.currentUser.uid == item.val().receiverid  ){

        array.push({...item.val() , id : item.key})
    }
    })
    setrequestlist(array)
  });
    } , [])
    
    console.log(reqlist)

    

    const handlefriendaccept = (item) =>{
      
       set(push((ref(db, "friendlist/"))), {
                           ...item, 
                          }).then(() => {
                            remove((ref(db, "friendrequestlist/" + item.id)))

                        
                          })
                          console.log(item);
    }

  const handleBlock = (item) =>{

    // console.log('block' , item)
    if(auth.currentUser.uid == item.senderid){
      console.log("receiver" ,item)
      set(push((ref(db, "blocklist/"))), {
                           blockbyuser : item.senderid,
                           blockbyusername: item.sendername,
                           blockuser : item.receiverid,
                           blockusername : item.receivername
                          }).then(() => {
                            remove((ref(db, "friendlist/" + item.id)))
  
                        
                          })
                          console.log(item);
    } else {
         set(push((ref(db, "blocklist/"))), {
                           blockbyuser : item.receiverid,
                           blockbyusername: item.receivername,
                           blockuser : item.senderid,
                           blockusername : item.sendername
                          }).then(() => {
                            remove((ref(db, "friendlist/" + item.id)))
  
                        
                          })
    }
  }

  return (
    <div className="container">
        <section className='mt-4 font-display border  rounded w-50'>

            <h2 className='w-50 bg-green-400 text-white rounded'>Friend  List</h2>

            <ul className='space-y-2 mt-4 ms-4'>

              {reqlist.map((item) =>{
                return(
                  <>
                 {
  auth.currentUser.uid === item.senderid ? (
    
    <div><p className="w-fit inline-block">{item.receivername} </p> <button onClick={() =>{handleBlock(item)}} className='bg-green-500 text-white px-2 py-1 rounded'>Block</button></div>
  ) : auth.currentUser.uid === item.receiverid ? (
    <div><p className="w-fit inline-block">{item.sendername} </p> <button onClick={() =>{handleBlock(item)}} className='bg-green-500 text-white px-2 py-1 rounded'>Block</button></div>
  ) : null
}


                  
                  
                  </>
                  
                  
             
            

                );
              })}
            </ul>

        </section>
    </div>
  )
}

export default FriendList