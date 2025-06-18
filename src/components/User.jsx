import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';


const User = () => {
  const auth = getAuth()
  const [userList,setuserlist] = useState([])
  const db = getDatabase();

  useEffect(() =>{
    const starCountRef = ref(db, "userslist/");
onValue(starCountRef, (snapshot) => {
  const array = []
  snapshot.forEach((item) =>{
    // if(item.key != auth.currentUser.uid){  condition if not match with uid

   
    // }
   array.push(item.val())
      console.log(item.val())
  })
  setuserlist(array)
  console.log(array)
});
  } , [])

    const handlefrndreq = (item) =>{
      
        set(push((ref(db, "friendrequestlist/"))), {
                        sendername : auth.currentUser.displayName,
                        senderid : auth.currentUser.uid,
                        receivername : item.name,
                        receiverid : item.id,
                      }).then(()=>{
                        console.log("frnd req sent")
                      })
    }
  return (
    <div className="container">
        <section className='mt-4 font-display border  rounded w-50'>

            <h2 className='w-50 bg-green-400 text-white rounded'>User</h2>

            <ul className='space-y-2 mt-4 ms-4'>

              {userList.map((item) =>{
                return(
                  <>
                  <p className='w-fit inline-block'>{item.name}</p>
                  </>
                  
                  
             
            

                );
              })}
            </ul>

        </section>
    </div>
  )
}

export default User