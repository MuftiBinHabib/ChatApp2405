import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { getAuth } from 'firebase/auth';


const BlockList = () => {
  const auth = getAuth()
  const [blockList,setblockList] = useState([])
  const [checkrequestid,setcheckrequestid] = useState([])
   const [checkfrndid,setcheckfrndid] = useState([])
  const db = getDatabase();

  

   //check request
    useEffect(() =>{
        const requestlistRef = ref(db, "blocklist/");
    onValue(requestlistRef, (snapshot) => {
      const array = []
      snapshot.forEach((item) =>{
        if(auth.currentUser.uid == item.val().blockbyuser){

            array.push({...item.val(), id : item.key})
        }
          
      })
    setblockList(array)
      
    });
      } , [])

const handleunblock = (item) =>{
    // console.log(item)
    if(auth.currentUser.uid == item.blockbyuser){
         set(push((ref(db, "friendlist/"))), {
                                   sendername : item.blockbyusername,
                                   senderid: item.blockbyuser,
                                   receivername : item.blockusername,
                                   receiverid : item.blockuser
                                  }).then(() => {
                                    remove((ref(db, "blocklist/" + item.id)))
          
                                
                                  })
    } else {
        set(push((ref(db, "friendlist/"))), {
                                   sendername : item.blockusername,
                                   senderid: item.blockuser,
                                   receivername : item.blockbyusername,
                                   receiverid : item.blockbyuser
                                  }).then(() => {
                                    remove((ref(db, "blocklist/" + item.id)))
          
                                
                                  })
    }
}
  return (
    <div className="container">
        <section className='mt-4 font-display border  rounded w-60'>

            <h2 className='w-60 bg-green-400 text-white rounded'>Block List</h2>

            <ul className='space-y-2 mt-4 ms-4'>


              {blockList.map((item) =>{
                return (
    <div>
      {auth.currentUser.uid === item.blockbyuser ? (
        <div>
        <p className='w-fit inline-block'>{item.blockusername} </p> <button onClick = {() =>handleunblock(item)} className='bg-green-500 text-white px-2 py-1 rounded'>Unblock</button> 
        </div>
      ) : (
        <p className='w-fit inline-block'>{item.blockbyusername} </p>
      )}
    </div>
  );
              })}
               
            </ul>

        </section>
    </div>
  )
}

export default BlockList