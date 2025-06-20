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

  

  return (
    <div className="container">
        <section className='mt-4 font-display border  rounded w-50'>

            <h2 className='w-50 bg-green-400 text-white rounded'>Friend  List</h2>

            <ul className='space-y-2 mt-4 ms-4'>

              {reqlist.map((item) =>{
                return(
                  <>
                    {auth.currentUser.uid == item.senderid ?(
                    
                    <p className='w-fit inline-block'>
                  {item.receivername}  </p>
                     ) : (
   
                     <p>{item.senderrname}</p>

                        )}
                  
                  
                  </>
                  
                  
             
            

                );
              })}
            </ul>

        </section>
    </div>
  )
}

export default FriendList