import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import React, { useEffect, useState } from 'react'

const FriendListMsg = () => {
    const[friendlist, setfriendlist] = useState([])

     const db = getDatabase();
     
    
       useEffect(() =>{
          const requestlistRef = ref(db, "friendlist/");
      onValue(requestlistRef, (snapshot) => {
        const array = []
        snapshot.forEach((item) =>{
          // if(item.key != auth.currentUser.uid){  condition if not match with uid
          // }
          
      
         
        if(auth.currentUser.uid == item.val().senderid || auth.currentUser.uid == item.val().receiverid  ){
    
            array.push({...item.val() , id : item.key})
        }
        })
        setfriendlist(array)
      });
        } , [])
console.log(friendlist)
  return (
    <div className="w-1/4 border-r-2 overflow-y-auto">
        {/* search compt */}
        <div className="border-b-2 py-4 px-2 w-100">
          <input
            type="text"
            placeholder="search chatting"
            className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
          />
        </div>
        {/* end search compt */}
        {/* user list */}
        {friendlist.map((item) => (

        <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
          
          <div className="w-100">
            {auth.currentUser.uid == item.senderid ? 
            <div className="text-lg font-semibold">{item.receivername}</div> : 
            <div className="text-lg font-semibold">{item.sendername}</div>
            }
            <span className="text-gray-500">Pick me at 9:00 Am</span>
          </div>
        </div>
        ))}
       
        {/* end user list */}
      </div>
  )
}

export default FriendListMsg