import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";

const FriendRequest = () => {
  const [userList,setuserlist] = useState([])
  const db = getDatabase();

  useEffect(() =>{
    const starCountRef = ref(db, "userslist/");
onValue(starCountRef, (snapshot) => {
  const array = []
  snapshot.forEach((item) =>{
    if(item.key != auth.currentUser.uid){

      array.push(item.val())
    }

  })
  setuserlist(array)
  console.log(userList)
} , []);
  })
  return (
    <div className="container">
        <section className='mt-4 font-display border  rounded w-50'>

            <h2 className='w-50 bg-green-400 text-white rounded'>Friend Requests</h2>

            <ul className='space-y-2 mt-4 ms-4'>

              {userList.map((item) =>{
                return(
                  
                  <p>{item.name}</p>
                  
             
            

                );
              })}
            </ul>

        </section>
    </div>
  )
}

export default FriendRequest